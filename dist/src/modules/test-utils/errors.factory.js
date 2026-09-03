import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
export const createPrismaError = (code = "error", meta) => {
    return new PrismaClientKnownRequestError("prisma error", {
        code,
        meta,
        clientVersion: "1.0.0"
    });
};
//# sourceMappingURL=errors.factory.js.map