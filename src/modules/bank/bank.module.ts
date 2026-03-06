import { Module } from "@nestjs/common"
import { InfraModule } from "@/infra/infra.module"
import { BankController } from "./bank.controller"
import { BankService } from "./bank.service"

@Module({
	imports: [InfraModule],
	controllers: [BankController],
	providers: [BankService]
})
export class BankModule {}
