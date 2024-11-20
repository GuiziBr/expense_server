import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env'
import { InfraModule } from './infra/infra.module'
import { AuthModule } from './modules/auth/auth.module'
import { BankModule } from './modules/bank/bank.module'
import { CategoryModule } from './modules/category/category.module'
import { ExpenseModule } from './modules/expense/expense.module'
import { HealthModule } from './modules/health/health.module'
import { PaymentTypeModule } from './modules/payment-type/payment-type.module'
import { StatementPeriodModule } from './modules/statement-period/statement-period.module'
import { StoreModule } from './modules/store/store.module'
import { UserModule } from './modules/user/user.module'
import { BalanceModule } from './modules/balance/balance.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    InfraModule,
    HealthModule,
    AuthModule,
    UserModule,
    PaymentTypeModule,
    BankModule,
    CategoryModule,
    StoreModule,
    StatementPeriodModule,
    ExpenseModule,
    BalanceModule
  ]
})

export class AppModule {}
