import { Category } from '@/domains/category.domain';
import { DatabaseService } from '@/infra/database/database.service';
export declare class CategoryService {
    private readonly databaseService;
    private readonly logger;
    constructor(databaseService: DatabaseService);
    getAll(offset?: number, limit?: number): Promise<Category[]>;
    getById(id: string): Promise<Category | null>;
    create(description: string): Promise<Category>;
    update(id: string, description: string): Promise<Category>;
    delete(id: string): Promise<void>;
    private reactivateCategory;
}
