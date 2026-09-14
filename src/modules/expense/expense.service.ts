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
import { Expense } from "../../domains/expense.domain.js"
import { DatabaseService } from "../../infra/database/database.service.js"
import { PaymentTypeService } from "../payment-type/payment-type.service.js"
import { StatementPeriodService } from "../statement-period/statement-period.service.js"
import AppError from "../utils/appError.js"
import { constants } from "../utils/constants.js"
import {
	CreateExpenseDTO,
	GetExpensesRequest,
	GetExpensesResponse,
	OrderByType,
	UpdateExpenseDTO
} from "./expense.dto.js"

@Injectable()
export class ExpenseService {
	private readonly logger = new Logger(ExpenseService.name)

	constructor(
		private readonly databaseService: DatabaseService,
		private readonly paymentTypeService: PaymentTypeService,
		private readonly statementPeriodService: StatementPeriodService
	) {}

	/**
	 * Converts a monetary amount to its integer cent representation, halving it
	 * (rounded) when the expense is shared and split, but not when it is personal.
	 * @param amount - The raw expense amount, in currency units (e.g. dollars).
	 * @param personal - Whether the expense is personal (not shared).
	 * @param split - Whether a shared expense is split between owner and counterpart.
	 * @returns The net amount in cents to persist.
	 */
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

	/**
	 * Builds a Prisma `orderBy` clause from a public-facing sort column name,
	 * mapping it via `constants.orderColumns` and handling both direct columns
	 * and dotted relation columns (e.g. "relation.field").
	 * @param orderBy - Public sort key requested by the caller; defaults to the "date" column
	 * mapping when not recognized.
	 * @param orderType - Sort direction; defaults to `"asc"`.
	 * @returns A Prisma-compatible `orderBy` object, nested for relation columns.
	 */
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

	/**
	 * Determines the due date of an expense based on its payment type.
	 * For payment types without a statement, the due date is the end of the
	 * transaction month (or of the next month, unless `currentMonth` is set).
	 * For payment types with a statement, the due date is derived from the
	 * user's/bank's statement period (`initialDay`/`finalDay`).
	 * @param transactionDate - Date the expense transaction occurred on.
	 * @param paymentTypeId - ID of the payment type used for the expense.
	 * @param userId - ID of the expense owner, used to look up the statement period.
	 * @param bankId - ID of the bank; required when the payment type has a statement.
	 * @param currentMonth - When true and the payment type has no statement, use the
	 * transaction's own month instead of the following month.
	 * @returns The calculated due date.
	 * @throws AppError if the payment type has a statement but no `bankId` was provided.
	 * @throws AppError if no statement period is found for the given user/bank/payment type.
	 */
	private async calculateDueDate(
		transactionDate: Date,
		paymentTypeId: string,
		userId: string,
		bankId?: string,
		currentMonth?: boolean
	): Promise<Date> {
		const paymentType = await this.paymentTypeService.getById(paymentTypeId)

		if (!paymentType?.hasStatement) {
			const referenceDate = currentMonth
				? transactionDate
				: addMonths(transactionDate, 1)
			return endOfMonth(referenceDate)
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

	/**
	 * Creates a new expense record for the given user, computing its net amount
	 * and due date before persisting it.
	 * @param data - Expense creation payload.
	 * @param userId - ID of the user who will own the expense.
	 * @returns The newly created expense, with its related category, payment type,
	 * bank, store, and user included.
	 * @throws AppError with status 400 if `data.date` is in the future.
	 * @throws AppError with status 400 if a referenced foreign key (category, payment
	 * type, bank, or store) does not exist, or if the expense violates the unique
	 * constraint for duplicated expenses.
	 * @throws AppError with status 500 on any other unexpected database error.
	 */
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
				data.bank_id,
				data.current_month
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

			this.logger.error(
				`Error - ${error instanceof Error ? error.message : error} - creating expense`
			)
			throw new AppError("Internal server error", 500)
		}
	}

	/**
	 * Updates an existing expense owned by the given user, recomputing its net
	 * amount and due date. Performs the read-check-write inside a transaction to
	 * guard against the expense being deleted concurrently.
	 * @param id - ID of the expense to update.
	 * @param data - Expense update payload.
	 * @param userId - ID of the user performing the update; must be the expense owner.
	 * @returns The updated expense, with its related category, payment type, bank,
	 * store, and user included.
	 * @throws AppError with status 404 if the expense does not exist (or is deleted,
	 * including if deleted between the initial check and the transaction).
	 * @throws AppError with status 403 if `userId` is not the expense's owner.
	 * @throws AppError with status 400 if `data.date` is in the future.
	 * @throws AppError with status 400 if a referenced foreign key does not exist, or
	 * if the update violates the unique constraint for duplicated expenses.
	 * @throws AppError with status 500 on any other unexpected database error.
	 */
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
				data.bank_id,
				data.current_month
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
				`Error - ${error instanceof Error ? error.message : error} - updating expense ${id}`
			)
			throw new AppError("Internal server error", 500)
		}
	}

	/**
	 * Soft-deletes an expense owned by the given user by setting its `deletedAt`
	 * timestamp; does not remove the underlying record.
	 * @param id - ID of the expense to delete.
	 * @param userId - ID of the user performing the deletion; must be the expense owner.
	 * @returns Nothing on success.
	 * @throws AppError with status 404 if the expense does not exist.
	 * @throws AppError with status 403 if `userId` is not the expense's owner.
	 * @throws AppError with status 500 on any unexpected database error other than
	 * a "record not found" error, which is treated as an already-deleted no-op.
	 */
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
				`Error - ${error instanceof Error ? error.message : error} - deleting expense ${id}`
			)
			throw new AppError("Internal server error", 500)
		}
	}

	/**
	 * Retrieves paginated, non-deleted expenses considered "personal" to the
	 * given owner: expenses they own that are personal or split, plus expenses
	 * owned by others that are not personal.
	 * @param request.ownerId - ID of the user whose personal expenses are being fetched.
	 * @param request.startDate - Optional inclusive lower bound on `dueDate`.
	 * @param request.endDate - Inclusive upper bound on `dueDate`.
	 * @param request.offset - Number of records to skip, for pagination.
	 * @param request.limit - Maximum number of records to return.
	 * @param request.orderBy - Public sort key, resolved via `getOrderByClause`.
	 * @param request.orderType - Sort direction.
	 * @param request.filterBy - Optional column (resolved via `constants.filterColumns`) to filter on.
	 * @param request.filterValue - Value to filter `filterBy` on.
	 * @returns The matching expenses (with related entities included) and the total
	 * matching count (ignoring pagination).
	 */
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

	/**
	 * Retrieves paginated, non-deleted, non-personal (shared) expenses, regardless
	 * of owner.
	 * @param request.startDate - Optional inclusive lower bound on `dueDate`.
	 * @param request.endDate - Inclusive upper bound on `dueDate`.
	 * @param request.offset - Number of records to skip, for pagination.
	 * @param request.limit - Maximum number of records to return.
	 * @param request.orderBy - Public sort key, resolved via `getOrderByClause`.
	 * @param request.orderType - Sort direction.
	 * @param request.filterBy - Optional column (resolved via `constants.filterColumns`) to filter on.
	 * @param request.filterValue - Value to filter `filterBy` on.
	 * @returns The matching expenses (with related entities included) and the total
	 * matching count (ignoring pagination).
	 */
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

	/**
	 * Retrieves all non-deleted expenses matching the given personal/shared flag
	 * and due date range, restricted to expenses whose payment type is not deleted.
	 * Not paginated.
	 * @param personal - Whether to fetch personal (`true`) or shared (`false`) expenses.
	 * @param startDate - Inclusive lower bound on `dueDate`.
	 * @param endDate - Inclusive upper bound on `dueDate`.
	 * @returns The matching expenses, with related entities included.
	 */
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
