import { User } from '@/domains/user.domain';
import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export type LoginDTO = z.infer<typeof loginSchema>;
export interface AuthenticatedUserDTO {
    user: Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
    token: string;
}
