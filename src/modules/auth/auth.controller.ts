import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDTO, loginSchema } from './auth.dto'
import { Public } from './public.decorator'

@Controller('sessions')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @UsePipes(new ZodValidationPipe(loginSchema))
  signIn(
    @Body() body: LoginDTO
  ) {
    return this.authService.signIn(body.email, body.password)
  }
}
