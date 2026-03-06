import { Module } from "@nestjs/common"
import { InfraModule } from "@/infra/infra.module"
import { StatementPeriodService } from "./statement-period.service"

@Module({
	imports: [InfraModule],
	providers: [StatementPeriodService],
	exports: [StatementPeriodService]
})
export class StatementPeriodModule {}
