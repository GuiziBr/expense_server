import { z } from 'zod';
import { GetExpensesRequest } from '../expense/expense.dto';
import { ConsolidatedReport, ReportCategory, ReportPayment } from '@/domains/balance.domain';
export declare const queryBalanceSchema: z.ZodObject<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    filterBy: z.ZodOptional<z.ZodEnum<["category", "paymentType", "bank", "store"]>>;
    filterValue: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    startDate?: Date;
    endDate?: Date;
    filterBy?: "bank" | "category" | "paymentType" | "store";
    filterValue?: string;
}, {
    startDate?: Date;
    endDate?: Date;
    filterBy?: "bank" | "category" | "paymentType" | "store";
    filterValue?: string;
}>;
export type QueryBalanceDTO = z.infer<typeof queryBalanceSchema>;
export interface GetBalanceRequest extends GetExpensesRequest {
}
export interface GetBalanceResponse {
    personalBalance: number;
    sharedBalance: {
        paying: number;
        payed: number;
        total: number;
    };
}
export declare const queryConsolidatedBalanceSchema: z.ZodObject<{
    month: z.ZodNumber;
    year: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    month?: number;
    year?: number;
}, {
    month?: number;
    year?: number;
}>;
export type QueryConsolidatedBalanceDTO = z.infer<typeof queryConsolidatedBalanceSchema>;
export interface GetConsolidateBalanceRequest {
    userId: string;
    month: number;
    year: number;
}
export interface GetConsolidatedBalanceResponse {
    userId: string;
    requesterBalance: number;
    partnerBalance: number;
    requester: ConsolidatedReport;
    partner: ConsolidatedReport;
}
interface BalanceOwner {
    id?: string;
    name?: string;
    payments?: Array<ReportPayment>;
    categories?: Array<ReportCategory>;
    total: number;
}
export interface ConsolidatedBalanceDTO {
    requester: BalanceOwner;
    partner?: BalanceOwner;
    balance: number;
}
export {};
