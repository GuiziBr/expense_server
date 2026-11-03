import { timingSafeEqual } from "node:crypto"
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Request } from "express"
import { Env } from "../env.js"

/**
 * Guards service-to-service endpoints by requiring the `x-api-key` header to
 * match the `SERVICE_API_KEY` env var. Meant to be used on `@Public()` routes
 * so the JWT guard is skipped.
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
	constructor(private readonly configService: ConfigService<Env, true>) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>()
		const provided = request.headers["x-api-key"]

		if (typeof provided !== "string" || !this.matchesApiKey(provided)) {
			throw new UnauthorizedException()
		}
		return true
	}

	private matchesApiKey(provided: string): boolean {
		const expected = Buffer.from(
			this.configService.get("SERVICE_API_KEY", { infer: true })
		)
		const received = Buffer.from(provided)

		return (
			received.length === expected.length && timingSafeEqual(received, expected)
		)
	}
}
