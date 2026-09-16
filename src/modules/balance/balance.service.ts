import {
	Injectable,
	InternalServerErrorException,
	Logger
} from "@nestjs/common"
import { endOfMonth } from "date-fns"
import {
	ConsolidatedReport,
	ReportBank,
	ReportCategory,
	ReportPayment
} from "../../domains/balance.domain.js"
import { Expense } from "../../domains/expense.domain.js"
import { ExpenseService } from "../expense/expense.service.js"
import {
	GetBalanceRequest,
	GetBalanceResponse,
	GetConsolidateBalanceRequest,
	GetConsolidatedBalanceResponse
} from "./balance.dto.js"

@Injectable()
export class BalanceService {
	private readonly logger = new Logger(BalanceService.name)

	constructor(private readonly expensesService: ExpenseService) {}

	/**
	 * Builds a bank report entry with the given total amount.
	 * @param bank - The bank's id and name.
	 * @param amount - The total amount to attribute to the bank.
	 * @returns A {@link ReportBank} entry.
	 */
	private getBank(
		bank: { id: string; name: string },
		amount: number
	): ReportBank {
		return { id: bank.id, name: bank.name, total: amount }
	}

	/**
	 * Builds a payment type report entry for a single expense, seeded with
	 * that expense's bank as its only bank entry.
	 * @param expense - The expense to derive the payment entry from.
	 * @returns A {@link ReportPayment} entry.
	 */
	private getPayment(expense: Expense): ReportPayment {
		return {
			id: expense.paymentTypeId,
			description: expense.paymentType.description,
			banks: [this.getBank(expense.bank, expense.amount)],
			total: expense.amount
		}
	}

	/**
	 * Builds a category report entry for a single expense.
	 * @param expense - The expense to derive the category entry from.
	 * @returns A {@link ReportCategory} entry.
	 */
	private getCategory(expense: Expense): ReportCategory {
		return {
			id: expense.categoryId,
			description: expense.category.description,
			total: expense.amount
		}
	}

	/**
	 * Computes the personal balance (sum of the owner's personal expenses)
	 * and the shared balance (net of what the owner is paying vs. owed)
	 * for the given owner and date/filter criteria.
	 * @param data - The owner id, date range, and optional filter criteria.
	 * @returns The computed personal and shared balances.
	 * @throws {InternalServerErrorException} If the underlying expense queries fail.
	 */
	async getBalance(data: GetBalanceRequest): Promise<GetBalanceResponse> {
		try {
			const [{ expenses: personalExpenses }, { expenses: sharedExpenses }] =
				await Promise.all([
					this.expensesService.getPersonalExpenses(data),
					this.expensesService.getSharedExpenses(data)
				])

			const { ownerId } = data

			const personalBalance = personalExpenses.reduce(
				(acc, expense) => acc + expense.amount,
				0
			)

			const sharedBalance = sharedExpenses.reduce(
				(acc, expense) => {
					if (expense.ownerId === ownerId) acc.paying += expense.amount
					else acc.payed += expense.amount
					return acc
				},
				{ paying: 0, payed: 0, total: 0 }
			)

			return {
				personalBalance,
				sharedBalance: {
					paying: sharedBalance.paying,
					payed: sharedBalance.payed,
					total: sharedBalance.paying - sharedBalance.payed
				}
			}
		} catch (error) {
			this.logger.error(`Error - ${error.message || error} - getting balance`)
			throw new InternalServerErrorException("Error getting balance")
		}
	}

	/**
	 * Builds a consolidated balance report for a given month/year across all
	 * shared expenses, grouping totals by owner, payment type/bank, and
	 * category, then splits the result into the requesting user's balance
	 * versus their partner's.
	 * @param request - The target `year`, zero-indexed `month`, and requesting `userId`.
	 * @returns The consolidated report along with the requester's and partner's balances.
	 * @throws {InternalServerErrorException} If the underlying expense query or aggregation fails.
	 */
	async getConsolidatedBalance({
		year,
		month,
		userId
	}: GetConsolidateBalanceRequest): Promise<GetConsolidatedBalanceResponse> {
		try {
			const initialDate = new Date(year, month, 1)

			const finalDate = endOfMonth(initialDate)

			const expenses = await this.expensesService.getExpensesByDateRange(
				false,
				initialDate,
				finalDate
			)

			const consolidatedReport = expenses.reduce(
				(acc, expense) => {
					const ownerIndex = acc.findIndex(
						({ ownerId }) => ownerId === expense.ownerId
					)
					if (ownerIndex >= 0) {
						const owner = acc[ownerIndex]

						const paymentTypeIndex = owner.payments?.findIndex(
							({ id }) => id === expense.paymentTypeId
						)

						if (paymentTypeIndex >= 0) {
							const bankIndex = owner.payments[
								paymentTypeIndex
							].banks.findIndex((bank) => bank.id === expense.bankId)
							if (bankIndex >= 0) {
								owner.payments[paymentTypeIndex].banks[bankIndex].total +=
									expense.amount
							} else {
								owner.payments[paymentTypeIndex].banks.push(
									this.getBank(expense.bank, expense.amount)
								)
							}
							owner.payments[paymentTypeIndex].total += expense.amount
						} else {
							owner.payments.push(this.getPayment(expense))
						}

						const categoryIndex = owner.categories?.findIndex(
							({ id }) => id === expense.categoryId
						)

						if (categoryIndex >= 0) {
							owner.categories[categoryIndex].total += expense.amount
						} else {
							owner.categories.push(this.getCategory(expense))
						}

						owner.total += expense.amount
					} else {
						acc.push({
							ownerId: expense.ownerId,
							ownerName: expense.user.name,
							payments: [this.getPayment(expense)],
							categories: [this.getCategory(expense)],
							total: expense.amount
						})
					}
					return acc
				},
				[] as Array<ConsolidatedReport>
			)

			const requester = consolidatedReport.find(
				({ ownerId }) => ownerId === userId
			)
			const requesterBalance = requester ? requester.total : 0

			const partner = consolidatedReport.find(
				({ ownerId }) => ownerId !== userId
			)
			const partnerBalance = partner ? partner.total : 0

			return {
				userId,
				requesterBalance,
				partnerBalance,
				requester,
				partner
			}
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - getting consolidated balance`
			)
			throw new InternalServerErrorException(
				"Error getting consolidated balance"
			)
		}
	}
}
