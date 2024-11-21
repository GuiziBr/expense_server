"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserAvatarSchema = void 0;
const zod_1 = require("zod");
exports.updateUserAvatarSchema = zod_1.z.object({
    avatar: zod_1.z.string().url()
});
//# sourceMappingURL=user.dto.js.map