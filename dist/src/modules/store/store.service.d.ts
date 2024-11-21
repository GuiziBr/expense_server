import { Store } from '@/domains/store.domain';
import { DatabaseService } from '@/infra/database/database.service';
export declare class StoreService {
    private readonly databaseService;
    private readonly logger;
    constructor(databaseService: DatabaseService);
    getAll(offset?: number, limit?: number): Promise<Store[]>;
    getById(id: string): Promise<Store | null>;
    create(name: string): Promise<Store>;
    update(id: string, name: string): Promise<Store>;
    delete(id: string): Promise<void>;
    private reactivateStore;
}
