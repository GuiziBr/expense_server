import { z } from "zod";
export const listPaymentTypesSchema = z.object({
    offset: z.coerce.number().min(0).default(0),
    limit: z.coerce.number().min(1).max(20).default(20)
});
export const paymentTypeByIdSchema = z.object({
    id: z.string().uuid()
});
export const createPaymentTypeSchema = z.object({
    description: z.string(),
    hasStatement: z.boolean()
});
//# sourceMappingURL=payment-type.dto.js.map