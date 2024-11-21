import { Bank } from '@/domains/bank.domain';
import { BankDTO } from '@/modules/bank/bank.dto';
export declare class BankPresenter {
    static toHttp(bank: Bank): BankDTO;
}
