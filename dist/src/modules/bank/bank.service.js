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
var BankService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankService = void 0;
const database_service_1 = require("../../infra/database/database.service");
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const appError_1 = require("../utils/appError");
const constants_1 = require("../utils/constants");
let BankService = BankService_1 = class BankService {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.logger = new common_1.Logger(BankService_1.name);
    }
    async getAll(offset, limit) {
        try {
            const banks = await this.databaseService.bank.findMany({
                where: { deletedAt: null },
                skip: offset,
                take: limit,
                orderBy: { name: 'asc' }
            });
            return banks;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting all banks`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async getById(id) {
        try {
            const bank = await this.databaseService.bank.findUnique({ where: { id, deletedAt: null } });
            return bank;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting bank by id ${id}`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async create(name) {
        try {
            const bank = await this.databaseService.bank.upsert({
                where: { name },
                update: { name, deletedAt: null },
                create: { name }
            });
            return bank;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - creating bank ${name}`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async update(id, name) {
        try {
            const [bank, sameNameBank] = await Promise.all([
                this.databaseService.bank.findUnique({ where: { id } }),
                this.databaseService.bank.findUnique({ where: { name } })
            ]);
            if (!bank) {
                this.logger.error(`Bank ${id} not found`);
                throw new appError_1.default('Bank not found', 404);
            }
            if ((bank && !sameNameBank) || (sameNameBank?.id === id)) {
                const updatedBank = await this.databaseService.bank.update({
                    where: { id },
                    data: { name, deletedAt: null }
                });
                return updatedBank;
            }
            if (sameNameBank) {
                if (!sameNameBank?.deletedAt) {
                    this.logger.error(`Bank with name "${name}" already exists`);
                    throw new appError_1.default('There is already a bank with same name', 400);
                }
            }
            const reactivatedBank = await this.reactivateBank(id, sameNameBank.id);
            return reactivatedBank;
        }
        catch (error) {
            if (error instanceof appError_1.default) {
                throw error;
            }
            this.logger.error(`Error - ${error.message || error} - updating bank ${id}`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async delete(id) {
        try {
            await this.databaseService.bank.update({
                where: { id },
                data: { deletedAt: new Date() }
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError
                && error.code === constants_1.constants.RECORD_NOT_FOUND) {
                return;
            }
            this.logger.error(`Error - ${error.message || error} - deleting bank ${id}`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async reactivateBank(bankIdToDelete, bankIdToRestore) {
        try {
            const [, reactivatedBank] = await Promise.all([
                this.delete(bankIdToDelete),
                this.databaseService.bank.update({
                    where: { id: bankIdToRestore },
                    data: { deletedAt: null }
                })
            ]);
            return reactivatedBank;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - reactivating bank ${bankIdToDelete}`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
};
exports.BankService = BankService;
exports.BankService = BankService = BankService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], BankService);
//# sourceMappingURL=bank.service.js.map