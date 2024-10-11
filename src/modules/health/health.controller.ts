import { Controller, Get } from '@nestjs/common'
import { Public } from '../auth/public.decorator'
import { HealthService } from './health.service'

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService){}

  @Public()
  @Get()
  index(): Promise<boolean> {
    return this.healthService.isHealthy()
  }
}
