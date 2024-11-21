"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrismaError = void 0;
const library_1 = require("@prisma/client/runtime/library");
const createPrismaError = (code = 'error', meta) => {
    return new library_1.PrismaClientKnownRequestError('prisma error', {
        code,
        meta,
        clientVersion: '1.0.0'
    });
};
exports.createPrismaError = createPrismaError;
//# sourceMappingURL=errors.factory.js.map