import { ExecutionContext, Logger, NotFoundException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { DatabaseService } from "@/infra/database/database.service"
import { CurrentUserInterceptor } from "./current-user.interceptor"

describe("CurrentUserInterceptor", () => {
	let interceptor: CurrentUserInterceptor
	let databaseService: DatabaseService
	let loggerSpy: ReturnType<typeof vi.spyOn>
	const next = { handle: vi.fn() }

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				CurrentUserInterceptor,
				{
					provide: DatabaseService,
					useValue: {
						user: { findUnique: vi.fn().mockResolvedValue({ id: "user_id" }) },
						userAssignment: {
							findMany: vi
								.fn()
								.mockResolvedValue([{ organizationId: "org_id" }])
						}
					}
				}
			]
		}).compile()

		interceptor = module.get<CurrentUserInterceptor>(CurrentUserInterceptor)
		databaseService = module.get<DatabaseService>(DatabaseService)
		loggerSpy = vi.spyOn(Logger.prototype, "error")
	})

	it("should be defined", () => {
		expect(interceptor).toBeDefined()
	})

	describe("Intercept", () => {
		let mockContext: ExecutionContext

		beforeEach(() => {
			mockContext = {
				switchToHttp: vi.fn().mockReturnValue({
					getRequest: vi
						.fn()
						.mockReturnValue({ user: { sub: "user_id" }, url: "/test" })
				})
			} as unknown as ExecutionContext
		})

		it("should throw error if user not found", async () => {
			vi.spyOn(databaseService.user, "findUnique").mockResolvedValue(null)

			await expect(interceptor.intercept(mockContext, next)).rejects.toThrow(
				new NotFoundException("User not found")
			)

			expect(loggerSpy).toBeCalledWith("Error - User not found - user_id")

			expect(next.handle).not.toHaveBeenCalled()
		})

		it("should set userId on the request and call next when user is found", async () => {
			const request: { user: { sub: string }; url: string; userId?: string } = {
				user: { sub: "user_id" },
				url: "/test"
			}
			mockContext = {
				switchToHttp: vi.fn().mockReturnValue({
					getRequest: vi.fn().mockReturnValue(request)
				})
			} as unknown as ExecutionContext

			await interceptor.intercept(mockContext, next)

			expect(databaseService.user.findUnique).toBeCalledWith({
				where: { id: "user_id" }
			})

			expect(request.userId).toBe("user_id")

			expect(next.handle).toHaveBeenCalled()

			expect(loggerSpy).not.toBeCalled()
		})
	})
})
