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
exports.BankController = void 0;
const zod_validation_pipe_1 = require("../../infra/http/pipes/zod-validation-pipe");
const bank_presenter_1 = require("../../infra/http/presenters/bank.presenter");
const common_1 = require("@nestjs/common");
const bank_dto_1 = require("./bank.dto");
const bank_service_1 = require("./bank.service");
let BankController = class BankController {
    constructor(bankService) {
        this.bankService = bankService;
    }
    async listBanks(query) {
        const { offset, limit } = query;
        const banks = await this.bankService.getAll(offset, limit);
        return banks.map(bank_presenter_1.BankPresenter.toHttp);
    }
    async getBankById(params) {
        const { id } = params;
        const bank = await this.bankService.getById(id);
        if (!bank) {
            throw new common_1.NotFoundException();
        }
        return bank_presenter_1.BankPresenter.toHttp(bank) || null;
    }
    async createBank(body) {
        const { name } = body;
        const bank = await this.bankService.create(name);
        return bank_presenter_1.BankPresenter.toHttp(bank);
    }
    async updateBank(params, body) {
        const { id } = params;
        const { name } = body;
        const bank = await this.bankService.update(id, name);
        return bank_presenter_1.BankPresenter.toHttp(bank);
    }
    async deleteBank(params) {
        const { id } = params;
        return this.bankService.delete(id);
    }
};
exports.BankController = BankController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(bank_dto_1.listBanksSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "listBanks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(bank_dto_1.bankByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "getBankById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(bank_dto_1.createBankSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "createBank", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(bank_dto_1.bankByIdSchema))),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(bank_dto_1.createBankSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "updateBank", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(bank_dto_1.bankByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "deleteBank", null);
exports.BankController = BankController = __decorate([
    (0, common_1.Controller)('banks'),
    __metadata("design:paramtypes", [bank_service_1.BankService])
], BankController);
//# sourceMappingURL=bank.controller.js.map