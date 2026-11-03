import { DatabaseService } from "../../infra/database/database.service.js";
import { ExpenseService } from "../expense/expense.service.js";
import { GetBalanceBreakdownRequest, GetBalanceBreakdownResponse, GetBalanceRequest, GetBalanceResponse, GetConsolidateBalanceRequest, GetConsolidatedBalanceResponse, GetEnvelopeBalanceRequest, GetEnvelopeBalanceResponse } from "./balance.dto.js";
export declare class BalanceService {
    private readonly expensesService;
    private readonly databaseService;
    private readonly logger;
    constructor(expensesService: ExpenseService, databaseService: DatabaseService);
    private getBank;
    private getPayment;
    private getCategory;
    getBalance(data: GetBalanceRequest): Promise<GetBalanceResponse>;
    getBalanceBreakdown({ year, month, userId, filterBy }: GetBalanceBreakdownRequest): Promise<GetBalanceBreakdownResponse>;
    getEnvelopeBalance({ year, month, userId }: GetEnvelopeBalanceRequest): Promise<GetEnvelopeBalanceResponse>;
    getConsolidatedBalance({ year, month, userId }: GetConsolidateBalanceRequest): Promise<GetConsolidatedBalanceResponse>;
}
