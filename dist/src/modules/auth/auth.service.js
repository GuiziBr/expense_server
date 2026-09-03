var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserService } from "../user/user.service.js";
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signIn(email, pass) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const passwordMatched = await compare(pass, user.password);
        if (!passwordMatched) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email };
        return {
            user,
            token: await this.jwtService.signAsync(payload)
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserService,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map