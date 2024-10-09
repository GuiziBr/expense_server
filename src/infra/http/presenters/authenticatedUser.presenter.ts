import { AuthenticatedUser } from '@/domains/authentication.domain'

export class AuthenticatedUserPresenter {
  static toHttp({ user, token }: AuthenticatedUser) {
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        created_at: user.createdAt
      },
      token
    }
  }
}
