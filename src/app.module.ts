import { Module } from "@nestjs/common"
import { InfraModule } from "./infra/infra.module.js"
import { AuthModule } from "./modules/auth/auth.module.js"
import { BalanceModule } from "./modules/balance/balance.module.js"
import { BankModule } from "./modules/bank/bank.module.js"
import { CategoryModule } from "./modules/category/category.module.js"
import { ExpenseModule } from "./modules/expense/expense.module.js"
import { HealthModule } from "./modules/health/health.module.js"
import { PaymentTypeModule } from "./modules/payment-type/payment-type.module.js"
import { StatementPeriodModule } from "./modules/statement-period/statement-period.module.js"
import { StoreModule } from "./modules/store/store.module.js"
import { UserModule } from "./modules/user/user.module.js"

@Module({
	imports: [
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
