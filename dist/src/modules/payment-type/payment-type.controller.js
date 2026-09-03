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
import { PaymentTypePresenter } from "../../infra/http/presenters/paymentType.presenter.js";
import { createPaymentTypeSchema, listPaymentTypesSchema, paymentTypeByIdSchema } from "./payment-type.dto.js";
import { PaymentTypeService } from "./payment-type.service.js";
let PaymentTypeController = class PaymentTypeController {
    paymentTypeService;
    constructor(paymentTypeService) {
        this.paymentTypeService = paymentTypeService;
    }
    async listPaymentTypes(query) {
        const { offset, limit } = query;
        const paymentTypes = await this.paymentTypeService.getAll(offset, limit);
        return paymentTypes.map(PaymentTypePresenter.toHttp);
    }
    async getPaymentTypeById(params) {
        const { id } = params;
        const paymentType = await this.paymentTypeService.getById(id);
        if (!paymentType) {
            throw new NotFoundException();
        }
        return PaymentTypePresenter.toHttp(paymentType) || null;
    }
    async createPaymentType(body) {
        const { description, hasStatement } = body;
        const paymentType = await this.paymentTypeService.create(description, hasStatement);
        return PaymentTypePresenter.toHttp(paymentType);
    }
    async updatePaymentType(params, body) {
        const { id } = params;
        const { description, hasStatement } = body;
        const paymentType = await this.paymentTypeService.update(id, description, hasStatement);
        return PaymentTypePresenter.toHttp(paymentType);
    }
    async deletePaymentType(params) {
        const { id } = params;
        return this.paymentTypeService.delete(id);
    }
};
__decorate([
    Get(),
    __param(0, Query(new ZodValidationPipe(listPaymentTypesSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentTypeController.prototype, "listPaymentTypes", null);
__decorate([
    Get(":id"),
    __param(0, Param(new ZodValidationPipe(paymentTypeByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentTypeController.prototype, "getPaymentTypeById", null);
__decorate([
    Post(),
    __param(0, Body(new ZodValidationPipe(createPaymentTypeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentTypeController.prototype, "createPaymentType", null);
__decorate([
    Patch(":id"),
    __param(0, Param(new ZodValidationPipe(paymentTypeByIdSchema))),
    __param(1, Body(new ZodValidationPipe(createPaymentTypeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentTypeController.prototype, "updatePaymentType", null);
__decorate([
    HttpCode(204),
    Delete(":id"),
    __param(0, Param(new ZodValidationPipe(paymentTypeByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentTypeController.prototype, "deletePaymentType", null);
PaymentTypeController = __decorate([
    Controller("paymentType"),
    __metadata("design:paramtypes", [PaymentTypeService])
], PaymentTypeController);
export { PaymentTypeController };
//# sourceMappingURL=payment-type.controller.js.map