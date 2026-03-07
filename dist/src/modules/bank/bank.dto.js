"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBankSchema = exports.bankByIdSchema = exports.listBanksSchema = void 0;
const zod_1 = require("zod");
exports.listBanksSchema = zod_1.z.object({
    offset: zod_1.z.coerce.number().int().min(0).default(0),
    limit: zod_1.z.coerce.number().int().min(1).max(20).default(20)
});
exports.bankByIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
exports.createBankSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1)
});
//# sourceMappingURL=bank.dto.js.map