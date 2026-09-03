import { Module } from "@nestjs/common"
import { InfraModule } from "../../infra/infra.module.js"
import { BankController } from "./bank.controller.js"
import { BankService } from "./bank.service.js"

@Module({
	imports: [InfraModule],
	controllers: [BankController],
	providers: [BankService]
})
export class BankModule {}
