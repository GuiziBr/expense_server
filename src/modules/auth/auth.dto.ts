import { z } from "zod"
import { User } from "@/domains/user.domain"

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
})

export type LoginDTO = z.infer<typeof loginSchema>

export interface AuthenticatedUserDTO {
	user: Omit<User, "password" | "createdAt" | "updatedAt">
	token: string
}
