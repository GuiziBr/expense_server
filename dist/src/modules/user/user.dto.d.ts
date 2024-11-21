import { z } from 'zod';
export declare const updateUserAvatarSchema: z.ZodObject<{
    avatar: z.ZodString;
}, "strip", z.ZodTypeAny, {
    avatar?: string;
}, {
    avatar?: string;
}>;
export type UpdateUserAvatarDTO = z.infer<typeof updateUserAvatarSchema>;
