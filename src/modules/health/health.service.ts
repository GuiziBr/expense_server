import { DatabaseService } from '@/infra/database/database.service'
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common'

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name)
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async isHealthy(): Promise<boolean> {
    try {
      await this.databaseService.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - checking health`)
      throw new ServiceUnavailableException('Server unavailable')
    }
  }
}
