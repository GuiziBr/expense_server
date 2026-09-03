import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { JwtModule } from "@nestjs/jwt"
import { env } from "@/infra/env"
import { UserModule } from "../user/user.module"
import { AuthController } from "./auth.controller"
import { AuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"

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
