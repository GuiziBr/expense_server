var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module.js";
import { AuthController } from "./auth.controller.js";
import { AuthGuard } from "./auth.guard.js";
import { AuthService } from "./auth.service.js";
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        imports: [
            UserModule,
            JwtModule.registerAsync({
                useFactory: (configService) => {
                    return {
                        global: true,
                        secret: configService.get("JWT_SECRET", { infer: true }),
                        signOptions: { expiresIn: "1d" }
                    };
                },
                inject: [ConfigService]
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
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map