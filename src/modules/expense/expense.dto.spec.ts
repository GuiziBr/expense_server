import { queryExpenseSchema } from "./expense.dto"

describe("queryExpenseSchema", () => {
	it("should pass when filterBy and filterValue are not provided", () => {
		const result = queryExpenseSchema.safeParse({})

		expect(result.success).toBe(true)
	})

	it("should pass when filterValue is a valid UUID", () => {
		const result = queryExpenseSchema.safeParse({
			filterBy: "category",
			filterValue: "1e6b1b6a-6b1a-4b1a-8b1a-6b1a6b1a6b1a"
		})

		expect(result.success).toBe(true)
	})

	it("should fail when filterValue is not a valid UUID", () => {
		const result = queryExpenseSchema.safeParse({
			filterBy: "category",
			filterValue: "not-a-uuid"
		})

		expect(result.success).toBe(false)

		if (!result.success) {
			expect(result.error.issues[0].message).toBe("must be a valid UUID")
			expect(result.error.issues[0].path).toEqual(["filterValue"])
		}
	})
})
