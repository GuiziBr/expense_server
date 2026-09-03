import { Module } from "@nestjs/common"
import { InfraModule } from "../../infra/infra.module.js"
import { PaymentTypeModule } from "../payment-type/payment-type.module.js"
import { PaymentTypeService } from "../payment-type/payment-type.service.js"
import { StatementPeriodModule } from "../statement-period/statement-period.module.js"
import { StatementPeriodService } from "../statement-period/statement-period.service.js"
import { ExpenseController } from "./expense.controller.js"
import { ExpenseService } from "./expense.service.js"

@Module({
	imports: [InfraModule, PaymentTypeModule, StatementPeriodModule],
	controllers: [ExpenseController],
	providers: [ExpenseService, PaymentTypeService, StatementPeriodService],
	exports: [ExpenseService]
})
export class ExpenseModule {}
