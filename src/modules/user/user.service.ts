import { User } from '@/domains/user.domain'
import { DatabaseService } from '@/infra/database/database.service'
import { Injectable, Logger } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import AppError from '../utils/appError'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(private readonly databaseService: DatabaseService) {}

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.databaseService.user.findUnique({ where: { email }})
      return user
    } catch (error) {
      this.logger.error(`Error - ${error} - finding user by email ${email}`)
      throw new AppError('Internal server error', 500)
    }
  }

  async updateUserAvatar(userId: string, avatar: string): Promise<void> {
    try {
      await this.databaseService.user.update({ where: { id: userId }, data: { avatar }})
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - updating user avatar ${userId}`)

      if(error instanceof PrismaClientKnownRequestError) {
        throw new AppError('Error updating user avatar', 400)
      }
      throw new AppError('Internal server error', 500)
    }
  }

}
