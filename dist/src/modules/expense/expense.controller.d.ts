import { Response as Res } from "express";
import { CreateExpenseDTO, ExpenseByIdDTO, ExpenseDTO, QueryExpenseDTO, UpdateExpenseDTO } from "./expense.dto.js";
import { ExpenseService } from "./expense.service.js";
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    createExpense(userId: string, body: CreateExpenseDTO): Promise<ExpenseDTO>;
    getPersonalExpenses(userId: string, query: QueryExpenseDTO, res: Res): Promise<ExpenseDTO[]>;
    updateExpense(userId: string, params: ExpenseByIdDTO, body: UpdateExpenseDTO): Promise<ExpenseDTO>;
    deleteExpense(userId: string, params: ExpenseByIdDTO): Promise<void>;
    getSharedExpenses(userId: string, query: QueryExpenseDTO, res: Res): Promise<(ExpenseDTO & {
        type: "income" | "outcome";
    })[]>;
}
