import { DatabaseService } from '@/infra/database/database.service'
import { ExecutionContext, Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { CurrentUserInterceptor } from './current-user.interceptor'

describe('CurrentUserInterceptor', () => {
  let interceptor: CurrentUserInterceptor
  let databaseService: DatabaseService
  let loggerSpy: ReturnType<typeof vi.spyOn>
  const next = { handle: vi.fn() }

  beforeEach(async () => {
    const module =
      await Test.createTestingModule({
        providers: [
          CurrentUserInterceptor,
          {
            provide: DatabaseService,
            useValue: {
              user: { findUnique: vi.fn().mockResolvedValue({ id: 'user_id' }) },
              userAssignment: {
                findMany: vi
                  .fn()
                  .mockResolvedValue([{ organizationId: 'org_id' }])
              }
            }
          }
        ]
      }).compile()

    interceptor = module.get<CurrentUserInterceptor>(CurrentUserInterceptor)
    databaseService = module.get<DatabaseService>(DatabaseService)
    loggerSpy = vi.spyOn(Logger.prototype, 'error')
  })

  it('should be defined', () => {
    expect(interceptor).toBeDefined()
  })

  describe('Intercept', () => {
    let mockContext: ExecutionContext

    beforeEach(() => {
      mockContext = {
        switchToHttp: vi
          .fn()
          .mockReturnValue({
            getRequest: vi
              .fn()
              .mockReturnValue({ user: { sub: 'user_id' }, url: '/test' })
          })
      } as any
    })

    it('should throw error if user not found', async () => {
      vi.spyOn(databaseService.user, 'findUnique').mockResolvedValue(null)

      await expect(interceptor.intercept(mockContext, next))
        .rejects
        .toThrowError('User not found')

      expect(loggerSpy).toBeCalledWith('Error - User not found - user_id')

      expect(next.handle).not.toHaveBeenCalled()

    })
  })

})
