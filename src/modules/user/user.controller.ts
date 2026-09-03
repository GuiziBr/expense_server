import {
	Body,
	Controller,
	Patch,
	Request,
	UseInterceptors,
	UsePipes
} from "@nestjs/common"
import { CurrentUserInterceptor } from "../../infra/auth/current-user.interceptor.js"
import { ZodValidationPipe } from "../../infra/http/pipes/zod-validation-pipe.js"
import { updateUserAvatarSchema } from "./user.dto.js"
import { UserService } from "./user.service.js"

@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseInterceptors(CurrentUserInterceptor)
	@UsePipes(new ZodValidationPipe(updateUserAvatarSchema))
	@Patch("avatar")
	async updateAvatar(@Request() { userId }, @Body() { avatar }): Promise<void> {
		return this.userService.updateUserAvatar(userId, avatar)
	}
}
