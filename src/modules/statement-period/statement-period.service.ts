import { StatementPeriod } from '@/domains/statement-period.domain'
import { DatabaseService } from '@/infra/database/database.service'
import { Injectable, Logger } from '@nestjs/common'
import AppError from '../utils/appError'

@Injectable()
export class StatementPeriodService {
  private readonly logger = new Logger(StatementPeriodService.name)

  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async findByUserAndBank(
    userId: string,
    bankId: string,
    paymentTypeId: string
  ): Promise<StatementPeriod | null> {
    try {
      const statementPeriod = await this.databaseService.statementPeriod.findFirst({
        where: {
          userId,
          bankId,
          paymentTypeId
        }

      })
      return statementPeriod
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - getting statement period`)
      throw new AppError('Internal server error', 500)
    }
  }
}
