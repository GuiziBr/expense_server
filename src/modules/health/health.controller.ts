import { Controller, Get } from '@nestjs/common'

@Controller()
export class HealthController {
  @Get()
  index(): boolean {
    return true
  }
}
