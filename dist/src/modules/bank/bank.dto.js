import { z } from "zod";
export const listBanksSchema = z.object({
    offset: z.coerce.number().int().min(0).default(0),
    limit: z.coerce.number().int().min(1).max(20).default(20)
});
export const bankByIdSchema = z.object({
    id: z.string().uuid()
});
export const createBankSchema = z.object({
    name: z.string().trim().min(1)
});
//# sourceMappingURL=bank.dto.js.map