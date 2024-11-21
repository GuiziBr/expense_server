import { z } from 'zod';
export interface PaymentTypeDTO {
    id: string;
    description: string;
    has_statement: boolean;
    created_at: Date;
    updated_at: Date | null;
}
export declare const listPaymentTypesSchema: z.ZodObject<{
    offset: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    offset?: number;
    limit?: number;
}, {
    offset?: number;
    limit?: number;
}>;
export type ListPaymentTypesDTO = z.infer<typeof listPaymentTypesSchema>;
export declare const paymentTypeByIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
}, {
    id?: string;
}>;
export type PaymentTypeByIdDTO = z.infer<typeof paymentTypeByIdSchema>;
export declare const createPaymentTypeSchema: z.ZodObject<{
    description: z.ZodString;
    hasStatement: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    description?: string;
    hasStatement?: boolean;
}, {
    description?: string;
    hasStatement?: boolean;
}>;
export type CreatePaymentTypeDTO = z.infer<typeof createPaymentTypeSchema>;
