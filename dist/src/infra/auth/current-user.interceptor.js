var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CurrentUserInterceptor_1;
import { Injectable, Logger } from "@nestjs/common";
import AppError from "../../modules/utils/appError.js";
import { DatabaseService } from "../database/database.service.js";
let CurrentUserInterceptor = CurrentUserInterceptor_1 = class CurrentUserInterceptor {
    databaseService;
    logger = new Logger(CurrentUserInterceptor_1.name);
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { sub } = request.user;
        const currentUser = await this.databaseService.user.findUnique({
            where: { id: sub }
        });
        if (!currentUser) {
            this.logger.error(`Error - User not found - ${sub}`);
            throw new AppError("User not found", 404);
        }
        request.userId = currentUser.id;
        return next.handle();
    }
};
CurrentUserInterceptor = CurrentUserInterceptor_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DatabaseService])
], CurrentUserInterceptor);
export { CurrentUserInterceptor };
//# sourceMappingURL=current-user.interceptor.js.map