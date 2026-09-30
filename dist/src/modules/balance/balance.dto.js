import { z } from "zod";
import { filterBySchema } from "../expense/expense.dto.js";
export const queryBalanceSchema = z
    .object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    filterBy: filterBySchema.optional(),
    filterValue: z.string().optional()
})
    .superRefine((data, ctx) => {
    if (data.filterBy &&
        data.filterValue &&
        !z.uuid().safeParse(data.filterValue).success) {
        ctx.addIssue({
            code: "custom",
            path: ["filterValue"],
            message: "must be a valid UUID"
        });
    }
});
export const queryConsolidatedBalanceSchema = z.object({
    month: z.coerce.number().min(1).max(12),
    year: z.coerce.number().min(1900)
});
export const queryBalanceBreakdownSchema = z.object({
    filterBy: filterBySchema
});
//# sourceMappingURL=balance.dto.js.map