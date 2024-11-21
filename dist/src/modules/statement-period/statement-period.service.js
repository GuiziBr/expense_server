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
var StatementPeriodService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementPeriodService = void 0;
const database_service_1 = require("../../infra/database/database.service");
const common_1 = require("@nestjs/common");
const appError_1 = require("../utils/appError");
let StatementPeriodService = StatementPeriodService_1 = class StatementPeriodService {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.logger = new common_1.Logger(StatementPeriodService_1.name);
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
            throw new appError_1.default('Internal server error', 500);
        }
    }
};
exports.StatementPeriodService = StatementPeriodService;
exports.StatementPeriodService = StatementPeriodService = StatementPeriodService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], StatementPeriodService);
//# sourceMappingURL=statement-period.service.js.map