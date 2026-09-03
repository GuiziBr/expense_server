import { Bank } from "../../../domains/bank.domain.js";
import { BankDTO } from "../../../modules/bank/bank.dto.js";
export declare class BankPresenter {
    static toHttp(bank: Bank): BankDTO;
}
