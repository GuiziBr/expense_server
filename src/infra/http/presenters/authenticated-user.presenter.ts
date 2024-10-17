import { AuthenticatedUser } from '@/domains/authentication.domain'
import { AuthenticatedUserDTO } from '@/modules/auth/auth.dto'

export class AuthenticatedUserPresenter {
  static toHttp({ user, token }: AuthenticatedUser): AuthenticatedUserDTO {
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token
    }
  }
}
