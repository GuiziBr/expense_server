import {
	BadRequestException,
	ForbiddenException,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { addDays, addMonths, endOfMonth, setDate } from "date-fns"
import { StatementPeriod } from "@/domains/statement-period.domain"
import { DatabaseService } from "@/infra/database/database.service"
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
			update: vi.fn().mockResolvedValue(undefined),
			groupBy: vi.fn().mockResolvedValue([])
		}

		const lookupMock = () => ({ findMany: vi.fn().mockResolvedValue([]) })

		const module = await Test.createTestingModule({
			providers: [
				ExpenseService,
				{
					provide: DatabaseService,
					useValue: {
						$transaction: vi
							.fn()
							.mockImplementation((fn) => fn({ expense: expenseMock })),
						expense: expenseMock,
						category: lookupMock(),
						paymentType: lookupMock(),
						bank: lookupMock(),
						store: lookupMock()
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
			).rejects.toThrow(BadRequestException)

			expect(databaseService.expense.create).not.toHaveBeenCalled()
		})

		it("should throw error if payment type has no bank", async () => {
			const payload = createPayload(new Date(), true, false)

			delete payload.bank_id

			await expect(
				expenseService.createExpense(payload, "user_id")
			).rejects.toThrow(BadRequestException)

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
			).rejects.toThrow(BadRequestException)

			expect(paymentTypeService.getById).toBeCalledWith("payment-type-id")

			expect(databaseService.expense.create).not.toHaveBeenCalled()
		})

		it("should default bankId and storeId to null when omitted", async () => {
			const expenseDate = new Date()

			const payload = createPayload(expenseDate, true, false)
			delete payload.bank_id
			delete payload.store_id

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})

			await expenseService.createExpense(payload, "user_id")

			expect(databaseService.expense.create).toBeCalledWith(
				expect.objectContaining({
					data: expect.objectContaining({
						bankId: null,
						storeId: null
					})
				})
			)
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
			).rejects.toThrow(BadRequestException)

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
			).rejects.toThrow(BadRequestException)

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

		it("should throw 500 on unknown error during create", async () => {
			const payload = createPayload(new Date(), false, false)

			vi.spyOn(databaseService.expense, "create").mockRejectedValue(
				new Error("DB connection lost")
			)

			await expect(
				expenseService.createExpense(payload, "user_id")
			).rejects.toThrow(
				new InternalServerErrorException("Internal server error")
			)

			expect(loggerSpy).toBeCalledWith(
				"Error - DB connection lost - creating expense"
			)
		})

		it("should throw 500 and log the raw error when a non-Error is thrown", async () => {
			const payload = createPayload(new Date(), false, false)

			vi.spyOn(databaseService.expense, "create").mockRejectedValue("raw error")

			await expect(
				expenseService.createExpense(payload, "user_id")
			).rejects.toThrow(
				new InternalServerErrorException("Internal server error")
			)

			expect(loggerSpy).toBeCalledWith("Error - raw error - creating expense")
		})

		it("should throw 500 on an unrecognized prisma error code", async () => {
			const prismaError = createPrismaError("P9999")
			const payload = createPayload(new Date(), false, false)

			vi.spyOn(databaseService.expense, "create").mockRejectedValue(prismaError)

			await expect(
				expenseService.createExpense(payload, "user_id")
			).rejects.toThrow(
				new InternalServerErrorException("Internal server error")
			)

			expect(loggerSpy).toBeCalledWith("Error - P9999 - creating expense")
		})

		it("should fall back to the raw error when a prisma error has no code", async () => {
			const prismaError = createPrismaError("")
			const payload = createPayload(new Date(), false, false)

			vi.spyOn(databaseService.expense, "create").mockRejectedValue(prismaError)

			await expect(
				expenseService.createExpense(payload, "user_id")
			).rejects.toThrow(
				new InternalServerErrorException("Internal server error")
			)

			expect(loggerSpy).toBeCalledWith(
				`Error - ${prismaError} - creating expense`
			)
		})
	})

	describe("getPersonalExpenses", () => {
		it("should default orderBy to date when the column is not recognized", async () => {
			const expensesRequest = {
				ownerId: "user_id",
				endDate: new Date(),
				orderType: "asc"
			} as GetExpensesRequest

			await expenseService.getPersonalExpenses(expensesRequest)

			expect(databaseService.expense.findMany).toBeCalledWith(
				expect.objectContaining({
					orderBy: { date: "asc" }
				})
			)
		})

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
			).rejects.toThrow(new NotFoundException("Expense not found"))

			expect(databaseService.expense.update).not.toHaveBeenCalled()
		})

		it("should throw 403 if user is not the owner", async () => {
			await expect(
				expenseService.deleteExpense(fakeExpense.id, "other-user-id")
			).rejects.toThrow(new ForbiddenException("Unauthorized"))

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
			).rejects.toThrow(
				new InternalServerErrorException("Internal server error")
			)

			expect(loggerSpy).toBeCalledWith(
				`Error - DB connection lost - deleting expense ${fakeExpense.id}`
			)
		})

		it("should throw 500 and log the raw error when a non-Error is thrown", async () => {
			vi.spyOn(databaseService.expense, "update").mockRejectedValue("raw error")

			await expect(
				expenseService.deleteExpense(fakeExpense.id, fakeExpense.ownerId)
			).rejects.toThrow(
				new InternalServerErrorException("Internal server error")
			)

			expect(loggerSpy).toBeCalledWith(
				`Error - raw error - deleting expense ${fakeExpense.id}`
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
			).rejects.toThrow(new NotFoundException("Expense not found"))

			expect(databaseService.expense.update).not.toHaveBeenCalled()
		})

		it("should throw 403 if user is not the owner", async () => {
			await expect(
				expenseService.updateExpense(
					fakeExpense.id,
					createUpdatePayload(new Date(), false, false),
					"other-user-id"
				)
			).rejects.toThrow(new ForbiddenException("Unauthorized"))

			expect(databaseService.expense.update).not.toHaveBeenCalled()
		})

		it("should throw 400 if date is in the future", async () => {
			await expect(
				expenseService.updateExpense(
					fakeExpense.id,
					createUpdatePayload(addDays(new Date(), 1), false, false),
					fakeExpense.ownerId
				)
			).rejects.toThrow(
				new BadRequestException("Date must not be in the future")
			)

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
			).rejects.toThrow(new NotFoundException("Expense not found"))

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
			).rejects.toThrow(BadRequestException)

			expect(loggerSpy).toBeCalledWith("Error - P2003 - updating expense")
		})

		it("should throw error on unique constraint violation", async () => {
			const prismaError = createPrismaError(
				constants.UNIQUE_CONSTRAINT_VIOLATION,
				{ field_name: "error_category_id" }
			)
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
			).rejects.toThrow(BadRequestException)

			expect(loggerSpy).toBeCalledWith("Error - P2002 - updating expense")
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
			).rejects.toThrow(
				new InternalServerErrorException("Internal server error")
			)

			expect(loggerSpy).toBeCalledWith(
				`Error - DB connection lost - updating expense ${fakeExpense.id}`
			)
		})

		it("should throw 500 and log the raw error when a non-Error is thrown", async () => {
			const payload = createUpdatePayload(new Date(), false, false)

			vi.spyOn(paymentTypeService, "getById").mockResolvedValue({
				...fakePaymentType,
				hasStatement: false
			})
			vi.spyOn(databaseService.expense, "update").mockRejectedValue("raw error")

			await expect(
				expenseService.updateExpense(
					fakeExpense.id,
					payload,
					fakeExpense.ownerId
				)
			).rejects.toThrow(
				new InternalServerErrorException("Internal server error")
			)

			expect(loggerSpy).toBeCalledWith(
				`Error - raw error - updating expense ${fakeExpense.id}`
			)
		})

		it("should throw 500 on an unrecognized prisma error code", async () => {
			const prismaError = createPrismaError("P9999")
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
			).rejects.toThrow(
				new InternalServerErrorException("Internal server error")
			)

			expect(loggerSpy).toBeCalledWith("Error - P9999 - updating expense")
		})

		it("should fall back to the raw error when a prisma error has no code", async () => {
			const prismaError = createPrismaError("")
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
			).rejects.toThrow(
				new InternalServerErrorException("Internal server error")
			)

			expect(loggerSpy).toBeCalledWith(
				`Error - ${prismaError} - updating expense`
			)
		})
	})

	describe("sumPersonalExpensesBy", () => {
		const startDate = new Date(2024, 0, 1)
		const endDate = new Date(2024, 0, 31)

		const expectedWhereClause = {
			deletedAt: null,
			OR: [
				{
					AND: [
						{ ownerId: "user_id" },
						{ OR: [{ personal: true }, { split: true }] }
					]
				},
				{ AND: [{ NOT: { ownerId: "user_id" } }, { personal: false }] }
			],
			dueDate: { lte: endDate, gte: startDate }
		}

		it("should group personal expenses by category and label them by description", async () => {
			vi.spyOn(databaseService.expense, "groupBy").mockResolvedValue([
				{ categoryId: "cat-1", _sum: { amount: 100 } },
				{ categoryId: "cat-2", _sum: { amount: 300 } }
			] as never)
			vi.spyOn(databaseService.category, "findMany").mockResolvedValue([
				{ id: "cat-1", description: "Groceries" },
				{ id: "cat-2", description: "Rent" }
			] as never)

			const result = await expenseService.sumPersonalExpensesBy(
				"user_id",
				"category",
				startDate,
				endDate
			)

			expect(databaseService.expense.groupBy).toHaveBeenCalledWith({
				by: ["categoryId"],
				where: expectedWhereClause,
				_sum: { amount: true }
			})
			expect(databaseService.category.findMany).toHaveBeenCalledWith({
				where: { id: { in: ["cat-1", "cat-2"] } },
				select: { id: true, description: true }
			})
			expect(result).toEqual([
				{ id: "cat-2", description: "Rent", total: 300 },
				{ id: "cat-1", description: "Groceries", total: 100 }
			])
		})

		it("should group by payment type and label them by description", async () => {
			vi.spyOn(databaseService.expense, "groupBy").mockResolvedValue([
				{ paymentTypeId: "pt-1", _sum: { amount: 50 } }
			] as never)
			vi.spyOn(databaseService.paymentType, "findMany").mockResolvedValue([
				{ id: "pt-1", description: "Credit Card" }
			] as never)

			const result = await expenseService.sumPersonalExpensesBy(
				"user_id",
				"payment_type",
				startDate,
				endDate
			)

			expect(databaseService.expense.groupBy).toHaveBeenCalledWith(
				expect.objectContaining({ by: ["paymentTypeId"] })
			)
			expect(result).toEqual([
				{ id: "pt-1", description: "Credit Card", total: 50 }
			])
		})

		it("should group by bank, label by name and keep expenses with no bank as a null row", async () => {
			vi.spyOn(databaseService.expense, "groupBy").mockResolvedValue([
				{ bankId: null, _sum: { amount: 70 } },
				{ bankId: "bank-1", _sum: { amount: 200 } }
			] as never)
			vi.spyOn(databaseService.bank, "findMany").mockResolvedValue([
				{ id: "bank-1", name: "Chase" }
			] as never)

			const result = await expenseService.sumPersonalExpensesBy(
				"user_id",
				"bank",
				startDate,
				endDate
			)

			expect(databaseService.bank.findMany).toHaveBeenCalledWith({
				where: { id: { in: ["bank-1"] } },
				select: { id: true, name: true }
			})
			expect(result).toEqual([
				{ id: "bank-1", name: "Chase", total: 200 },
				{ id: null, name: null, total: 70 }
			])
		})

		it("should group by store and default a null sum to zero", async () => {
			vi.spyOn(databaseService.expense, "groupBy").mockResolvedValue([
				{ storeId: "store-1", _sum: { amount: null } }
			] as never)
			vi.spyOn(databaseService.store, "findMany").mockResolvedValue([
				{ id: "store-1", name: "Costco" }
			] as never)

			const result = await expenseService.sumPersonalExpensesBy(
				"user_id",
				"store",
				startDate,
				endDate
			)

			expect(databaseService.expense.groupBy).toHaveBeenCalledWith(
				expect.objectContaining({ by: ["storeId"] })
			)
			expect(result).toEqual([{ id: "store-1", name: "Costco", total: 0 }])
		})

		it("should return an empty list when there are no expenses", async () => {
			const result = await expenseService.sumPersonalExpensesBy(
				"user_id",
				"category",
				startDate,
				endDate
			)

			expect(result).toEqual([])
		})
	})
})
