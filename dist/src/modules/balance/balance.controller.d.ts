import { ConsolidatedBalanceDTO, GetBalanceResponse, QueryBalanceDTO, QueryConsolidatedBalanceDTO } from "./balance.dto.js";
import { BalanceService } from "./balance.service.js";
export declare class BalanceController {
    private readonly balanceService;
    constructor(balanceService: BalanceService);
    getBalance({ userId }: {
        userId: any;
    }, query: QueryBalanceDTO): Promise<GetBalanceResponse>;
    getConsolidatedBalance({ userId }: {
        userId: any;
    }, params: QueryConsolidatedBalanceDTO): Promise<ConsolidatedBalanceDTO>;
}
