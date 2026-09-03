import { z } from "zod";
export const updateUserAvatarSchema = z.object({
    avatar: z.string().url()
});
//# sourceMappingURL=user.dto.js.map