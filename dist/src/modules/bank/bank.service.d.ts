import { Bank } from '@/domains/bank.domain';
import { DatabaseService } from '@/infra/database/database.service';
export declare class BankService {
    private readonly databaseService;
    private readonly logger;
    constructor(databaseService: DatabaseService);
    getAll(offset?: number, limit?: number): Promise<Bank[]>;
    getById(id: string): Promise<Bank | null>;
    create(name: string): Promise<Bank>;
    update(id: string, name: string): Promise<Bank>;
    delete(id: string): Promise<void>;
    private reactivateBank;
}
