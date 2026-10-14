import { ConsolidatedBalanceDTO, GetBalanceBreakdownResponse, GetBalanceResponse, QueryBalanceBreakdownDTO, QueryBalanceDTO, QueryConsolidatedBalanceDTO } from "./balance.dto.js";
import { BalanceService } from "./balance.service.js";
export declare class BalanceController {
    private readonly balanceService;
    constructor(balanceService: BalanceService);
    getBalance(userId: string, query: QueryBalanceDTO): Promise<GetBalanceResponse>;
    getConsolidatedBalance(userId: string, params: QueryConsolidatedBalanceDTO): Promise<ConsolidatedBalanceDTO>;
    getBalanceBreakdown(userId: string, params: QueryConsolidatedBalanceDTO, query: QueryBalanceBreakdownDTO): Promise<GetBalanceBreakdownResponse>;
}
