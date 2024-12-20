import { InfraModule } from '@/infra/infra.module'
import { Module } from '@nestjs/common'
import { StatementPeriodService } from './statement-period.service'

@Module({
  imports: [InfraModule],
  providers: [StatementPeriodService],
  exports: [StatementPeriodService]
})

export class StatementPeriodModule {}
