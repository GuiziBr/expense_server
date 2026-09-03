import { Module } from "@nestjs/common"
import { InfraModule } from "../../infra/infra.module.js"
import { StatementPeriodService } from "./statement-period.service.js"

@Module({
	imports: [InfraModule],
	providers: [StatementPeriodService],
	exports: [StatementPeriodService]
})
export class StatementPeriodModule {}
