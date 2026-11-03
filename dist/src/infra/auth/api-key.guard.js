var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { timingSafeEqual } from "node:crypto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
let ApiKeyGuard = class ApiKeyGuard {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const provided = request.headers["x-api-key"];
        if (typeof provided !== "string" || !this.matchesApiKey(provided)) {
            throw new UnauthorizedException();
        }
        return true;
    }
    matchesApiKey(provided) {
        const expected = Buffer.from(this.configService.get("SERVICE_API_KEY", { infer: true }));
        const received = Buffer.from(provided);
        return (received.length === expected.length && timingSafeEqual(received, expected));
    }
};
ApiKeyGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], ApiKeyGuard);
export { ApiKeyGuard };
//# sourceMappingURL=api-key.guard.js.map