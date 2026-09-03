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
import { Injectable, Logger } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DatabaseService } from "../../infra/database/database.service.js";
import AppError from "../utils/appError.js";
import { constants } from "../utils/constants.js";
let BankService = BankService_1 = class BankService {
    databaseService;
    logger = new Logger(BankService_1.name);
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getAll(offset, limit) {
        try {
            const banks = await this.databaseService.bank.findMany({
                where: { deletedAt: null },
                skip: offset,
                take: limit,
                orderBy: { name: "asc" }
            });
            return banks;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting all banks`);
            throw new AppError("Internal server error", 500);
        }
    }
    async getById(id) {
        try {
            const bank = await this.databaseService.bank.findUnique({
                where: { id, deletedAt: null }
            });
            return bank;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting bank by id ${id}`);
            throw new AppError("Internal server error", 500);
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
            throw new AppError("Internal server error", 500);
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
                throw new AppError("Bank not found", 404);
            }
            if ((bank && !sameNameBank) || sameNameBank?.id === id) {
                const updatedBank = await this.databaseService.bank.update({
                    where: { id },
                    data: { name, deletedAt: null }
                });
                return updatedBank;
            }
            if (sameNameBank) {
                if (!sameNameBank?.deletedAt) {
                    this.logger.error(`Bank with name "${name}" already exists`);
                    throw new AppError("There is already a bank with same name", 400);
                }
            }
            const [, renamedBank] = await this.databaseService.$transaction([
                this.databaseService.bank.update({
                    where: { id: sameNameBank.id },
                    data: { name: `${sameNameBank.name}_${sameNameBank.id}` }
                }),
                this.databaseService.bank.update({
                    where: { id },
                    data: { name, deletedAt: null }
                })
            ]);
            return renamedBank;
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            if (error instanceof PrismaClientKnownRequestError &&
                error.code === constants.UNIQUE_CONSTRAINT_VIOLATION) {
                this.logger.error(`Bank with name "${name}" already exists`);
                throw new AppError("There is already a bank with same name", 400);
            }
            this.logger.error(`Error - ${error.message || error} - updating bank ${id}`);
            throw new AppError("Internal server error", 500);
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
            if (error instanceof PrismaClientKnownRequestError &&
                error.code === constants.RECORD_NOT_FOUND) {
                return;
            }
            this.logger.error(`Error - ${error.message || error} - deleting bank ${id}`);
            throw new AppError("Internal server error", 500);
        }
    }
};
BankService = BankService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DatabaseService])
], BankService);
export { BankService };
//# sourceMappingURL=bank.service.js.map