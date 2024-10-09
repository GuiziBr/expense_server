import { User } from './user.domain'

export interface AuthenticatedUser {
  user: User
  token: string
}
