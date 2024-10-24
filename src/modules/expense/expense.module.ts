import { InfraModule } from '@/infra/infra.module'
import { Module } from '@nestjs/common'
import { PaymentTypeModule } from '../payment-type/payment-type.module'
import { PaymentTypeService } from '../payment-type/payment-type.service'
import { ExpenseController } from './expense.controller'
import { ExpenseService } from './expense.service'
import { StatementPeriodModule } from '../statement-period/statement-period.module'
import { StatementPeriodService } from '../statement-period/statement-period.service'

@Module({
  imports: [InfraModule, PaymentTypeModule, StatementPeriodModule],
  controllers: [ExpenseController],
  providers: [ExpenseService, PaymentTypeService, StatementPeriodService]
})

export class ExpenseModule {}
