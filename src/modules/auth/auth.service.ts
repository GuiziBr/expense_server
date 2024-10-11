import { AuthenticatedUser } from '@/domains/authentication.domain'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<AuthenticatedUser> {
    const user = await this.userService.findUserByEmail(email)

    if(!user) {
      throw new UnauthorizedException()
    }

    const passwordMatched = await compare(pass, user.password)

    if(!passwordMatched) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, email: user.email }

    return {
      user,
      token: await this.jwtService.signAsync(payload)
    }
  }
}
