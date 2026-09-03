import { Module } from "@nestjs/common"
import { InfraModule } from "../../infra/infra.module.js"
import { CategoryController } from "./category.controller.js"
import { CategoryService } from "./category.service.js"

@Module({
	imports: [InfraModule],
	controllers: [CategoryController],
	providers: [CategoryService]
})
export class CategoryModule {}
