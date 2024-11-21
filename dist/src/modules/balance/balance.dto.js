"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryConsolidatedBalanceSchema = exports.queryBalanceSchema = void 0;
const zod_1 = require("zod");
exports.queryBalanceSchema = zod_1.z.object({
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date(),
    filterBy: zod_1.z.enum(['category', 'paymentType', 'bank', 'store']).optional(),
    filterValue: zod_1.z.string().optional().optional()
});
exports.queryConsolidatedBalanceSchema = zod_1.z.object({
    month: zod_1.z.coerce.number().min(1).max(12),
    year: zod_1.z.coerce.number().min(1900)
});
//# sourceMappingURL=balance.dto.js.map