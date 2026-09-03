var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StatementPeriodService_1;
import { Injectable, Logger } from "@nestjs/common";
import { DatabaseService } from "../../infra/database/database.service.js";
import AppError from "../utils/appError.js";
let StatementPeriodService = StatementPeriodService_1 = class StatementPeriodService {
    databaseService;
    logger = new Logger(StatementPeriodService_1.name);
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findByUserAndBank(userId, bankId, paymentTypeId) {
        try {
            const statementPeriod = await this.databaseService.statementPeriod.findFirst({
                where: {
                    userId,
                    bankId,
                    paymentTypeId
                }
            });
            return statementPeriod;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting statement period`);
            throw new AppError("Internal server error", 500);
        }
    }
};
StatementPeriodService = StatementPeriodService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DatabaseService])
], StatementPeriodService);
export { StatementPeriodService };
//# sourceMappingURL=statement-period.service.js.map