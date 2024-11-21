import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    PORT: z.ZodDefault<z.ZodNumber>;
    JWT_SECRET: z.ZodString;
}, "strip", z.ZodTypeAny, {
    DATABASE_URL?: string;
    PORT?: number;
    JWT_SECRET?: string;
}, {
    DATABASE_URL?: string;
    PORT?: number;
    JWT_SECRET?: string;
}>;
export type Env = z.infer<typeof envSchema>;
