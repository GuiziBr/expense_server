import { Module } from "@nestjs/common"
import { InfraModule } from "@/infra/infra.module"
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service"

@Module({
	imports: [InfraModule],
	controllers: [CategoryController],
	providers: [CategoryService]
})
export class CategoryModule {}
