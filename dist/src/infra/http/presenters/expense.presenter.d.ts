import { Expense } from '@/domains/expense.domain';
import { ExpenseDTO } from '@/modules/expense/expense.dto';
export declare class ExpensePresenter {
    static toExpenseDTO(expense: Expense): ExpenseDTO;
    static toPersonalExpenseDTO(expense: Expense): ExpenseDTO;
    static toSharedExpenseDTO(expense: Expense, ownerId: string): ExpenseDTO & {
        type: 'income' | 'outcome';
    };
}
