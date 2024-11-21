import { DatabaseService } from '@/infra/database/database.service';
import { PaymentTypeService } from '../payment-type/payment-type.service';
import { StatementPeriodService } from '../statement-period/statement-period.service';
import { CreateExpenseDTO, GetExpensesRequest, GetExpensesResponse } from './expense.dto';
import { Expense } from '@/domains/expense.domain';
export declare class ExpenseService {
    private readonly databaseService;
    private readonly paymentTypeService;
    private readonly statementPeriodService;
    private readonly logger;
    constructor(databaseService: DatabaseService, paymentTypeService: PaymentTypeService, statementPeriodService: StatementPeriodService);
    private calculateNetAmount;
    private getOrderByClause;
    private calculateDueDate;
    createExpense(data: CreateExpenseDTO, userId: string): Promise<any>;
    getPersonalExpenses({ ownerId, startDate, endDate, offset, limit, orderBy, orderType, filterBy, filterValue }: GetExpensesRequest): Promise<GetExpensesResponse>;
    getSharedExpenses({ startDate, endDate, offset, limit, orderBy, orderType, filterBy, filterValue }: GetExpensesRequest): Promise<GetExpensesResponse>;
    getExpensesByDateRange(personal: boolean, startDate: Date, endDate: Date): Promise<Expense[]>;
}
