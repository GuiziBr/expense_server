import { z } from "zod";
import { Expense } from "../../domains/expense.domain.js";
export declare const createExpenseSchema: z.ZodObject<{
    description: z.ZodString;
    date: z.ZodCoercedDate<unknown>;
    amount: z.ZodNumber;
    category_id: z.ZodString;
    payment_type_id: z.ZodString;
    bank_id: z.ZodOptional<z.ZodString>;
    store_id: z.ZodOptional<z.ZodString>;
    personal: z.ZodBoolean;
    split: z.ZodBoolean;
    current_month: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateExpenseDTO = z.infer<typeof createExpenseSchema>;
export interface ExpenseDTO {
    id: string;
    description: string;
    date: Date;
    amount: number;
    category_id: string;
    payment_type_id: string;
    bank_id: string;
    store_id: string;
    category: {
        description: string;
    };
    payment_type: {
        description: string;
    };
    bank?: {
        name: string;
    };
    store?: {
        name: string;
    };
    personal: boolean;
    split: boolean;
    due_date: Date;
    owner_id: string;
    created_at: Date;
}
export declare const expenseByIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export type ExpenseByIdDTO = z.infer<typeof expenseByIdSchema>;
export declare const queryExpenseSchema: z.ZodObject<{
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    endDate: z.ZodDefault<z.ZodCoercedDate<unknown>>;
    offset: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    orderBy: z.ZodOptional<z.ZodEnum<{
        bank: "bank";
        category: "category";
        store: "store";
        date: "date";
        description: "description";
        amount: "amount";
        dueDate: "dueDate";
        payment_type: "payment_type";
    }>>;
    orderType: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
    filterBy: z.ZodOptional<z.ZodEnum<{
        bank: "bank";
        category: "category";
        store: "store";
        payment_type: "payment_type";
    }>>;
    filterValue: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type QueryExpenseDTO = z.infer<typeof queryExpenseSchema>;
export declare const updateExpenseSchema: z.ZodObject<{
    description: z.ZodString;
    date: z.ZodCoercedDate<unknown>;
    amount: z.ZodNumber;
    category_id: z.ZodString;
    payment_type_id: z.ZodString;
    bank_id: z.ZodOptional<z.ZodString>;
    store_id: z.ZodOptional<z.ZodString>;
    personal: z.ZodBoolean;
    split: z.ZodBoolean;
    current_month: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type UpdateExpenseDTO = CreateExpenseDTO;
export type OrderByType = "asc" | "desc";
export interface GetExpensesRequest {
    ownerId: string;
    startDate?: Date;
    endDate: Date;
    offset?: number;
    limit?: number;
    orderBy?: string;
    orderType?: OrderByType;
    filterBy?: string;
    filterValue?: string;
}
export interface GetExpensesResponse {
    expenses: Expense[];
    totalCount: number;
}
