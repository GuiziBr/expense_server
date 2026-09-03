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
import { Controller, Get, Param, Query, Request, UseInterceptors } from "@nestjs/common";
import { CurrentUserInterceptor } from "../../infra/auth/current-user.interceptor.js";
import { ZodValidationPipe } from "../../infra/http/pipes/zod-validation-pipe.js";
import { BalancePresenter } from "../../infra/http/presenters/balance.presenter.js";
import { queryBalanceSchema, queryConsolidatedBalanceSchema } from "./balance.dto.js";
import { BalanceService } from "./balance.service.js";
let BalanceController = class BalanceController {
    balanceService;
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
        return BalancePresenter.toConsolidatedBalanceDTO(consolidatedBalance);
    }
};
__decorate([
    UseInterceptors(CurrentUserInterceptor),
    Get(),
    __param(0, Request()),
    __param(1, Query(new ZodValidationPipe(queryBalanceSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "getBalance", null);
__decorate([
    UseInterceptors(CurrentUserInterceptor),
    Get("/consolidated/:year/:month"),
    __param(0, Request()),
    __param(1, Param(new ZodValidationPipe(queryConsolidatedBalanceSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "getConsolidatedBalance", null);
BalanceController = __decorate([
    Controller("balance"),
    __metadata("design:paramtypes", [BalanceService])
], BalanceController);
export { BalanceController };
//# sourceMappingURL=balance.controller.js.map