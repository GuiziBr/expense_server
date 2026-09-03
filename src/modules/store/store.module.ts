import { Module } from "@nestjs/common"
import { InfraModule } from "../../infra/infra.module.js"
import { StoreController } from "./store.controller.js"
import { StoreService } from "./store.service.js"

@Module({
	imports: [InfraModule],
	controllers: [StoreController],
	providers: [StoreService]
})
export class StoreModule {}
