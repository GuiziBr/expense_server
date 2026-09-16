import { Prisma } from "../../generated/prisma/client.js";
export const createPrismaError = (code = "error", meta) => {
    return new Prisma.PrismaClientKnownRequestError("prisma error", {
        code,
        meta,
        clientVersion: "1.0.0"
    });
};
//# sourceMappingURL=errors.factory.js.map