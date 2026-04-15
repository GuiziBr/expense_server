import { Logger } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { addDays, addMonths, endOfMonth, setDate } from "date-fns"
import { StatementPeriod } from "@/domains/statement-period.domain"
import { DatabaseService } from "@/infra/database/database.service"
import AppError from "@/modules/utils/appError"
import { PaymentTypeService } from "../payment-type/payment-type.service"
import { StatementPeriodService } from "../statement-period/statement-period.service"
import { createPrismaError } from "../test-utils/errors.factory"
import { createExpense } from "../test-utils/expense.factory"
import { createPaymentType } from "../test-utils/payment-type.factory"
import { createStatementPeriod } from "../test-utils/statement-period.factory"
import { constants } from "../utils/constants"
import {
	CreateExpenseDTO,
	GetExpensesRequest,
	UpdateExpenseDTO
} from "./expense.dto"
import { ExpenseService } from "./expense.service"

const createPayload = (
	expenseDate: Date,
	personal: boolean,
	split: boolean,
	currentMonth?: boolean
) =>
	({
		description: "description",
		date: expenseDate,
		amount: 100,
		category_id: "category-id",
		payment_type_id: "payment-type-id",
		store_id: "store-id",
		bank_id: "bank-id",
		personal,
		split,
		...(currentMonth !== undefined && { current_month: currentMonth })
	}) as CreateExpenseDTO

describe("ExpenseService", () => {
	let expenseService: ExpenseService
	let databaseService: DatabaseService
	let paymentTypeService: PaymentTypeService
	let statementPeriodService: StatementPeriodService
	let loggerSpy: ReturnType<typeof vi.spyOn>

	const fakeExpense = createExpense()
	const fakePaymentType = createPaymentType({ hasStatement: true })
	const fakeStatementPeriod = createStatementPeriod({
		initialDay: "10",
		finalDay: "09"
	})

	beforeEach(async () => {
		const expenseMock = {
			create: vi.fn().mockResolvedValue(fakeExpense),
			findFirst: vi.fn().mockResolvedValue(fakeExpense),
			findMany: vi.fn().mockResolvedValue([fakeExpense]),
			count: vi.fn().mockResolvedValue(1),
			update: vi.fn().mockResolvedValue(undefined)
		}

		const module = await Test.createTestingModule({
			providers: [
				ExpenseService,
				{
					provide: DatabaseService,
					useValue: {
						$transaction: vi
							.fn()
							.mockImplementation((fn) => fn({ expense: expenseMock })),
						expense: expenseMock
					}
				},
				{
					provide: PaymentTypeService,
					useValue: {
						getById: vi.fn().mockResolvedValue(fakePaymentType)
					}
				},
				{
					provide: StatementPeriodService,
					useValue: {
						findByUserAndBank: vi.fn().mockResolvedValue(fakeStatementPeriod)
					}
				}
			]
		}).compile()

		expenseService = module.get<ExpenseService>(ExpenseService)
		databaseService = module.get<DatabaseService>(DatabaseService)
		paymentTypeService = module.get<PaymentTypeService>(PaymentTypeService)
		statementPeriodService = module.get<StatementPeriodService>(
			StatementPeriodService
		)
		loggerSpy = vi.spyOn(Logger.prototype, "error")
	})

	describe("createExpense", () => {
		it("should throw error if date is in the future", async () => {
			const payload = createPayload(addDays(new Date(), 1), true, false)

			await expect(
				expenseService.createExpense(payload, "user_id")
			).rejects.toThrow(AppError)

			expect(databaseService.expense.create).not.toHaveBeenCalled()
		})

		it("should throw error if payment type has no bank", async () => {
			const payload = createPayload(new Date(), true, false)

			delete payload.bank_id

			await expect(
				expenseService.createExpense(payload, "user_id")
			).rejects.toThrow(AppError)

			expect(paymentTypeService.getById).toBeCalledWith("payment-type-id")

			expect(databaseService.expense.create).not.toHaveBeenCalled()
		})

		it("should throw error if payment type has no statement", async () => {
			const payload = createPayload(new Date(), true, false)

			vi.spyOn(statementPeriodService, "findByUserAndBank").mockResolvedValue(
				null
			)

			await expect(
				expenseService.createExpense(payload, "user_id")
			).rejects.toThrow(AppError)

			expect(paymentTypeService.getById).toBeCalledWith("payment-type-id")

			expect(databaseService.expense.create).not.toHaveBeenCalled()
		})

		it("should create personal expense with no statement for end of next month by default", async () => {
			const expenseDate = new Date()

			const expectDueDate = endOfMonth(addMonths(expenseDate, 1))

			const payload = createPayload(expenseDate, true, false)

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})

			await expenseService.createExpense(payload, "user_id")

			expect(databaseService.expense.create).toBeCalledWith({
				data: {
					ownerId: "user_id",
					description: payload.description,
					date: expenseDate,
					amount: payload.amount * 100,
					categoryId: payload.category_id,
					personal: true,
					split: false,
					paymentTypeId: payload.payment_type_id,
					bankId: payload.bank_id,
					storeId: payload.store_id,
					dueDate: expectDueDate
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})
		})

		it("should create personal expense with no statement for end of current month when current_month is true", async () => {
			const expenseDate = new Date()

			const expectDueDate = endOfMonth(expenseDate)

			const payload = createPayload(expenseDate, true, false, true)

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})

			await expenseService.createExpense(payload, "user_id")

			expect(databaseService.expense.create).toBeCalledWith({
				data: {
					ownerId: "user_id",
					description: payload.description,
					date: expenseDate,
					amount: payload.amount * 100,
					categoryId: payload.category_id,
					personal: true,
					split: false,
					paymentTypeId: payload.payment_type_id,
					bankId: payload.bank_id,
					storeId: payload.store_id,
					dueDate: expectDueDate
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})
		})

		it("should create split expense with no statement for end of next month by default", async () => {
			const expenseDate = new Date()

			const expectDueDate = endOfMonth(addMonths(expenseDate, 1))

			const payload = createPayload(expenseDate, false, true)

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})

			await expenseService.createExpense(payload, "user_id")

			expect(databaseService.expense.create).toBeCalledWith({
				data: {
					ownerId: "user_id",
					description: payload.description,
					date: expenseDate,
					amount: Math.round((payload.amount * 100) / 2),
					categoryId: payload.category_id,
					personal: false,
					split: true,
					paymentTypeId: payload.payment_type_id,
					bankId: payload.bank_id,
					storeId: payload.store_id,
					dueDate: expectDueDate
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})
		})

		it("should create neither personal nor split expense with no statement for end of next month by default", async () => {
			const expenseDate = new Date()

			const expectDueDate = endOfMonth(addMonths(expenseDate, 1))

			const payload = createPayload(expenseDate, false, false)

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})

			await expenseService.createExpense(payload, "user_id")

			expect(databaseService.expense.create).toBeCalledWith({
				data: {
					ownerId: "user_id",
					description: payload.description,
					date: expenseDate,
					amount: payload.amount * 100,
					categoryId: payload.category_id,
					personal: false,
					split: false,
					paymentTypeId: payload.payment_type_id,
					bankId: payload.bank_id,
					storeId: payload.store_id,
					dueDate: expectDueDate
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})
		})

		it("should create expense with due date set for last day of month", async () => {
			const expenseDate = new Date()

			const expectDueDate = setDate(
				expenseDate,
				endOfMonth(expenseDate).getDate()
			)

			const payload = createPayload(expenseDate, false, false)

			const fakeStatementPeriod = {
				initialDay: (expenseDate.getDate() + 1).toString(),
				finalDay: (expenseDate.getDate() - 1).toString()
			} as StatementPeriod

			vi.spyOn(statementPeriodService, "findByUserAndBank").mockResolvedValue(
				fakeStatementPeriod
			)

			await expenseService.createExpense(payload, "user_id")

			expect(databaseService.expense.create).toBeCalledWith({
				data: {
					ownerId: "user_id",
					description: payload.description,
					date: expenseDate,
					amount: payload.amount * 100,
					categoryId: payload.category_id,
					personal: false,
					split: false,
					paymentTypeId: payload.payment_type_id,
					bankId: payload.bank_id,
					storeId: payload.store_id,
					dueDate: expectDueDate
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})

			expect(paymentTypeService.getById).toBeCalledWith("payment-type-id")

			expect(statementPeriodService.findByUserAndBank).toBeCalledWith(
				"user_id",
				"bank-id",
				"payment-type-id"
			)
		})

		it("should create expense with due date set for next month", async () => {
			const expenseDate = new Date()

			const expenseDay = expenseDate.getDate()

			const expectDueDate = new Date(
				expenseDate.getFullYear(),
				expenseDate.getMonth() + 1,
				expenseDay - 1
			)

			const payload = createPayload(expenseDate, false, false)

			const fakeStatementPeriod = {
				initialDay: (expenseDay - 1).toString(),
				finalDay: (expenseDay - 2).toString()
			} as StatementPeriod

			vi.spyOn(statementPeriodService, "findByUserAndBank").mockResolvedValue(
				fakeStatementPeriod
			)

			await expenseService.createExpense(payload, "user_id")

			expect(databaseService.expense.create).toBeCalledWith({
				data: {
					ownerId: "user_id",
					description: payload.description,
					date: expenseDate,
					amount: payload.amount * 100,
					categoryId: payload.category_id,
					personal: false,
					split: false,
					paymentTypeId: payload.payment_type_id,
					bankId: payload.bank_id,
					storeId: payload.store_id,
					dueDate: expectDueDate
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})

			expect(paymentTypeService.getById).toBeCalledWith("payment-type-id")

			expect(statementPeriodService.findByUserAndBank).toBeCalledWith(
				"user_id",
				"bank-id",
				"payment-type-id"
			)
		})

		it("should throw error if category not found", async () => {
			const prismaError = createPrismaError(constants.FOREIGN_KEY_VIOLATION, {
				field_name: "error_category_id"
			})

			const expenseDate = new Date()

			const payload = createPayload(expenseDate, false, false)

			vi.spyOn(databaseService.expense, "create").mockRejectedValue(prismaError)

			await expect(
				expenseService.createExpense(payload, "user_id")
			).rejects.toThrow(AppError)

			expect(databaseService.expense.create).toBeCalledWith({
				data: {
					ownerId: "user_id",
					description: payload.description,
					date: expenseDate,
					amount: payload.amount * 100,
					categoryId: payload.category_id,
					personal: false,
					split: false,
					paymentTypeId: payload.payment_type_id,
					bankId: payload.bank_id,
					storeId: payload.store_id,
					dueDate: expect.any(Date)
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})

			expect(paymentTypeService.getById).toBeCalledWith("payment-type-id")

			expect(statementPeriodService.findByUserAndBank).toBeCalledWith(
				"user_id",
				"bank-id",
				"payment-type-id"
			)

			expect(loggerSpy).toBeCalledWith("Error - P2003 - creating expense")
		})

		it("should throw error if duplicated expense", async () => {
			const prismaError = createPrismaError(
				constants.UNIQUE_CONSTRAINT_VIOLATION,
				{ field_name: "error_category_id" }
			)

			const expenseDate = new Date()

			const payload = createPayload(expenseDate, false, false)

			vi.spyOn(databaseService.expense, "create").mockRejectedValue(prismaError)

			await expect(
				expenseService.createExpense(payload, "user_id")
			).rejects.toThrow(AppError)

			expect(databaseService.expense.create).toBeCalledWith({
				data: {
					ownerId: "user_id",
					description: payload.description,
					date: expenseDate,
					amount: payload.amount * 100,
					categoryId: payload.category_id,
					personal: false,
					split: false,
					paymentTypeId: payload.payment_type_id,
					bankId: payload.bank_id,
					storeId: payload.store_id,
					dueDate: expect.any(Date)
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})

			expect(paymentTypeService.getById).toBeCalledWith("payment-type-id")

			expect(statementPeriodService.findByUserAndBank).toBeCalledWith(
				"user_id",
				"bank-id",
				"payment-type-id"
			)

			expect(loggerSpy).toBeCalledWith("Error - P2002 - creating expense")
		})
	})

	describe("getPersonalExpenses", () => {
		it("should return personal expenses with no start date", async () => {
			const expensesRequest = {
				ownerId: "user_id",
				endDate: new Date(),
				offset: 0,
				limit: 10,
				orderBy: "amount",
				orderType: "asc",
				filterBy: "category",
				filterValue: "category_id"
			} as GetExpensesRequest

			const result = await expenseService.getPersonalExpenses(expensesRequest)

			expect(result).toEqual({
				expenses: [fakeExpense],
				totalCount: 1
			})

			const expectedWhereClause = {
				deletedAt: null,
				OR: [
					{
						AND: [
							{ ownerId: expensesRequest.ownerId },
							{ OR: [{ personal: true }, { split: true }] }
						]
					},
					{
						AND: [
							{ NOT: { ownerId: expensesRequest.ownerId } },
							{ personal: false }
						]
					}
				],
				dueDate: { lte: expensesRequest.endDate },
				categoryId: expensesRequest.filterValue
			}

			expect(databaseService.expense.findMany).toBeCalledWith({
				where: expectedWhereClause,
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				},
				orderBy: { amount: expensesRequest.orderType },
				skip: expensesRequest.offset,
				take: expensesRequest.limit
			})

			expect(databaseService.expense.count).toBeCalledWith({
				where: expectedWhereClause
			})
		})

		it("should return personal expenses with start date and no filter", async () => {
			const expensesRequest = {
				ownerId: "user_id",
				startDate: new Date(),
				endDate: new Date(),
				offset: 0,
				limit: 10,
				orderBy: "payment_type",
				orderType: "asc"
			} as GetExpensesRequest

			const result = await expenseService.getPersonalExpenses(expensesRequest)

			expect(result).toEqual({
				expenses: [fakeExpense],
				totalCount: 1
			})

			const expectedWhereClause = {
				deletedAt: null,
				OR: [
					{
						AND: [
							{ ownerId: expensesRequest.ownerId },
							{ OR: [{ personal: true }, { split: true }] }
						]
					},
					{
						AND: [
							{ NOT: { ownerId: expensesRequest.ownerId } },
							{ personal: false }
						]
					}
				],
				dueDate: {
					lte: expensesRequest.endDate,
					gte: expensesRequest.startDate
				},
				categoryId: expensesRequest.filterValue
			}

			expect(databaseService.expense.findMany).toBeCalledWith({
				where: expectedWhereClause,
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				},
				orderBy: { paymentType: { description: expensesRequest.orderType } },
				skip: expensesRequest.offset,
				take: expensesRequest.limit
			})

			expect(databaseService.expense.count).toBeCalledWith({
				where: expectedWhereClause
			})
		})
	})

	describe("getSharedExpenses", () => {
		it("should return shared expenses with no start date", async () => {
			const expensesRequest = {
				endDate: new Date(),
				offset: 0,
				limit: 10,
				orderBy: "amount",
				orderType: "asc",
				filterBy: "category",
				filterValue: "category_id"
			} as GetExpensesRequest

			const result = await expenseService.getSharedExpenses(expensesRequest)

			expect(result).toEqual({
				expenses: [fakeExpense],
				totalCount: 1
			})

			const expectedWhereClause = {
				deletedAt: null,
				personal: false,
				dueDate: { lte: expensesRequest.endDate },
				categoryId: expensesRequest.filterValue
			}

			expect(databaseService.expense.findMany).toBeCalledWith({
				where: expectedWhereClause,
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				},
				orderBy: { amount: expensesRequest.orderType },
				skip: expensesRequest.offset,
				take: expensesRequest.limit
			})

			expect(databaseService.expense.count).toBeCalledWith({
				where: expectedWhereClause
			})
		})

		it("should return shared expenses with start date and no filter", async () => {
			const expensesRequest = {
				startDate: new Date(),
				endDate: new Date(),
				offset: 0,
				limit: 10,
				orderBy: "payment_type",
				orderType: "asc"
			} as GetExpensesRequest

			const result = await expenseService.getSharedExpenses(expensesRequest)

			expect(result).toEqual({
				expenses: [fakeExpense],
				totalCount: 1
			})

			const expectedWhereClause = {
				deletedAt: null,
				personal: false,
				dueDate: {
					lte: expensesRequest.endDate,
					gte: expensesRequest.startDate
				}
			}

			expect(databaseService.expense.findMany).toBeCalledWith({
				where: expectedWhereClause,
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				},
				orderBy: { paymentType: { description: expensesRequest.orderType } },
				skip: expensesRequest.offset,
				take: expensesRequest.limit
			})

			expect(databaseService.expense.count).toBeCalledWith({
				where: expectedWhereClause
			})
		})
	})

	describe("getExpensesByDateRange", () => {
		it("should return expenses by date range", async () => {
			const startDate = new Date()
			const endDate = new Date()

			await expenseService.getExpensesByDateRange(false, startDate, endDate)

			expect(databaseService.expense.findMany).toBeCalledWith({
				where: {
					deletedAt: null,
					personal: false,
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
		})
	})

	describe("deleteExpense", () => {
		it("should soft delete expense when user is the owner", async () => {
			await expenseService.deleteExpense(fakeExpense.id, fakeExpense.ownerId)

			expect(databaseService.expense.findFirst).toBeCalledWith({
				where: { id: fakeExpense.id, deletedAt: null }
			})

			expect(databaseService.expense.update).toBeCalledWith({
				where: { id: fakeExpense.id },
				data: { deletedAt: expect.any(Date) }
			})
		})

		it("should throw 404 if expense not found", async () => {
			vi.spyOn(databaseService.expense, "findFirst").mockResolvedValue(null)

			await expect(
				expenseService.deleteExpense(fakeExpense.id, fakeExpense.ownerId)
			).rejects.toThrow(new AppError("Expense not found", 404))

			expect(databaseService.expense.update).not.toHaveBeenCalled()
		})

		it("should throw 403 if user is not the owner", async () => {
			await expect(
				expenseService.deleteExpense(fakeExpense.id, "other-user-id")
			).rejects.toThrow(new AppError("Unauthorized", 403))

			expect(databaseService.expense.update).not.toHaveBeenCalled()
		})

		it("should return without error if prisma record not found on update", async () => {
			const prismaError = createPrismaError(constants.RECORD_NOT_FOUND, {})

			vi.spyOn(databaseService.expense, "update").mockRejectedValue(prismaError)

			await expect(
				expenseService.deleteExpense(fakeExpense.id, fakeExpense.ownerId)
			).resolves.toBeUndefined()
		})

		it("should throw 500 on unknown error during update", async () => {
			vi.spyOn(databaseService.expense, "update").mockRejectedValue(
				new Error("DB connection lost")
			)

			await expect(
				expenseService.deleteExpense(fakeExpense.id, fakeExpense.ownerId)
			).rejects.toThrow(new AppError("Internal server error", 500))

			expect(loggerSpy).toBeCalledWith(
				`Error - DB connection lost - deleting expense ${fakeExpense.id}`
			)
		})
	})

	describe("updateExpense", () => {
		const createUpdatePayload = (
			expenseDate: Date,
			personal: boolean,
			split: boolean,
			currentMonth?: boolean
		) =>
			({
				description: "updated description",
				date: expenseDate,
				amount: 100,
				category_id: "category-id",
				payment_type_id: "payment-type-id",
				bank_id: "bank-id",
				store_id: "store-id",
				personal,
				split,
				...(currentMonth !== undefined && { current_month: currentMonth })
			}) as UpdateExpenseDTO

		it("should throw 404 if expense not found", async () => {
			vi.spyOn(databaseService.expense, "findFirst").mockResolvedValue(null)

			await expect(
				expenseService.updateExpense(
					fakeExpense.id,
					createUpdatePayload(new Date(), false, false),
					fakeExpense.ownerId
				)
			).rejects.toThrow(new AppError("Expense not found", 404))

			expect(databaseService.expense.update).not.toHaveBeenCalled()
		})

		it("should throw 403 if user is not the owner", async () => {
			await expect(
				expenseService.updateExpense(
					fakeExpense.id,
					createUpdatePayload(new Date(), false, false),
					"other-user-id"
				)
			).rejects.toThrow(new AppError("Unauthorized", 403))

			expect(databaseService.expense.update).not.toHaveBeenCalled()
		})

		it("should throw 400 if date is in the future", async () => {
			await expect(
				expenseService.updateExpense(
					fakeExpense.id,
					createUpdatePayload(addDays(new Date(), 1), false, false),
					fakeExpense.ownerId
				)
			).rejects.toThrow(new AppError("Date must not be in the future", 400))

			expect(databaseService.expense.update).not.toHaveBeenCalled()
		})

		it("should throw 404 if expense is deleted between pre-check and transaction", async () => {
			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})
			vi.spyOn(databaseService.expense, "findFirst")
				.mockResolvedValueOnce(fakeExpense)
				.mockResolvedValueOnce(null)

			await expect(
				expenseService.updateExpense(
					fakeExpense.id,
					createUpdatePayload(new Date(), false, false),
					fakeExpense.ownerId
				)
			).rejects.toThrow(new AppError("Expense not found", 404))

			expect(databaseService.expense.update).not.toHaveBeenCalled()
		})

		it("should update personal expense with no statement period for end of next month by default", async () => {
			const expenseDate = new Date()
			const expectedDueDate = endOfMonth(addMonths(expenseDate, 1))
			const payload = createUpdatePayload(expenseDate, true, false)

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})
			vi.spyOn(databaseService.expense, "update").mockResolvedValue(fakeExpense)

			await expenseService.updateExpense(
				fakeExpense.id,
				payload,
				fakeExpense.ownerId
			)

			expect(databaseService.expense.update).toBeCalledWith({
				where: { id: fakeExpense.id },
				data: {
					description: payload.description,
					date: expenseDate,
					amount: payload.amount * 100,
					categoryId: payload.category_id,
					personal: true,
					split: false,
					paymentTypeId: payload.payment_type_id,
					bankId: payload.bank_id,
					storeId: payload.store_id,
					dueDate: expectedDueDate
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})
		})

		it("should update personal expense with no statement period for end of current month when current_month is true", async () => {
			const expenseDate = new Date()
			const expectedDueDate = endOfMonth(expenseDate)
			const payload = createUpdatePayload(expenseDate, true, false, true)

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})
			vi.spyOn(databaseService.expense, "update").mockResolvedValue(fakeExpense)

			await expenseService.updateExpense(
				fakeExpense.id,
				payload,
				fakeExpense.ownerId
			)

			expect(databaseService.expense.update).toBeCalledWith({
				where: { id: fakeExpense.id },
				data: {
					description: payload.description,
					date: expenseDate,
					amount: payload.amount * 100,
					categoryId: payload.category_id,
					personal: true,
					split: false,
					paymentTypeId: payload.payment_type_id,
					bankId: payload.bank_id,
					storeId: payload.store_id,
					dueDate: expectedDueDate
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})
		})

		it("should update split expense with halved amount and end of next month by default", async () => {
			const expenseDate = new Date()
			const expectedDueDate = endOfMonth(addMonths(expenseDate, 1))
			const payload = createUpdatePayload(expenseDate, false, true)

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})
			vi.spyOn(databaseService.expense, "update").mockResolvedValue(fakeExpense)

			await expenseService.updateExpense(
				fakeExpense.id,
				payload,
				fakeExpense.ownerId
			)

			expect(databaseService.expense.update).toBeCalledWith({
				where: { id: fakeExpense.id },
				data: {
					description: payload.description,
					date: expenseDate,
					amount: Math.round((payload.amount * 100) / 2),
					categoryId: payload.category_id,
					personal: false,
					split: true,
					paymentTypeId: payload.payment_type_id,
					bankId: payload.bank_id,
					storeId: payload.store_id,
					dueDate: expectedDueDate
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})
		})

		it("should set bankId and storeId to null when omitted from payload", async () => {
			const expenseDate = new Date()
			const expectedDueDate = endOfMonth(addMonths(expenseDate, 1))
			const payload = {
				description: "updated description",
				date: expenseDate,
				amount: 100,
				category_id: "category-id",
				payment_type_id: "payment-type-id",
				personal: false,
				split: false
			} as UpdateExpenseDTO

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})
			vi.spyOn(databaseService.expense, "update").mockResolvedValue(fakeExpense)

			await expenseService.updateExpense(
				fakeExpense.id,
				payload,
				fakeExpense.ownerId
			)

			expect(databaseService.expense.update).toBeCalledWith({
				where: { id: fakeExpense.id },
				data: {
					description: payload.description,
					date: expenseDate,
					amount: payload.amount * 100,
					categoryId: payload.category_id,
					personal: false,
					split: false,
					paymentTypeId: payload.payment_type_id,
					bankId: null,
					storeId: null,
					dueDate: expectedDueDate
				},
				include: {
					category: true,
					paymentType: true,
					bank: true,
					store: true,
					user: true
				}
			})
		})

		it("should throw error on foreign key violation", async () => {
			const prismaError = createPrismaError(constants.FOREIGN_KEY_VIOLATION, {
				field_name: "error_category_id"
			})
			const payload = createUpdatePayload(new Date(), false, false)

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})
			vi.spyOn(databaseService.expense, "update").mockRejectedValue(prismaError)

			await expect(
				expenseService.updateExpense(
					fakeExpense.id,
					payload,
					fakeExpense.ownerId
				)
			).rejects.toThrow(AppError)

			expect(loggerSpy).toBeCalledWith("Error - P2003 - updating expense")
		})

		it("should throw 500 on unknown error during update", async () => {
			const payload = createUpdatePayload(new Date(), false, false)

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})
			vi.spyOn(databaseService.expense, "update").mockRejectedValue(
				new Error("DB connection lost")
			)

			await expect(
				expenseService.updateExpense(
					fakeExpense.id,
					payload,
					fakeExpense.ownerId
				)
			).rejects.toThrow(new AppError("Internal server error", 500))

			expect(loggerSpy).toBeCalledWith(
				`Error - DB connection lost - updating expense ${fakeExpense.id}`
			)
		})
	})
})
