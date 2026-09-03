import { HealthService } from "./health.service.js";
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    index(): Promise<boolean>;
}
