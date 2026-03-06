import { Module } from "@nestjs/common"
import { InfraModule } from "@/infra/infra.module"
import { StoreController } from "./store.controller"
import { StoreService } from "./store.service"

@Module({
	imports: [InfraModule],
	controllers: [StoreController],
	providers: [StoreService]
})
export class StoreModule {}
