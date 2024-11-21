import { ConsolidatedBalanceDTO, GetConsolidatedBalanceResponse } from '@/modules/balance/balance.dto';
export declare class BalancePresenter {
    static toConsolidatedBalanceDTO(consolidatedReport: GetConsolidatedBalanceResponse): ConsolidatedBalanceDTO;
}
