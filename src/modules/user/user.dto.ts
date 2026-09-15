import { z } from "zod"

export const updateUserAvatarSchema = z.object({
	avatar: z.url()
})

export type UpdateUserAvatarDTO = z.infer<typeof updateUserAvatarSchema>
