import { ExpenseService } from '../expense/expense.service';
import { GetBalanceRequest, GetBalanceResponse, GetConsolidateBalanceRequest, GetConsolidatedBalanceResponse } from './balance.dto';
export declare class BalanceService {
    private readonly expensesService;
    private readonly logger;
    constructor(expensesService: ExpenseService);
    private getBank;
    private getPayment;
    private getCategory;
    getBalance(data: GetBalanceRequest): Promise<GetBalanceResponse>;
    getConsolidatedBalance({ year, month, userId }: GetConsolidateBalanceRequest): Promise<GetConsolidatedBalanceResponse>;
}
