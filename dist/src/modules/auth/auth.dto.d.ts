import { z } from "zod";
import { User } from "../../domains/user.domain.js";
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginDTO = z.infer<typeof loginSchema>;
export interface AuthenticatedUserDTO {
    user: Omit<User, "password" | "createdAt" | "updatedAt">;
    token: string;
}
