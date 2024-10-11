import { CurrentUserInterceptor } from '@/infra/auth/current-user.interceptor'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  Body,
  Controller,
  Patch,
  Request,
  UseInterceptors,
  UsePipes
} from '@nestjs/common'
import { updateUserAvatarSchema } from './user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(CurrentUserInterceptor)
  @UsePipes(new ZodValidationPipe(updateUserAvatarSchema))
  @Patch('avatar')
  async updateAvatar(
    @Request() { userId },
    @Body() { avatar }
  ): Promise<void> {
    return this.userService.updateUserAvatar(userId, avatar)
  }
}
