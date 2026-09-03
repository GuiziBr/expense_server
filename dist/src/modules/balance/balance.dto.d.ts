import { z } from "zod";
import { ConsolidatedReport, ReportCategory, ReportPayment } from "../../domains/balance.domain.js";
import { GetExpensesRequest } from "../expense/expense.dto.js";
export declare const queryBalanceSchema: z.ZodObject<{
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    filterBy: z.ZodOptional<z.ZodEnum<{
        bank: "bank";
        category: "category";
        paymentType: "paymentType";
        store: "store";
    }>>;
    filterValue: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
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
    month: z.ZodCoercedNumber<unknown>;
    year: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
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
