import { z } from "zod";
export const createExpenseSchema = z.object({
    description: z.string(),
    date: z.coerce.date(),
    amount: z.number(),
    category_id: z.string(),
    payment_type_id: z.string(),
    bank_id: z.string().optional(),
    store_id: z.string().optional(),
    personal: z.boolean(),
    split: z.boolean(),
    current_month: z.boolean().optional()
});
export const expenseByIdSchema = z.object({
    id: z.string().uuid()
});
export const queryExpenseSchema = z.object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().default(() => new Date()),
    offset: z.coerce.number().min(0).default(0).optional(),
    limit: z.coerce.number().min(1).optional(),
    orderBy: z
        .enum([
        "description",
        "amount",
        "date",
        "dueDate",
        "category",
        "payment_type",
        "bank",
        "store"
    ])
        .optional(),
    orderType: z.enum(["asc", "desc"]).default("asc"),
    filterBy: z.enum(["category", "payment_type", "bank", "store"]).optional(),
    filterValue: z.string().optional()
});
export const updateExpenseSchema = createExpenseSchema;
//# sourceMappingURL=expense.dto.js.map