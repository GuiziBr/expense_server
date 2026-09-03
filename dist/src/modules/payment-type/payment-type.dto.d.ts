import { z } from "zod";
export interface PaymentTypeDTO {
    id: string;
    description: string;
    has_statement: boolean;
    created_at: Date;
    updated_at: Date | null;
}
export declare const listPaymentTypesSchema: z.ZodObject<{
    offset: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type ListPaymentTypesDTO = z.infer<typeof listPaymentTypesSchema>;
export declare const paymentTypeByIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export type PaymentTypeByIdDTO = z.infer<typeof paymentTypeByIdSchema>;
export declare const createPaymentTypeSchema: z.ZodObject<{
    description: z.ZodString;
    hasStatement: z.ZodBoolean;
}, z.core.$strip>;
export type CreatePaymentTypeDTO = z.infer<typeof createPaymentTypeSchema>;
