import { Module } from "@nestjs/common"
import { InfraModule } from "../../infra/infra.module.js"
import { UserController } from "./user.controller.js"
import { UserService } from "./user.service.js"

@Module({
	imports: [InfraModule],
	providers: [UserService],
	exports: [UserService],
	controllers: [UserController]
})
export class UserModule {}
