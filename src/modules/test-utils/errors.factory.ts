import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export const createPrismaError = (code = 'error', meta?: Record<string, unknown>) => {
  return new PrismaClientKnownRequestError(
    'prisma error',
    {
      code,
      meta,
      clientVersion: '1.0.0'
    },
  )
}
