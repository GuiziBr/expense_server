import { Expense } from '@/domains/expense.domain';
import { z } from 'zod';
export declare const createExpenseSchema: z.ZodObject<{
    description: z.ZodString;
    date: z.ZodDate;
    amount: z.ZodNumber;
    category_id: z.ZodString;
    payment_type_id: z.ZodString;
    bank_id: z.ZodOptional<z.ZodString>;
    store_id: z.ZodOptional<z.ZodString>;
    personal: z.ZodBoolean;
    split: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    split?: boolean;
    description?: string;
    amount?: number;
    date?: Date;
    category_id?: string;
    payment_type_id?: string;
    bank_id?: string;
    store_id?: string;
    personal?: boolean;
}, {
    split?: boolean;
    description?: string;
    amount?: number;
    date?: Date;
    category_id?: string;
    payment_type_id?: string;
    bank_id?: string;
    store_id?: string;
    personal?: boolean;
}>;
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
export declare const queryExpenseSchema: z.ZodObject<{
    startDate: z.ZodOptional<z.ZodDate>;
    endDate: z.ZodOptional<z.ZodDefault<z.ZodDate>>;
    offset: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    limit: z.ZodOptional<z.ZodNumber>;
    orderBy: z.ZodOptional<z.ZodEnum<["description", "amount", "date", "dueDate", "category", "payment_type", "bank", "store"]>>;
    orderType: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>>;
    filterBy: z.ZodOptional<z.ZodEnum<["category", "payment_type", "bank", "store"]>>;
    filterValue: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    orderBy?: "bank" | "category" | "store" | "description" | "amount" | "date" | "dueDate" | "payment_type";
    offset?: number;
    limit?: number;
    startDate?: Date;
    endDate?: Date;
    orderType?: "asc" | "desc";
    filterBy?: "bank" | "category" | "store" | "payment_type";
    filterValue?: string;
}, {
    orderBy?: "bank" | "category" | "store" | "description" | "amount" | "date" | "dueDate" | "payment_type";
    offset?: number;
    limit?: number;
    startDate?: Date;
    endDate?: Date;
    orderType?: "asc" | "desc";
    filterBy?: "bank" | "category" | "store" | "payment_type";
    filterValue?: string;
}>;
export type QueryExpenseDTO = z.infer<typeof queryExpenseSchema>;
export type OrderByType = 'asc' | 'desc';
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
