import { errorMessage } from "./error-message.js"

describe("errorMessage", () => {
	it("returns the message of an Error", () => {
		expect(errorMessage(new Error("boom"))).toBe("boom")
	})

	it("falls back to the string form when the message is empty", () => {
		expect(errorMessage(new Error())).toBe("Error")
	})

	it("stringifies non-Error values", () => {
		expect(errorMessage("plain")).toBe("plain")
		expect(errorMessage(42)).toBe("42")
		expect(errorMessage(null)).toBe("null")
	})
})
