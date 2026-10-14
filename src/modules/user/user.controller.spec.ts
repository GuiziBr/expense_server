import { Test } from "@nestjs/testing"
import { CurrentUserInterceptor } from "@/infra/auth/current-user.interceptor.js"
import { UserController } from "./user.controller.js"
import { UserService } from "./user.service.js"

describe("UserController", () => {
	let userService: UserService
	let userController: UserController

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: {
						updateUserAvatar: vi.fn()
					}
				}
			]
		})
			.overrideInterceptor(CurrentUserInterceptor)
			.useValue({})
			.compile()

		userService = module.get<UserService>(UserService)
		userController = module.get<UserController>(UserController)
	})

	describe("updateAvatar", () => {
		it("should return void", async () => {
			await userController.updateAvatar("user_id", { avatar: "avatar" })
			expect(userService.updateUserAvatar).toBeCalledWith("user_id", "avatar")
		})
	})
})
