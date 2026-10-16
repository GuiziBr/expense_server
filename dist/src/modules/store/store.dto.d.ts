import { z } from "zod";
export interface StoreDTO {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date | null;
}
export declare const listStoresSchema: z.ZodObject<{
    offset: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    orderBy: z.ZodDefault<z.ZodEnum<{
        name: "name";
        created_at: "created_at";
    }>>;
    orderType: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export type ListStoreDTO = z.infer<typeof listStoresSchema>;
export declare const storeByIdSchema: z.ZodObject<{
    id: z.ZodUUID;
}, z.core.$strip>;
export type StoreByIdDTO = z.infer<typeof storeByIdSchema>;
export declare const createStoreSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export type CreateStoreDTO = z.infer<typeof createStoreSchema>;
