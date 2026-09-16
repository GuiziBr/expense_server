import { createExpense } from "../../../modules/test-utils/expense.factory"
import { ExpensePresenter } from "./expense.presenter"

describe("ExpensePresenter", () => {
	describe("toSharedExpenseDTO", () => {
		it("should mark the expense as income when the owner matches the requester", () => {
			const expense = createExpense({ ownerId: "owner-id" })

			const result = ExpensePresenter.toSharedExpenseDTO(expense, "owner-id")

			expect(result.type).toBe("income")
		})

		it("should mark the expense as outcome when the owner does not match the requester", () => {
			const expense = createExpense({ ownerId: "owner-id" })

			const result = ExpensePresenter.toSharedExpenseDTO(
				expense,
				"other-owner-id"
			)

			expect(result.type).toBe("outcome")
		})
	})
})
