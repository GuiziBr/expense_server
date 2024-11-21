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
var PaymentTypeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTypeService = void 0;
const database_service_1 = require("../../infra/database/database.service");
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const appError_1 = require("../utils/appError");
const constants_1 = require("../utils/constants");
let PaymentTypeService = PaymentTypeService_1 = class PaymentTypeService {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.logger = new common_1.Logger(PaymentTypeService_1.name);
    }
    async getAll(offset, limit) {
        try {
            const paymentTypes = await this.databaseService.paymentType.findMany({
                where: { deletedAt: null },
                skip: offset,
                take: limit,
                orderBy: { description: 'asc' }
            });
            return paymentTypes;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting all payment types`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async getById(id) {
        try {
            const paymentType = await this.databaseService.paymentType.findUnique({ where: { id, deletedAt: null } });
            return paymentType;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting payment type by id ${id}`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async create(description, hasStatement) {
        try {
            const paymentType = await this.databaseService.paymentType.upsert({
                where: { description },
                update: { description, hasStatement, deletedAt: null },
                create: { description, hasStatement }
            });
            return paymentType;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - creating payment type ${description}`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async update(id, description, hasStatement) {
        try {
            const [paymentType, sameDescriptionPaymentType] = await Promise.all([
                this.databaseService.paymentType.findUnique({ where: { id } }),
                this.databaseService.paymentType.findUnique({
                    where: { description }
                })
            ]);
            if (!paymentType) {
                this.logger.error(`Payment type ${id} not found`);
                throw new appError_1.default('Payment type not found', 404);
            }
            if ((paymentType && !sameDescriptionPaymentType)
                || (sameDescriptionPaymentType?.id === id)) {
                const updatedPaymentType = await this.databaseService.paymentType.update({
                    where: { id },
                    data: { description, hasStatement, deletedAt: null }
                });
                return updatedPaymentType;
            }
            if (sameDescriptionPaymentType) {
                if (!sameDescriptionPaymentType?.deletedAt) {
                    this.logger.error(`Payment type with description "${description}" already exists`);
                    throw new appError_1.default('There is already a payment type with same description', 400);
                }
                const reactivatedPaymentType = await this.reactivatePaymentType(id, sameDescriptionPaymentType.id);
                return reactivatedPaymentType;
            }
        }
        catch (error) {
            if (error instanceof appError_1.default) {
                throw error;
            }
            this.logger.error(`Error - ${error.message || error} - updating payment type ${id}`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async delete(id) {
        try {
            await this.databaseService.paymentType.update({
                where: { id },
                data: { deletedAt: new Date() }
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError
                && error.code === constants_1.constants.RECORD_NOT_FOUND) {
                return;
            }
            this.logger.error(`Error - ${error.message || error} - deleting payment type ${id}`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async reactivatePaymentType(paymentTypeIdToDelete, paymentTypeIdToRestore) {
        try {
            const [, reactivatedPaymentType] = await Promise.all([
                this.delete(paymentTypeIdToDelete),
                this.databaseService.paymentType.update({
                    where: { id: paymentTypeIdToRestore },
                    data: { deletedAt: null }
                })
            ]);
            return reactivatedPaymentType;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - reactivating payment type ${paymentTypeIdToDelete}`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
};
exports.PaymentTypeService = PaymentTypeService;
exports.PaymentTypeService = PaymentTypeService = PaymentTypeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PaymentTypeService);
//# sourceMappingURL=payment-type.service.js.map