import { User } from '@/domains/user.domain'
import { DatabaseService } from '@/infra/database/database.service'
import { Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { createPrismaError } from '../test-utils/errors.factory'
import { UserService } from './user.service'

describe('UserService', () => {
  let userService: UserService
  let databaseService: DatabaseService
  let loggerSpy: ReturnType<typeof vi.spyOn>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DatabaseService,
          useValue: {
            user: {
              findUnique: vi.fn().mockResolvedValue({ id: 'user_id' } as User),
              update: vi.fn()
            }
          }
        }
      ]
    }).compile()

    userService = module.get<UserService>(UserService)
    databaseService = module.get<DatabaseService>(DatabaseService)
    loggerSpy = vi.spyOn(Logger.prototype, 'error')
  })

  describe('findUserByEmail', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.user, 'findUnique').mockRejectedValue(new Error())

      await expect(userService.findUserByEmail('email'))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.user.findUnique).toBeCalledWith({ where: { email: 'email' }})

      expect(loggerSpy).toBeCalledWith('Error - Error - finding user by email email')
    })

    it('should return user', async () => {
      const user = await userService.findUserByEmail('email')

      expect(user).toEqual({ id: 'user_id' })

      expect(databaseService.user.findUnique).toBeCalledWith({ where: { email: 'email' }})

      expect(loggerSpy).not.toBeCalled()
    })
  })

  describe('updateUserAvatar', () => {
    it('should throw database error', async () => {
      const prismaError = createPrismaError()

      vi.spyOn(databaseService.user, 'update').mockRejectedValue(prismaError)

      await expect(userService.updateUserAvatar('user_id', 'avatar'))
        .rejects
        .toThrow('Error updating user avatar')

      expect(databaseService.user.update).toBeCalledWith({
        where: { id: 'user_id' },
        data: { avatar: 'avatar' }
      })

      expect(loggerSpy)
        .toBeCalledWith('Error - prisma error - updating user avatar user_id')
    })

    it('should throw internal server error', async () => {
      vi.spyOn(databaseService.user, 'update').mockRejectedValue(new Error())

      await expect(userService.updateUserAvatar('user_id', 'avatar'))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.user.update).toBeCalledWith({
        where: { id: 'user_id' },
        data: { avatar: 'avatar' }
      })

      expect(loggerSpy).toBeCalledWith('Error - Error - updating user avatar user_id')
    })
  })


})
