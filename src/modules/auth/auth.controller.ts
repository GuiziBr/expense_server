import { Body, Controller, Post, UsePipes } from "@nestjs/common"
import { ZodValidationPipe } from "../../infra/http/pipes/zod-validation-pipe.js"
import { AuthenticatedUserPresenter } from "../../infra/http/presenters/authenticated-user.presenter.js"
import { AuthenticatedUserDTO, LoginDTO, loginSchema } from "./auth.dto.js"
import { AuthService } from "./auth.service.js"
import { Public } from "./public.decorator.js"

@Controller("sessions")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Authenticates a user with email and password and returns a signed JWT session.
	 * Marked with `@Public()`, so this endpoint bypasses the global authentication guard.
	 * The request body is validated against `loginSchema` via `ZodValidationPipe` before
	 * this handler runs, and will short-circuit with a validation error for malformed input.
	 * @param body - The login payload, containing `email` and `password`.
	 * @returns The authenticated user data together with the issued access token, shaped by `AuthenticatedUserPresenter`.
	 * @throws UnauthorizedException if the email is not found or the password does not match.
	 */
	@Public()
	@Post()
	@UsePipes(new ZodValidationPipe(loginSchema))
	async signIn(@Body() body: LoginDTO): Promise<AuthenticatedUserDTO> {
		const authenticatedUser = await this.authService.signIn(
			body.email,
			body.password
		)
		return AuthenticatedUserPresenter.toHttp(authenticatedUser)
	}
}
