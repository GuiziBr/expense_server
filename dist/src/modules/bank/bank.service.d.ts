import { Bank } from "../../domains/bank.domain.js";
import { DatabaseService } from "../../infra/database/database.service.js";
import type { ListBankDTO } from "./bank.dto.js";
type ListBankOrderBy = ListBankDTO["orderBy"];
export declare class BankService {
    private readonly databaseService;
    private readonly logger;
    constructor(databaseService: DatabaseService);
    getAll(offset?: number, limit?: number, orderBy?: ListBankOrderBy, orderType?: "asc" | "desc"): Promise<{
        banks: Bank[];
        totalCount: number;
    }>;
    getById(id: string): Promise<Bank | null>;
    create(name: string): Promise<Bank>;
    update(id: string, name: string): Promise<Bank>;
    delete(id: string): Promise<void>;
}
export {};
