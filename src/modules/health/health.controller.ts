import { Controller, Get } from "@nestjs/common"
import { Public } from "../auth/public.decorator.js"
import { HealthService } from "./health.service.js"

@Controller()
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	/**
	 * Health check endpoint. Marked {@link Public} so it does not require
	 * authentication.
	 * @returns `true` if the service is healthy.
	 * @throws Propagates a `ServiceUnavailableException` from
	 * {@link HealthService.isHealthy} if the underlying dependencies (e.g. the database) are unreachable.
	 */
	@Public()
	@Get()
	index(): Promise<boolean> {
		return this.healthService.isHealthy()
	}
}
