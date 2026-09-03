import { z } from "zod";
export declare const updateUserAvatarSchema: z.ZodObject<{
    avatar: z.ZodString;
}, z.core.$strip>;
export type UpdateUserAvatarDTO = z.infer<typeof updateUserAvatarSchema>;
