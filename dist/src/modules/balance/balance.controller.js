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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceController = void 0;
const current_user_interceptor_1 = require("../../infra/auth/current-user.interceptor");
const zod_validation_pipe_1 = require("../../infra/http/pipes/zod-validation-pipe");
const common_1 = require("@nestjs/common");
const balance_dto_1 = require("./balance.dto");
const balance_service_1 = require("./balance.service");
const balance_presenter_1 = require("../../infra/http/presenters/balance.presenter");
let BalanceController = class BalanceController {
    constructor(balanceService) {
        this.balanceService = balanceService;
    }
    async getBalance({ userId }, query) {
        return this.balanceService.getBalance({
            ownerId: userId,
            startDate: query.startDate,
            endDate: query.endDate,
            filterBy: query.filterBy,
            filterValue: query.filterValue
        });
    }
    async getConsolidatedBalance({ userId }, params) {
        const monthValue = Number(params.month) - 1;
        const yearValue = Number(params.year);
        const consolidatedBalance = await this.balanceService.getConsolidatedBalance({
            userId,
            month: monthValue,
            year: yearValue
        });
        return balance_presenter_1.BalancePresenter.toConsolidatedBalanceDTO(consolidatedBalance);
    }
};
exports.BalanceController = BalanceController;
__decorate([
    (0, common_1.UseInterceptors)(current_user_interceptor_1.CurrentUserInterceptor),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(balance_dto_1.queryBalanceSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "getBalance", null);
__decorate([
    (0, common_1.UseInterceptors)(current_user_interceptor_1.CurrentUserInterceptor),
    (0, common_1.Get)('/consolidated/:year/:month'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(balance_dto_1.queryConsolidatedBalanceSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "getConsolidatedBalance", null);
exports.BalanceController = BalanceController = __decorate([
    (0, common_1.Controller)('balance'),
    __metadata("design:paramtypes", [balance_service_1.BalanceService])
], BalanceController);
//# sourceMappingURL=balance.controller.js.map