var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserService_1;
import { Injectable, Logger } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DatabaseService } from "../../infra/database/database.service.js";
import AppError from "../utils/appError.js";
let UserService = UserService_1 = class UserService {
    databaseService;
    logger = new Logger(UserService_1.name);
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findUserByEmail(email) {
        try {
            const user = await this.databaseService.user.findUnique({
                where: { email }
            });
            return user;
        }
        catch (error) {
            this.logger.error(`Error - ${error} - finding user by email ${email}`);
            throw new AppError("Internal server error", 500);
        }
    }
    async updateUserAvatar(userId, avatar) {
        try {
            await this.databaseService.user.update({
                where: { id: userId },
                data: { avatar }
            });
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - updating user avatar ${userId}`);
            if (error instanceof PrismaClientKnownRequestError) {
                throw new AppError("Error updating user avatar", 400);
            }
            throw new AppError("Internal server error", 500);
        }
    }
};
UserService = UserService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DatabaseService])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map