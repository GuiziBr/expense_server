import { z } from "zod";
export interface BankDTO {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date | null;
}
export declare const listBanksSchema: z.ZodObject<{
    offset: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type ListBankDTO = z.infer<typeof listBanksSchema>;
export declare const bankByIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export type BankByIdDTO = z.infer<typeof bankByIdSchema>;
export declare const createBankSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export type CreateBankDTO = z.infer<typeof createBankSchema>;
