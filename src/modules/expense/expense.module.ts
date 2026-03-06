import { Module } from "@nestjs/common"
import { InfraModule } from "@/infra/infra.module"
import { PaymentTypeModule } from "../payment-type/payment-type.module"
import { PaymentTypeService } from "../payment-type/payment-type.service"
import { StatementPeriodModule } from "../statement-period/statement-period.module"
import { StatementPeriodService } from "../statement-period/statement-period.service"
import { ExpenseController } from "./expense.controller"
import { ExpenseService } from "./expense.service"

@Module({
	imports: [InfraModule, PaymentTypeModule, StatementPeriodModule],
	controllers: [ExpenseController],
	providers: [ExpenseService, PaymentTypeService, StatementPeriodService],
	exports: [ExpenseService]
})
export class ExpenseModule {}
