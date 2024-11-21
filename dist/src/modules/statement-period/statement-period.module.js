"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementPeriodModule = void 0;
const infra_module_1 = require("../../infra/infra.module");
const common_1 = require("@nestjs/common");
const statement_period_service_1 = require("./statement-period.service");
let StatementPeriodModule = class StatementPeriodModule {
};
exports.StatementPeriodModule = StatementPeriodModule;
exports.StatementPeriodModule = StatementPeriodModule = __decorate([
    (0, common_1.Module)({
        imports: [infra_module_1.InfraModule],
        providers: [statement_period_service_1.StatementPeriodService],
        exports: [statement_period_service_1.StatementPeriodService]
    })
], StatementPeriodModule);
//# sourceMappingURL=statement-period.module.js.map