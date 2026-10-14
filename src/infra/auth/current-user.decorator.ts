import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { AuthenticatedRequest } from "./authenticated-request.js"

/**
 * Injects the authenticated user's ID, as set on the request by
 * {@link CurrentUserInterceptor}.
 */
export const CurrentUser = createParamDecorator(
	(_data: unknown, context: ExecutionContext): string =>
		context.switchToHttp().getRequest<AuthenticatedRequest>().userId
)
