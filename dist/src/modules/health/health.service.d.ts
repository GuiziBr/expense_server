import { DatabaseService } from "../../infra/database/database.service.js";
export declare class HealthService {
    private readonly databaseService;
    private readonly logger;
    constructor(databaseService: DatabaseService);
    isHealthy(): Promise<boolean>;
}
