"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceModule = void 0;
const infra_module_1 = require("../../infra/infra.module");
const common_1 = require("@nestjs/common");
const expense_module_1 = require("../expense/expense.module");
const expense_service_1 = require("../expense/expense.service");
const payment_type_module_1 = require("../payment-type/payment-type.module");
const statement_period_module_1 = require("../statement-period/statement-period.module");
const balance_controller_1 = require("./balance.controller");
const balance_service_1 = require("./balance.service");
let BalanceModule = class BalanceModule {
};
exports.BalanceModule = BalanceModule;
exports.BalanceModule = BalanceModule = __decorate([
    (0, common_1.Module)({
        imports: [infra_module_1.InfraModule, expense_module_1.ExpenseModule, payment_type_module_1.PaymentTypeModule, statement_period_module_1.StatementPeriodModule],
        controllers: [balance_controller_1.BalanceController],
        providers: [expense_service_1.ExpenseService, balance_service_1.BalanceService]
    })
], BalanceModule);
//# sourceMappingURL=balance.module.js.map