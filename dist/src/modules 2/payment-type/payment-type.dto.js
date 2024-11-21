"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentTypeSchema = exports.paymentTypeByIdSchema = exports.listPaymentTypesSchema = void 0;
const zod_1 = require("zod");
exports.listPaymentTypesSchema = zod_1.z.object({
    offset: zod_1.z.coerce.number().min(0).default(0),
    limit: zod_1.z.coerce.number().min(1).max(20).default(20)
});
exports.paymentTypeByIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
exports.createPaymentTypeSchema = zod_1.z.object({
    description: zod_1.z.string(),
    hasStatement: zod_1.z.boolean()
});
//# sourceMappingURL=payment-type.dto.js.map