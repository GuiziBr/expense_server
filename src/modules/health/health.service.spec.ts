import { DatabaseService } from '@/infra/database/database.service'
import { Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { HealthService } from './health.service'

describe('HealthService', () => {
  let healthService: HealthService
  let databaseService: DatabaseService
  let loggerSpy: ReturnType<typeof vi.spyOn>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: DatabaseService,
          useValue: {
            $queryRaw: vi.fn()
          }
        }
      ]
    }).compile()

    healthService = module.get<HealthService>(HealthService)
    databaseService = module.get<DatabaseService>(DatabaseService)
    loggerSpy = vi.spyOn(Logger.prototype, 'error')

  })
  it('should throw ServiceUnavailableException', async () => {
    vi.spyOn(databaseService, '$queryRaw').mockRejectedValue(new Error())

    await expect(healthService.isHealthy()).rejects.toThrow('Server unavailable')

    expect(loggerSpy).toBeCalledWith('Error - Error - checking health')
  })
})
