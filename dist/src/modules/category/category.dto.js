"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = exports.categoryByIdSchema = exports.listCategoriesSchema = void 0;
const zod_1 = require("zod");
exports.listCategoriesSchema = zod_1.z.object({
    offset: zod_1.z.coerce.number().min(0).default(0),
    limit: zod_1.z.coerce.number().min(1).max(20).default(20)
});
exports.categoryByIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
exports.createCategorySchema = zod_1.z.object({
    description: zod_1.z.string()
});
//# sourceMappingURL=category.dto.js.map