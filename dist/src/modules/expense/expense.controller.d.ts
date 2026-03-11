import { Response as Res } from "express";
import { CreateExpenseDTO, ExpenseByIdDTO, ExpenseDTO, QueryExpenseDTO, UpdateExpenseDTO } from "./expense.dto";
import { ExpenseService } from "./expense.service";
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    createExpense({ userId }: {
        userId: any;
    }, body: CreateExpenseDTO): Promise<ExpenseDTO>;
    getPersonalExpenses({ userId }: {
        userId: any;
    }, query: QueryExpenseDTO, res: Res): Promise<ExpenseDTO[]>;
    updateExpense({ userId }: {
        userId: any;
    }, params: ExpenseByIdDTO, body: UpdateExpenseDTO): Promise<ExpenseDTO>;
    deleteExpense({ userId }: {
        userId: any;
    }, params: ExpenseByIdDTO): Promise<void>;
    getSharedExpenses({ userId }: {
        userId: any;
    }, query: QueryExpenseDTO, res: Res): Promise<(ExpenseDTO & {
        type: "income" | "outcome";
    })[]>;
}
