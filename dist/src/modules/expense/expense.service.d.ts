import { Expense } from "../../domains/expense.domain.js";
import { DatabaseService } from "../../infra/database/database.service.js";
import { PaymentTypeService } from "../payment-type/payment-type.service.js";
import { StatementPeriodService } from "../statement-period/statement-period.service.js";
import { CreateExpenseDTO, GetExpensesRequest, GetExpensesResponse, UpdateExpenseDTO } from "./expense.dto.js";
export declare class ExpenseService {
    private readonly databaseService;
    private readonly paymentTypeService;
    private readonly statementPeriodService;
    private readonly logger;
    constructor(databaseService: DatabaseService, paymentTypeService: PaymentTypeService, statementPeriodService: StatementPeriodService);
    private calculateNetAmount;
    private getOrderByClause;
    private calculateDueDate;
    createExpense(data: CreateExpenseDTO, userId: string): Promise<Expense>;
    updateExpense(id: string, data: UpdateExpenseDTO, userId: string): Promise<Expense>;
    deleteExpense(id: string, userId: string): Promise<void>;
    getPersonalExpenses({ ownerId, startDate, endDate, offset, limit, orderBy, orderType, filterBy, filterValue }: GetExpensesRequest): Promise<GetExpensesResponse>;
    getSharedExpenses({ startDate, endDate, offset, limit, orderBy, orderType, filterBy, filterValue }: GetExpensesRequest): Promise<GetExpensesResponse>;
    getExpensesByDateRange(personal: boolean, startDate: Date, endDate: Date): Promise<Expense[]>;
}
