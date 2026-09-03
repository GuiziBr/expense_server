import { z } from "zod";
export interface CategoryDTO {
    id: string;
    description: string;
    created_at: Date;
    updated_at: Date | null;
}
export declare const listCategoriesSchema: z.ZodObject<{
    offset: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type ListCategoryDTO = z.infer<typeof listCategoriesSchema>;
export declare const categoryByIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export type CategoryByIdDTO = z.infer<typeof categoryByIdSchema>;
export declare const createCategorySchema: z.ZodObject<{
    description: z.ZodString;
}, z.core.$strip>;
export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
