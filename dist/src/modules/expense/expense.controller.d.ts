import { Response as Res } from 'express';
import { CreateExpenseDTO, ExpenseDTO, QueryExpenseDTO } from './expense.dto';
import { ExpenseService } from './expense.service';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    createExpense({ userId }: {
        userId: any;
    }, body: CreateExpenseDTO): Promise<ExpenseDTO>;
    getPersonalExpenses({ userId }: {
        userId: any;
    }, query: QueryExpenseDTO, res: Res): Promise<any>;
    getSharedExpenses({ userId }: {
        userId: any;
    }, query: QueryExpenseDTO, res: Res): Promise<any>;
}
