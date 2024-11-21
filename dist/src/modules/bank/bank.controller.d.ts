import { BankByIdDTO, BankDTO, CreateBankDTO, ListBankDTO } from './bank.dto';
import { BankService } from './bank.service';
export declare class BankController {
    private readonly bankService;
    constructor(bankService: BankService);
    listBanks(query?: ListBankDTO): Promise<BankDTO[]>;
    getBankById(params: BankByIdDTO): Promise<BankByIdDTO>;
    createBank(body: CreateBankDTO): Promise<BankDTO>;
    updateBank(params: BankByIdDTO, body: CreateBankDTO): Promise<BankDTO>;
    deleteBank(params: BankByIdDTO): Promise<void>;
}
