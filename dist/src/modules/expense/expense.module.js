"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModule = void 0;
const infra_module_1 = require("../../infra/infra.module");
const common_1 = require("@nestjs/common");
const payment_type_module_1 = require("../payment-type/payment-type.module");
const payment_type_service_1 = require("../payment-type/payment-type.service");
const expense_controller_1 = require("./expense.controller");
const expense_service_1 = require("./expense.service");
const statement_period_module_1 = require("../statement-period/statement-period.module");
const statement_period_service_1 = require("../statement-period/statement-period.service");
let ExpenseModule = class ExpenseModule {
};
exports.ExpenseModule = ExpenseModule;
exports.ExpenseModule = ExpenseModule = __decorate([
    (0, common_1.Module)({
        imports: [infra_module_1.InfraModule, payment_type_module_1.PaymentTypeModule, statement_period_module_1.StatementPeriodModule],
        controllers: [expense_controller_1.ExpenseController],
        providers: [expense_service_1.ExpenseService, payment_type_service_1.PaymentTypeService, statement_period_service_1.StatementPeriodService],
        exports: [expense_service_1.ExpenseService]
    })
], ExpenseModule);
//# sourceMappingURL=expense.module.js.map