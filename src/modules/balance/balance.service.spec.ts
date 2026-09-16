import { InternalServerErrorException, Logger } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { endOfMonth } from "date-fns"
import { ExpenseService } from "../expense/expense.service"
import { createBank } from "../test-utils/bank.factory"
import { createCategory } from "../test-utils/category.factory"
import { createExpense } from "../test-utils/expense.factory"
import { createPaymentType } from "../test-utils/payment-type.factory"
import { BalanceService } from "./balance.service"

describe("BalanceService", () => {
	let balanceService: BalanceService
	let expenseService: ExpenseService
	let loggerSpy: ReturnType<typeof vi.spyOn>

	const fakeExpenses = [
		createExpense({ ownerId: "owner-id" }),
		createExpense({ ownerId: "owner-id-2" })
	]

	const fakePersonalExpenses = {
		expenses: [{ amount: 10 }]
	}
	const fakeSharedExpenses = {
		expenses: [
			{ ownerId: "owner-id", amount: 5 },
			{ ownerId: "owner-id-2", amount: 10 }
		]
	}

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				BalanceService,
				{
					provide: ExpenseService,
					useValue: {
						getPersonalExpenses: vi
							.fn()
							.mockResolvedValue(fakePersonalExpenses),
						getSharedExpenses: vi.fn().mockResolvedValue(fakeSharedExpenses),
						getExpensesByDateRange: vi.fn().mockResolvedValue(fakeExpenses)
					}
				}
			]
		}).compile()

		balanceService = module.get<BalanceService>(BalanceService)
		expenseService = module.get<ExpenseService>(ExpenseService)
		loggerSpy = vi.spyOn(Logger.prototype, "error")
	})

	describe("getBalance", () => {
		it("should throw error if error getting personal expenses", async () => {
			const payload = {
				ownerId: "owner-id",
				startDate: new Date(),
				endDate: new Date()
			}

			vi.spyOn(expenseService, "getPersonalExpenses").mockRejectedValue(
				new Error("Expenses error")
			)

			await expect(balanceService.getBalance(payload)).rejects.toThrow(
				InternalServerErrorException
			)
			expect(expenseService.getPersonalExpenses).toHaveBeenCalledWith(payload)
			expect(loggerSpy).toHaveBeenCalledWith(
				"Error - Expenses error - getting balance"
			)
		})

		it("should log the raw error when it has no message", async () => {
			const payload = {
				ownerId: "owner-id",
				startDate: new Date(),
				endDate: new Date()
			}

			vi.spyOn(expenseService, "getPersonalExpenses").mockRejectedValue(
				"raw error"
			)

			await expect(balanceService.getBalance(payload)).rejects.toThrow(
				InternalServerErrorException
			)
			expect(loggerSpy).toHaveBeenCalledWith(
				"Error - raw error - getting balance"
			)
		})

		it("should get balance for same owner", async () => {
			const payload = {
				ownerId: "owner-id",
				startDate: new Date(),
				endDate: new Date()
			}

			const result = await balanceService.getBalance(payload)

			expect(result).toEqual({
				personalBalance: 10,
				sharedBalance: {
					paying: 5,
					payed: 10,
					total: -5
				}
			})

			expect(expenseService.getPersonalExpenses).toHaveBeenCalledWith(payload)
			expect(expenseService.getSharedExpenses).toHaveBeenCalledWith(payload)
		})

		it("should get balance for different owner", async () => {
			const payload = {
				ownerId: "owner-id-2",
				startDate: new Date(),
				endDate: new Date()
			}

			const result = await balanceService.getBalance(payload)

			expect(result).toEqual({
				personalBalance: 10,
				sharedBalance: {
					paying: 10,
					payed: 5,
					total: 5
				}
			})

			expect(expenseService.getPersonalExpenses).toHaveBeenCalledWith(payload)
			expect(expenseService.getSharedExpenses).toHaveBeenCalledWith(payload)
		})
	})

	describe("getConsolidatedBalance", () => {
		it("should throw error if error getting expenses", async () => {
			const payload = {
				year: 2022,
				month: 1,
				userId: "owner-id"
			}

			vi.spyOn(expenseService, "getExpensesByDateRange").mockRejectedValue(
				new Error("Expenses error")
			)

			await expect(
				balanceService.getConsolidatedBalance(payload)
			).rejects.toThrow(InternalServerErrorException)

			expect(expenseService.getExpensesByDateRange).toHaveBeenCalledWith(
				false,
				new Date(2022, 1, 1),
				endOfMonth(new Date(2022, 1, 1))
			)
			expect(loggerSpy).toHaveBeenCalledWith(
				"Error - Expenses error - getting consolidated balance"
			)
		})

		it("should log the raw error when it has no message", async () => {
			const payload = {
				year: 2022,
				month: 1,
				userId: "owner-id"
			}

			vi.spyOn(expenseService, "getExpensesByDateRange").mockRejectedValue(
				"raw error"
			)

			await expect(
				balanceService.getConsolidatedBalance(payload)
			).rejects.toThrow(InternalServerErrorException)

			expect(loggerSpy).toHaveBeenCalledWith(
				"Error - raw error - getting consolidated balance"
			)
		})

		it("should default requesterBalance to 0 when the requester has no expenses", async () => {
			vi.spyOn(expenseService, "getExpensesByDateRange").mockResolvedValue([
				fakeExpenses[1]
			])

			const payload = {
				year: 2022,
				month: 1,
				userId: "unknown-user"
			}

			const result = await balanceService.getConsolidatedBalance(payload)

			expect(result.requester).toBeUndefined()
			expect(result.requesterBalance).toBe(0)
			expect(result.partner?.ownerId).toBe("owner-id-2")
			expect(result.partnerBalance).toBe(fakeExpenses[1].amount)
		})

		it("should default partnerBalance to 0 when there is no partner", async () => {
			vi.spyOn(expenseService, "getExpensesByDateRange").mockResolvedValue([
				fakeExpenses[0]
			])

			const payload = {
				year: 2022,
				month: 1,
				userId: "owner-id"
			}

			const result = await balanceService.getConsolidatedBalance(payload)

			expect(result.partner).toBeUndefined()
			expect(result.partnerBalance).toBe(0)
			expect(result.requesterBalance).toBe(fakeExpenses[0].amount)
		})

		it("should merge multiple expenses belonging to the same owner", async () => {
			const category = createCategory({ description: "Food" })
			const otherCategory = createCategory({ description: "Transport" })
			const paymentType = createPaymentType({ description: "Card" })
			const otherPaymentType = createPaymentType({ description: "Cash" })
			const bank = createBank({ name: "Bank A" })
			const otherBank = createBank({ name: "Bank B" })

			const sameOwnerExpenses = [
				createExpense({
					ownerId: "owner-id",
					amount: 10,
					category,
					categoryId: category.id,
					paymentType,
					paymentTypeId: paymentType.id,
					bank,
					bankId: bank.id
				}),
				createExpense({
					ownerId: "owner-id",
					amount: 5,
					category,
					categoryId: category.id,
					paymentType,
					paymentTypeId: paymentType.id,
					bank,
					bankId: bank.id
				}),
				createExpense({
					ownerId: "owner-id",
					amount: 3,
					category,
					categoryId: category.id,
					paymentType,
					paymentTypeId: paymentType.id,
					bank: otherBank,
					bankId: otherBank.id
				}),
				createExpense({
					ownerId: "owner-id",
					amount: 7,
					category: otherCategory,
					categoryId: otherCategory.id,
					paymentType: otherPaymentType,
					paymentTypeId: otherPaymentType.id,
					bank: otherBank,
					bankId: otherBank.id
				})
			]

			vi.spyOn(expenseService, "getExpensesByDateRange").mockResolvedValue(
				sameOwnerExpenses
			)

			const payload = {
				year: 2022,
				month: 1,
				userId: "owner-id"
			}

			const result = await balanceService.getConsolidatedBalance(payload)

			expect(result.requesterBalance).toBe(25)
			expect(result.requester).toEqual({
				ownerId: "owner-id",
				ownerName: sameOwnerExpenses[0].user.name,
				payments: [
					{
						id: paymentType.id,
						description: "Card",
						banks: [
							{ id: bank.id, name: "Bank A", total: 15 },
							{ id: otherBank.id, name: "Bank B", total: 3 }
						],
						total: 18
					},
					{
						id: otherPaymentType.id,
						description: "Cash",
						banks: [{ id: otherBank.id, name: "Bank B", total: 7 }],
						total: 7
					}
				],
				categories: [
					{ id: category.id, description: "Food", total: 18 },
					{ id: otherCategory.id, description: "Transport", total: 7 }
				],
				total: 25
			})
		})

		it("should get consolidated balance", async () => {
			const payload = {
				year: 2022,
				month: 1,
				userId: "owner-id"
			}

			const result = await balanceService.getConsolidatedBalance(payload)

			expect(result).toEqual({
				userId: "owner-id",
				requesterBalance: fakeExpenses[0].amount,
				partnerBalance: fakeExpenses[1].amount,
				requester: {
					ownerId: "owner-id",
					ownerName: fakeExpenses[0].user.name,
					payments: [
						{
							id: fakeExpenses[0].paymentTypeId,
							description: fakeExpenses[0].paymentType.description,
							banks: [
								{
									id: fakeExpenses[0].bank.id,
									name: fakeExpenses[0].bank.name,
									total: fakeExpenses[0].amount
								}
							],
							total: fakeExpenses[0].amount
						}
					],
					categories: [
						{
							id: fakeExpenses[0].categoryId,
							description: fakeExpenses[0].category.description,
							total: fakeExpenses[0].amount
						}
					],
					total: fakeExpenses[0].amount
				},
				partner: {
					ownerId: "owner-id-2",
					ownerName: fakeExpenses[1].user.name,
					payments: [
						{
							id: fakeExpenses[1].paymentTypeId,
							description: fakeExpenses[1].paymentType.description,
							banks: [
								{
									id: fakeExpenses[1].bank.id,
									name: fakeExpenses[1].bank.name,
									total: fakeExpenses[1].amount
								}
							],
							total: fakeExpenses[1].amount
						}
					],
					categories: [
						{
							id: fakeExpenses[1].categoryId,
							description: fakeExpenses[1].category.description,
							total: fakeExpenses[1].amount
						}
					],
					total: fakeExpenses[1].amount
				}
			})
		})
	})
})
