import { ConsolidatedBalanceDTO, GetConsolidatedBalanceResponse } from "../../../modules/balance/balance.dto.js";
export declare class BalancePresenter {
    static toConsolidatedBalanceDTO(consolidatedReport: GetConsolidatedBalanceResponse): ConsolidatedBalanceDTO;
}
