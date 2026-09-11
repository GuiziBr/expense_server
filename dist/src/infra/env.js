import { z } from "zod";
export const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().default(3000),
    JWT_SECRET: z.string().trim().min(32)
});
//# sourceMappingURL=env.js.map