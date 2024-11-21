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
var CurrentUserInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserInterceptor = void 0;
const appError_1 = require("../../modules/utils/appError");
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let CurrentUserInterceptor = CurrentUserInterceptor_1 = class CurrentUserInterceptor {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.logger = new common_1.Logger(CurrentUserInterceptor_1.name);
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { sub } = request.user;
        const currentUser = await this.databaseService.user.findUnique({
            where: { id: sub }
        });
        if (!currentUser) {
            this.logger.error(`Error - User not found - ${sub}`);
            throw new appError_1.default('User not found', 404);
        }
        request.userId = currentUser.id;
        return next.handle();
    }
};
exports.CurrentUserInterceptor = CurrentUserInterceptor;
exports.CurrentUserInterceptor = CurrentUserInterceptor = CurrentUserInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CurrentUserInterceptor);
//# sourceMappingURL=current-user.interceptor.js.map