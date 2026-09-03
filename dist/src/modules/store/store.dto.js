import { z } from "zod";
export const listStoresSchema = z.object({
    offset: z.coerce.number().min(0).default(0),
    limit: z.coerce.number().min(1).max(20).default(20)
});
export const storeByIdSchema = z.object({
    id: z.string().uuid()
});
export const createStoreSchema = z.object({
    name: z.string()
});
//# sourceMappingURL=store.dto.js.map