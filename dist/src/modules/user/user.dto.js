import { z } from "zod";
export const updateUserAvatarSchema = z.object({
    avatar: z.url()
});
//# sourceMappingURL=user.dto.js.map