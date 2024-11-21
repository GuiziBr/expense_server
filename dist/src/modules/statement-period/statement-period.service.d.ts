import { StatementPeriod } from '@/domains/statement-period.domain';
import { DatabaseService } from '@/infra/database/database.service';
export declare class StatementPeriodService {
    private readonly databaseService;
    private readonly logger;
    constructor(databaseService: DatabaseService);
    findByUserAndBank(userId: string, bankId: string, paymentTypeId: string): Promise<StatementPeriod | null>;
}
