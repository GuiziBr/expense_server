import { z } from 'zod';
export interface StoreDTO {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date | null;
}
export declare const listStoresSchema: z.ZodObject<{
    offset: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    offset?: number;
    limit?: number;
}, {
    offset?: number;
    limit?: number;
}>;
export type ListStoreDTO = z.infer<typeof listStoresSchema>;
export declare const storeByIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
}, {
    id?: string;
}>;
export type StoreByIdDTO = z.infer<typeof storeByIdSchema>;
export declare const createStoreSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
export type CreateStoreDTO = z.infer<typeof createStoreSchema>;
