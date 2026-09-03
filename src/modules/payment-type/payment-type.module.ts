import { Module } from "@nestjs/common"
import { InfraModule } from "../../infra/infra.module.js"
import { PaymentTypeController } from "./payment-type.controller.js"
import { PaymentTypeService } from "./payment-type.service.js"

@Module({
	imports: [InfraModule],
	controllers: [PaymentTypeController],
	providers: [PaymentTypeService],
	exports: [PaymentTypeService]
})
export class PaymentTypeModule {}
