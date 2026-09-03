import { Module } from "@nestjs/common"
import { InfraModule } from "../../infra/infra.module.js"
import { ExpenseModule } from "../expense/expense.module.js"
import { PaymentTypeModule } from "../payment-type/payment-type.module.js"
import { StatementPeriodModule } from "../statement-period/statement-period.module.js"
import { BalanceController } from "./balance.controller.js"
import { BalanceService } from "./balance.service.js"

@Module({
	imports: [
		InfraModule,
		ExpenseModule,
		PaymentTypeModule,
		StatementPeriodModule
	],
	controllers: [BalanceController],
	providers: [BalanceService]
})
export class BalanceModule {}
