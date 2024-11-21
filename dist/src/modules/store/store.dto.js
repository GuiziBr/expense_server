"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreSchema = exports.storeByIdSchema = exports.listStoresSchema = void 0;
const zod_1 = require("zod");
exports.listStoresSchema = zod_1.z.object({
    offset: zod_1.z.coerce.number().min(0).default(0),
    limit: zod_1.z.coerce.number().min(1).max(20).default(20)
});
exports.storeByIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
exports.createStoreSchema = zod_1.z.object({
    name: zod_1.z.string()
});
//# sourceMappingURL=store.dto.js.map