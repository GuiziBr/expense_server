import {
	Body,
	Controller,
	Patch,
	UseInterceptors,
	UsePipes
} from "@nestjs/common"
import { CurrentUser } from "../../infra/auth/current-user.decorator.js"
import { CurrentUserInterceptor } from "../../infra/auth/current-user.interceptor.js"
import { ZodValidationPipe } from "../../infra/http/pipes/zod-validation-pipe.js"
import { UpdateUserAvatarDTO, updateUserAvatarSchema } from "./user.dto.js"
import { UserService } from "./user.service.js"

@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	/**
	 * Updates the avatar of the currently authenticated user.
	 * Requires an authenticated request (populated by {@link CurrentUserInterceptor}).
	 * The request body is validated against `updateUserAvatarSchema`.
	 * @param userId - ID of the currently authenticated user, injected from the request.
	 * @param body - The request body, containing the new `avatar` value.
	 * @returns A promise that resolves once the avatar has been updated.
	 */
	@UseInterceptors(CurrentUserInterceptor)
	@UsePipes(new ZodValidationPipe(updateUserAvatarSchema))
	@Patch("avatar")
	async updateAvatar(
		@CurrentUser() userId: string,
		@Body() { avatar }: UpdateUserAvatarDTO
	): Promise<void> {
		return this.userService.updateUserAvatar(userId, avatar)
	}
}
