import { User } from '@/domains/user.domain'
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export type LoginDTO = z.infer<typeof loginSchema>

export interface AuthenticatedUserDTO {
  user: Omit<User, 'password' | 'createdAt' | 'updatedAt'>
  token: string
}
