import { queryBalanceBreakdownSchema, queryBalanceSchema } from "./balance.dto"

describe("queryBalanceSchema", () => {
	const baseQuery = {
		startDate: "2024-01-01",
		endDate: "2024-01-31"
	}

	it("should pass when filterBy and filterValue are not provided", () => {
		const result = queryBalanceSchema.safeParse(baseQuery)

		expect(result.success).toBe(true)
	})

	it("should pass when filterValue is a valid UUID", () => {
		const result = queryBalanceSchema.safeParse({
			...baseQuery,
			filterBy: "category",
			filterValue: "1e6b1b6a-6b1a-4b1a-8b1a-6b1a6b1a6b1a"
		})

		expect(result.success).toBe(true)
	})

	it("should fail when filterValue is not a valid UUID", () => {
		const result = queryBalanceSchema.safeParse({
			...baseQuery,
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

describe("queryBalanceBreakdownSchema", () => {
	it.each(["category", "payment_type", "bank", "store"])(
		"should pass when filterBy is %s",
		(filterBy) => {
			const result = queryBalanceBreakdownSchema.safeParse({ filterBy })

			expect(result.success).toBe(true)
		}
	)

	it("should fail when filterBy is not provided", () => {
		const result = queryBalanceBreakdownSchema.safeParse({})

		expect(result.success).toBe(false)

		if (!result.success) {
			expect(result.error.issues[0].path).toEqual(["filterBy"])
		}
	})

	it("should fail when filterBy is not a valid filter type", () => {
		const result = queryBalanceBreakdownSchema.safeParse({
			filterBy: "user"
		})

		expect(result.success).toBe(false)

		if (!result.success) {
			expect(result.error.issues[0].path).toEqual(["filterBy"])
		}
	})
})
