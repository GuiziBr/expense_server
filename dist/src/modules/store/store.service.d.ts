import { Store } from "../../domains/store.domain.js";
import { DatabaseService } from "../../infra/database/database.service.js";
import type { ListStoreDTO } from "./store.dto.js";
type ListStoreOrderBy = ListStoreDTO["orderBy"];
export declare class StoreService {
    private readonly databaseService;
    private readonly logger;
    constructor(databaseService: DatabaseService);
    getAll(offset?: number, limit?: number, orderBy?: ListStoreOrderBy, orderType?: "asc" | "desc"): Promise<{
        stores: Store[];
        totalCount: number;
    }>;
    getById(id: string): Promise<Store | null>;
    create(name: string): Promise<Store>;
    update(id: string, name: string): Promise<Store>;
    delete(id: string): Promise<void>;
    private reactivateStore;
}
export {};
