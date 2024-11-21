import { z } from 'zod';
export interface CategoryDTO {
    id: string;
    description: string;
    created_at: Date;
    updated_at: Date | null;
}
export declare const listCategoriesSchema: z.ZodObject<{
    offset: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    offset?: number;
    limit?: number;
}, {
    offset?: number;
    limit?: number;
}>;
export type ListCategoryDTO = z.infer<typeof listCategoriesSchema>;
export declare const categoryByIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
}, {
    id?: string;
}>;
export type CategoryByIdDTO = z.infer<typeof categoryByIdSchema>;
export declare const createCategorySchema: z.ZodObject<{
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description?: string;
}, {
    description?: string;
}>;
export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
