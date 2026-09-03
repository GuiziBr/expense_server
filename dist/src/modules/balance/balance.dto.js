import { z } from "zod";
export const queryBalanceSchema = z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    filterBy: z.enum(["category", "paymentType", "bank", "store"]).optional(),
    filterValue: z.string().optional().optional()
});
export const queryConsolidatedBalanceSchema = z.object({
    month: z.coerce.number().min(1).max(12),
    year: z.coerce.number().min(1900)
});
//# sourceMappingURL=balance.dto.js.map