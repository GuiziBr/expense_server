import { z } from "zod";
export const listCategoriesSchema = z.object({
    offset: z.coerce.number().int().min(0).default(0),
    limit: z.coerce.number().int().min(1).max(20).default(20)
});
export const categoryByIdSchema = z.object({
    id: z.string().uuid()
});
export const createCategorySchema = z.object({
    description: z.string().trim().min(1)
});
//# sourceMappingURL=category.dto.js.map