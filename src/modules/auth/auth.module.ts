import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { JwtModule } from "@nestjs/jwt"
import { env } from "../../infra/env.js"
import { UserModule } from "../user/user.module.js"
import { AuthController } from "./auth.controller.js"
import { AuthGuard } from "./auth.guard.js"
import { AuthService } from "./auth.service.js"

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: env.JWT_SECRET,
			signOptions: { expiresIn: "1d" }
		})
	],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
