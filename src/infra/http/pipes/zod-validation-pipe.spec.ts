import { BadRequestException } from "@nestjs/common"
import { z } from "zod"
import { ZodValidationPipe } from "./zod-validation-pipe"

describe("ZodValidationPipe", () => {
	const schema = z.object({
		name: z.string()
	})

	it("should return the parsed value when validation succeeds", () => {
		const pipe = new ZodValidationPipe(schema)

		const result = pipe.transform({ name: "valid-name" })

		expect(result).toEqual({ name: "valid-name" })
	})

	it("should throw a BadRequestException with a formatted message on ZodError", () => {
		const pipe = new ZodValidationPipe(schema)

		expect(() => pipe.transform({ name: 1 })).toThrow(BadRequestException)

		try {
			pipe.transform({ name: 1 })
		} catch (error) {
			expect(error.message).toContain("name")
		}
	})

	it("should throw a generic BadRequestException on a non-Zod error", () => {
		const throwingSchema = {
			parse: () => {
				throw new Error("unexpected error")
			}
		} as unknown as z.ZodSchema

		const pipe = new ZodValidationPipe(throwingSchema)

		expect(() => pipe.transform({ name: "value" })).toThrow(
			new BadRequestException("Validation Failed")
		)
	})
})
