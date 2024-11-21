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
exports.PaymentTypeController = void 0;
const zod_validation_pipe_1 = require("../../infra/http/pipes/zod-validation-pipe");
const paymentType_presenter_1 = require("../../infra/http/presenters/paymentType.presenter");
const common_1 = require("@nestjs/common");
const payment_type_dto_1 = require("./payment-type.dto");
const payment_type_service_1 = require("./payment-type.service");
let PaymentTypeController = class PaymentTypeController {
    constructor(paymentTypeService) {
        this.paymentTypeService = paymentTypeService;
    }
    async listPaymentTypes(query) {
        const { offset, limit } = query;
        const paymentTypes = await this.paymentTypeService.getAll(offset, limit);
        return paymentTypes.map(paymentType_presenter_1.PaymentTypePresenter.toHttp);
    }
    async getPaymentTypeById(params) {
        const { id } = params;
        const paymentType = await this.paymentTypeService.getById(id);
        if (!paymentType) {
            throw new common_1.NotFoundException();
        }
        return paymentType_presenter_1.PaymentTypePresenter.toHttp(paymentType) || null;
    }
    async createPaymentType(body) {
        const { description, hasStatement } = body;
        const paymentType = await this.paymentTypeService.create(description, hasStatement);
        return paymentType_presenter_1.PaymentTypePresenter.toHttp(paymentType);
    }
    async updatePaymentType(params, body) {
        const { id } = params;
        const { description, hasStatement } = body;
        const paymentType = await this.paymentTypeService.update(id, description, hasStatement);
        return paymentType_presenter_1.PaymentTypePresenter.toHttp(paymentType);
    }
    async deletePaymentType(params) {
        const { id } = params;
        return this.paymentTypeService.delete(id);
    }
};
exports.PaymentTypeController = PaymentTypeController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(payment_type_dto_1.listPaymentTypesSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentTypeController.prototype, "listPaymentTypes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(payment_type_dto_1.paymentTypeByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentTypeController.prototype, "getPaymentTypeById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(payment_type_dto_1.createPaymentTypeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentTypeController.prototype, "createPaymentType", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(payment_type_dto_1.paymentTypeByIdSchema))),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(payment_type_dto_1.createPaymentTypeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentTypeController.prototype, "updatePaymentType", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(payment_type_dto_1.paymentTypeByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentTypeController.prototype, "deletePaymentType", null);
exports.PaymentTypeController = PaymentTypeController = __decorate([
    (0, common_1.Controller)('paymentType'),
    __metadata("design:paramtypes", [payment_type_service_1.PaymentTypeService])
], PaymentTypeController);
//# sourceMappingURL=payment-type.controller.js.map