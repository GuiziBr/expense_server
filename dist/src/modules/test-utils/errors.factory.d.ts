import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
export declare const createPrismaError: (code?: string, meta?: Record<string, unknown>) => PrismaClientKnownRequestError;
