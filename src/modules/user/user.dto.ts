import { z } from 'zod'

export const updateUserAvatarSchema = z.object({
  avatar: z.string().url()
})

export type UpdateUserAvatarDTO = z.infer<typeof updateUserAvatarSchema>
