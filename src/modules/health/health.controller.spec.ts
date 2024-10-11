import { Test } from '@nestjs/testing'
import { HealthController } from './health.controller'
import { HealthService } from './health.service'

describe('HealthController', () => {
  let healthService: HealthService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            isHealthy: vi.fn().mockResolvedValue(true)
          }
        }
      ]
    }).compile()

    healthService = module.get<HealthService>(HealthService)
  })

  describe('isHealthy', () => {
    it('should return true', async () => {
      const result = await healthService.isHealthy()
      expect(result).toBe(true)
    })
  })
})
