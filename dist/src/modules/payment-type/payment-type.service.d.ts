import { PaymentType } from "../../domains/payment-type.domain.js";
import { DatabaseService } from "../../infra/database/database.service.js";
export declare class PaymentTypeService {
    private readonly databaseService;
    private readonly logger;
    constructor(databaseService: DatabaseService);
    getAll(offset?: number, limit?: number): Promise<PaymentType[]>;
    getById(id: string): Promise<PaymentType | null>;
    create(description: string, hasStatement: boolean): Promise<PaymentType>;
    update(id: string, description: string, hasStatement?: boolean): Promise<PaymentType>;
    delete(id: string): Promise<void>;
    private reactivatePaymentType;
}
