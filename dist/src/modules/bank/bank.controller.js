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
import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query } from "@nestjs/common";
import { ZodValidationPipe } from "../../infra/http/pipes/zod-validation-pipe.js";
import { BankPresenter } from "../../infra/http/presenters/bank.presenter.js";
import { bankByIdSchema, createBankSchema, listBanksSchema } from "./bank.dto.js";
import { BankService } from "./bank.service.js";
let BankController = class BankController {
    bankService;
    constructor(bankService) {
        this.bankService = bankService;
    }
    async listBanks(query) {
        const { offset, limit } = query;
        const banks = await this.bankService.getAll(offset, limit);
        return banks.map(BankPresenter.toHttp);
    }
    async getBankById(params) {
        const { id } = params;
        const bank = await this.bankService.getById(id);
        if (!bank) {
            throw new NotFoundException();
        }
        return BankPresenter.toHttp(bank) || null;
    }
    async createBank(body) {
        const { name } = body;
        const bank = await this.bankService.create(name);
        return BankPresenter.toHttp(bank);
    }
    async updateBank(params, body) {
        const { id } = params;
        const { name } = body;
        const bank = await this.bankService.update(id, name);
        return BankPresenter.toHttp(bank);
    }
    async deleteBank(params) {
        const { id } = params;
        return this.bankService.delete(id);
    }
};
__decorate([
    Get(),
    __param(0, Query(new ZodValidationPipe(listBanksSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "listBanks", null);
__decorate([
    Get(":id"),
    __param(0, Param(new ZodValidationPipe(bankByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "getBankById", null);
__decorate([
    Post(),
    __param(0, Body(new ZodValidationPipe(createBankSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "createBank", null);
__decorate([
    Patch(":id"),
    __param(0, Param(new ZodValidationPipe(bankByIdSchema))),
    __param(1, Body(new ZodValidationPipe(createBankSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "updateBank", null);
__decorate([
    HttpCode(204),
    Delete(":id"),
    __param(0, Param(new ZodValidationPipe(bankByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "deleteBank", null);
BankController = __decorate([
    Controller("banks"),
    __metadata("design:paramtypes", [BankService])
], BankController);
export { BankController };
//# sourceMappingURL=bank.controller.js.map