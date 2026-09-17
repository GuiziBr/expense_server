import { Prisma } from "../../generated/prisma/client.js"

export const createPrismaError = (
	code = "error",
	meta?: Record<string, unknown>
) => {
	return new Prisma.PrismaClientKnownRequestError("prisma error", {
		code,
		meta,
		clientVersion: "1.0.0"
	})
}
