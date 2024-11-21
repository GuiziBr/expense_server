"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryExpenseSchema = exports.createExpenseSchema = void 0;
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
    split: zod_1.z.boolean()
});
exports.queryExpenseSchema = zod_1.z.object({
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().default(() => new Date()).optional(),
    offset: zod_1.z.coerce.number().min(0).default(0).optional(),
    limit: zod_1.z.coerce.number().min(1).optional(),
    orderBy: zod_1.z.enum([
        'description',
        'amount',
        'date',
        'dueDate',
        'category',
        'paymentType',
        'bank',
        'store'
    ]).optional(),
    orderType: zod_1.z.enum(['asc', 'desc']).optional().default('asc').optional(),
    filterBy: zod_1.z.enum(['category', 'paymentType', 'bank', 'store']).optional(),
    filterValue: zod_1.z.string().optional()
});
//# sourceMappingURL=expense.dto.js.map