import { Injectable, Logger } from "@nestjs/common"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import {
	addMonths,
	endOfMonth,
	getMonth,
	getYear,
	isFuture,
	setDate
} from "date-fns"
import { Expense } from "@/domains/expense.domain"
import { DatabaseService } from "@/infra/database/database.service"
import { PaymentTypeService } from "../payment-type/payment-type.service"
import { StatementPeriodService } from "../statement-period/statement-period.service"
import AppError from "../utils/appError"
import { constants } from "../utils/constants"
import {
	CreateExpenseDTO,
	GetExpensesRequest,
	GetExpensesResponse,
	OrderByType,
	UpdateExpenseDTO
} from "./expense.dto"

@Injectable()
export class ExpenseService {
	private readonly logger = new Logger(ExpenseService.name)

	constructor(
		private readonly databaseService: DatabaseService,
		private readonly paymentTypeService: PaymentTypeService,
		private readonly statementPeriodService: StatementPeriodService
	) {}

	private calculateNetAmount(
		amount: number,
		personal: boolean,
		split: boolean
	): number {
		const amountInCents = amount * 100
		return personal
			? amountInCents
			: split
				? Math.round(amountInCents / 2)
				: amountInCents
	}

	private getOrderByClause(
		orderBy?: string,
		orderType: OrderByType = "asc"
	): Record<string, OrderByType> | Record<string, Record<string, OrderByType>> {
		const orderByColumn =
			constants.orderColumns[orderBy] || constants.orderColumns.date

		const orderByClause =
			typeof orderByColumn === "string"
				? { [orderByColumn]: orderType }
				: {
						[orderByColumn[0].split(".")[0]]: {
							[orderByColumn[0].split(".")[1]]: orderType
						}
					}
		return orderByClause
	}

	private async calculateDueDate(
		transactionDate: Date,
		paymentTypeId: string,
		userId: string,
		bankId?: string
	): Promise<Date> {
		const paymentType = await this.paymentTypeService.getById(paymentTypeId)

		if (!paymentType?.hasStatement) {
			return addMonths(transactionDate, 1)
		}

		if (paymentType?.hasStatement && !bankId) {
			throw new AppError("This payment type must have a bank")
		}

		const statementPeriod = await this.statementPeriodService.findByUserAndBank(
			userId,
			bankId,
			paymentTypeId
		)

		if (!statementPeriod) {
			throw new AppError(
				"No statement period for provided payment type and bank was found"
			)
		}

		const { initialDay, finalDay } = statementPeriod
		const lastDayOfMonth = endOfMonth(transactionDate).getDate()
		const transactionNextMonth = getMonth(transactionDate) + 1
		const statementInitialDate = setDate(transactionDate, Number(initialDay))

		return transactionDate < statementInitialDate
			? setDate(transactionDate, Number(lastDayOfMonth))
			: new Date(
					getYear(transactionDate),
					transactionNextMonth,
					Number(finalDay) + 1
				)
	}

	async createExpense(
		data: CreateExpenseDTO,
		userId: string
	): Promise<Expense> {
		if (isFuture(data.date))
			throw new AppError("Date must not be in the future", 400)

		try {
			const netAmount = this.calculateNetAmount(
				data.amount,
				data.personal,
				data.split
			)
			const dueDate = await this.calculateDueDate(
				data.date,
				data.payment_type_id,
				userId,
				data.bank_id
			)

			const expense = await this.databaseService.expense.create({
				data: {
					ownerId: userId,
					description: data.description,
					date: data.date,
					amount: netAmount,
					categoryId: data.category_id,
					personal: data.personal || false,
					split: data.personal ? false : data.split || false,
					paymentTypeId: data.payment_type_id,
					bankId: data.bank_id ?? null,
					storeId: data.store_id ?? null,
					dueDate
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})

			return expense
		} catch (error) {
			if (error instanceof AppError) {
				throw error
			}

			if (error instanceof PrismaClientKnownRequestError) {
				this.logger.error(`Error - ${error.code || error} - creating expense`)
				if (error.code === constants.FOREIGN_KEY_VIOLATION) {
					const dbField = error.meta.field_name as string
					const fieldName = dbField.split("_")[1]
					const errorMessage = constants.foreignKeyMessages[fieldName]

					throw new AppError(errorMessage, 400)
				}
				if (error.code === constants.UNIQUE_CONSTRAINT_VIOLATION) {
					throw new AppError(
						constants.uniqueConstraintMessages.duplicatedExpenses,
						400
					)
				}
			}

			this.logger.error(`Error - ${error.message || error} - creating expense`)
			throw new AppError("Internal server error", 500)
		}
	}

	async updateExpense(
		id: string,
		data: UpdateExpenseDTO,
		userId: string
	): Promise<Expense> {
		try {
			const expense = await this.databaseService.expense.findFirst({
				where: { id, deletedAt: null }
			})

			if (!expense) {
				throw new AppError("Expense not found", 404)
			}

			if (expense.ownerId !== userId) {
				throw new AppError("Unauthorized", 403)
			}

			if (isFuture(data.date)) {
				throw new AppError("Date must not be in the future", 400)
			}

			const netAmount = this.calculateNetAmount(
				data.amount,
				data.personal,
				data.split
			)
			const dueDate = await this.calculateDueDate(
				data.date,
				data.payment_type_id,
				userId,
				data.bank_id
			)

			const updateExpense = await this.databaseService.$transaction(
				async (tx) => {
					const current = await tx.expense.findFirst({
						where: { id, deletedAt: null }
					})

					if (!current) {
						throw new AppError("Expense not found", 404)
					}

					return tx.expense.update({
						where: { id },
						data: {
							description: data.description,
							date: data.date,
							amount: netAmount,
							categoryId: data.category_id,
							personal: data.personal || false,
							split: data.personal ? false : data.split || false,
							paymentTypeId: data.payment_type_id,
							bankId: data.bank_id ?? null,
							storeId: data.store_id ?? null,
							dueDate
						},
						include: {
							category: true,
							paymentType: true,
							bank: true,
							store: true,
							user: true
						}
					})
				}
			)

			return updateExpense
		} catch (error) {
			if (error instanceof AppError) {
				throw error
			}

			if (error instanceof PrismaClientKnownRequestError) {
				this.logger.error(`Error - ${error.code || error} - updating expense`)
				if (error.code === constants.FOREIGN_KEY_VIOLATION) {
					const dbField = error.meta.field_name as string
					const fieldName = dbField.split("_")[1]
					const errorMessage = constants.foreignKeyMessages[fieldName]

					throw new AppError(errorMessage, 400)
				}
				if (error.code === constants.UNIQUE_CONSTRAINT_VIOLATION) {
					throw new AppError(
						constants.uniqueConstraintMessages.duplicatedExpenses,
						400
					)
				}
			}

			this.logger.error(
				`Error - ${error.message || error} - updating expense ${id}`
			)
			throw new AppError("Internal server error", 500)
		}
	}

	async deleteExpense(id: string, userId: string): Promise<void> {
		const expense = await this.databaseService.expense.findFirst({
			where: { id, deletedAt: null }
		})

		if (!expense) {
			throw new AppError("Expense not found", 404)
		}

		if (expense.ownerId !== userId) {
			throw new AppError("Unauthorized", 403)
		}

		try {
			await this.databaseService.expense.update({
				where: { id },
				data: { deletedAt: new Date() }
			})
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === constants.RECORD_NOT_FOUND
			) {
				return
			}
			this.logger.error(
				`Error - ${error.message || error} - deleting expense ${id}`
			)
			throw new AppError("Internal server error", 500)
		}
	}

	async getPersonalExpenses({
		ownerId,
		startDate,
		endDate,
		offset,
		limit,
		orderBy,
		orderType,
		filterBy,
		filterValue
	}: GetExpensesRequest): Promise<GetExpensesResponse> {
		const whereClause = {
			deletedAt: null,
			OR: [
				{ AND: [{ ownerId }, { OR: [{ personal: true }, { split: true }] }] },
				{ AND: [{ NOT: { ownerId } }, { personal: false }] }
			],
			dueDate: {
				lte: endDate,
				...(startDate ? { gte: startDate } : {})
			}
		}

		if (filterBy && filterValue) {
			whereClause[constants.filterColumns[filterBy]] = filterValue
		}

		const orderByClause = this.getOrderByClause(orderBy, orderType)

		const [expenses, totalCount] = await Promise.all([
			this.databaseService.expense.findMany({
				where: whereClause,
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				},
				orderBy: orderByClause,
				skip: offset,
				take: limit
			}),
			this.databaseService.expense.count({ where: whereClause })
		])

		return { expenses, totalCount }
	}

	async getSharedExpenses({
		startDate,
		endDate,
		offset,
		limit,
		orderBy,
		orderType,
		filterBy,
		filterValue
	}: GetExpensesRequest): Promise<GetExpensesResponse> {
		const whereClause = {
			deletedAt: null,
			personal: false,
			dueDate: {
				lte: endDate,
				...(startDate ? { gte: startDate } : {})
			}
		}

		if (filterBy && filterValue) {
			whereClause[constants.filterColumns[filterBy]] = filterValue
		}

		const orderByClause = this.getOrderByClause(orderBy, orderType)

		const [expenses, totalCount] = await Promise.all([
			this.databaseService.expense.findMany({
				where: whereClause,
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				},
				orderBy: orderByClause,
				skip: offset,
				take: limit
			}),
			this.databaseService.expense.count({ where: whereClause })
		])

		return { expenses, totalCount }
	}

	async getExpensesByDateRange(
		personal: boolean,
		startDate: Date,
		endDate: Date
	): Promise<Expense[]> {
		return this.databaseService.expense.findMany({
			where: {
				deletedAt: null,
				personal,
				dueDate: {
					lte: endDate,
					gte: startDate
				},
				paymentType: { deletedAt: null }
			},
			include: {
				category: true,
				paymentType: true,
				bank: true,
				store: true,
				user: true
			}
		})
	}
}
