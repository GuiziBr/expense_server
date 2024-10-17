import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  AuthenticatedUserPresenter
} from '@/infra/http/presenters/authenticated-user.presenter'
import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { AuthenticatedUserDTO, LoginDTO, loginSchema } from './auth.dto'
import { AuthService } from './auth.service'
import { Public } from './public.decorator'

@Controller('sessions')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @UsePipes(new ZodValidationPipe(loginSchema))
  async signIn(@Body() body: LoginDTO): Promise<AuthenticatedUserDTO> {
    const authenticatedUser = await this.authService.signIn(body.email, body.password)
    return AuthenticatedUserPresenter.toHttp(authenticatedUser)
  }
}
