import { z } from 'zod';
export interface BankDTO {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date | null;
}
export declare const listBanksSchema: z.ZodObject<{
    offset: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    offset?: number;
    limit?: number;
}, {
    offset?: number;
    limit?: number;
}>;
export type ListBankDTO = z.infer<typeof listBanksSchema>;
export declare const bankByIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
}, {
    id?: string;
}>;
export type BankByIdDTO = z.infer<typeof bankByIdSchema>;
export declare const createBankSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
export type CreateBankDTO = z.infer<typeof createBankSchema>;
