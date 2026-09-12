import { z } from "zod";
export declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    JWT_SECRET: z.ZodString;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
