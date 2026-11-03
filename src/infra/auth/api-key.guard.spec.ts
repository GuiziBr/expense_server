import { ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { ApiKeyGuard } from "./api-key.guard.js"

describe("ApiKeyGuard", () => {
	let guard: ApiKeyGuard
	const apiKey = "a".repeat(32)

	const contextWith = (headers: Record<string, unknown>) =>
		({
			switchToHttp: () => ({ getRequest: () => ({ headers }) })
		}) as unknown as ExecutionContext

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				ApiKeyGuard,
				{ provide: ConfigService, useValue: { get: vi.fn(() => apiKey) } }
			]
		}).compile()

		guard = module.get(ApiKeyGuard)
	})

	it("should allow a request with the right api key", () => {
		expect(guard.canActivate(contextWith({ "x-api-key": apiKey }))).toBe(true)
	})

	it("should reject a request without an api key", () => {
		expect(() => guard.canActivate(contextWith({}))).toThrow(
			UnauthorizedException
		)
	})

	it("should reject a wrong api key of the same length", () => {
		expect(() =>
			guard.canActivate(contextWith({ "x-api-key": "b".repeat(32) }))
		).toThrow(UnauthorizedException)
	})

	it("should reject a wrong api key of a different length", () => {
		expect(() =>
			guard.canActivate(contextWith({ "x-api-key": "short" }))
		).toThrow(UnauthorizedException)
	})

	it("should reject a repeated header (array value)", () => {
		expect(() =>
			guard.canActivate(contextWith({ "x-api-key": [apiKey, apiKey] }))
		).toThrow(UnauthorizedException)
	})
})
