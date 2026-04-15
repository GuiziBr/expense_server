"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpenseSchema = exports.queryExpenseSchema = exports.expenseByIdSchema = exports.createExpenseSchema = void 0;
const zod_1 = require("zod");
exports.createExpenseSchema = zod_1.z.object({
    description: zod_1.z.string(),
    date: zod_1.z.coerce.date(),
    amount: zod_1.z.number(),
    category_id: zod_1.z.string(),
    payment_type_id: zod_1.z.string(),
    bank_id: zod_1.z.string().optional(),
    store_id: zod_1.z.string().optional(),
    personal: zod_1.z.boolean(),
    split: zod_1.z.boolean(),
    current_month: zod_1.z.boolean().optional()
});
exports.expenseByIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
exports.queryExpenseSchema = zod_1.z.object({
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().default(() => new Date()),
    offset: zod_1.z.coerce.number().min(0).default(0).optional(),
    limit: zod_1.z.coerce.number().min(1).optional(),
    orderBy: zod_1.z
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
    orderType: zod_1.z.enum(["asc", "desc"]).default("asc"),
    filterBy: zod_1.z.enum(["category", "payment_type", "bank", "store"]).optional(),
    filterValue: zod_1.z.string().optional()
});
exports.updateExpenseSchema = exports.createExpenseSchema;
//# sourceMappingURL=expense.dto.js.map