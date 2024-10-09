import AppError from '@/modules/utils/appError'
import { CallHandler, ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'


@Injectable()
export class CurrentUserInterceptor {
  private readonly logger = new Logger(CurrentUserInterceptor.name)

  constructor(private readonly databaseService: DatabaseService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const { sub } = request.user

    const currentUser = await this.databaseService.user.findUnique({
      where: { id: sub }
    })

    if(!currentUser) {
      this.logger.error(`Error - User not found - ${sub}`)
      throw new AppError('User not found', 404)
    }

    request.userId = currentUser.id

    return next.handle()
  }
}
