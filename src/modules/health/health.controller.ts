import { Controller, Get } from "@nestjs/common"
import { Public } from "../auth/public.decorator.js"
import { HealthService } from "./health.service.js"

@Controller()
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Public()
	@Get()
	index(): Promise<boolean> {
		return this.healthService.isHealthy()
	}
}
