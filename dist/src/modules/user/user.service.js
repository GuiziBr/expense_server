"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_service_1 = require("../../infra/database/database.service");
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const appError_1 = require("../utils/appError");
let UserService = UserService_1 = class UserService {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async findUserByEmail(email) {
        try {
            const user = await this.databaseService.user.findUnique({ where: { email } });
            return user;
        }
        catch (error) {
            this.logger.error(`Error - ${error} - finding user by email ${email}`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async updateUserAvatar(userId, avatar) {
        try {
            await this.databaseService.user.update({ where: { id: userId }, data: { avatar } });
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - updating user avatar ${userId}`);
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                throw new appError_1.default('Error updating user avatar', 400);
            }
            throw new appError_1.default('Internal server error', 500);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UserService);
//# sourceMappingURL=user.service.js.map