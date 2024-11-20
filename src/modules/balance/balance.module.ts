import { InfraModule } from '@/infra/infra.module'
import { Module } from '@nestjs/common'
import { ExpenseModule } from '../expense/expense.module'
import { ExpenseService } from '../expense/expense.service'
import { PaymentTypeModule } from '../payment-type/payment-type.module'
import { StatementPeriodModule } from '../statement-period/statement-period.module'
import { BalanceController } from './balance.controller'
import { BalanceService } from './balance.service'

@Module({
  imports: [InfraModule, ExpenseModule, PaymentTypeModule, StatementPeriodModule],
  controllers: [BalanceController],
  providers: [ExpenseService, BalanceService]
})

export class BalanceModule { }
