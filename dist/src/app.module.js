"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const env_1 = require("./infra/env");
const infra_module_1 = require("./infra/infra.module");
const auth_module_1 = require("./modules/auth/auth.module");
const bank_module_1 = require("./modules/bank/bank.module");
const category_module_1 = require("./modules/category/category.module");
const expense_module_1 = require("./modules/expense/expense.module");
const health_module_1 = require("./modules/health/health.module");
const payment_type_module_1 = require("./modules/payment-type/payment-type.module");
const statement_period_module_1 = require("./modules/statement-period/statement-period.module");
const store_module_1 = require("./modules/store/store.module");
const user_module_1 = require("./modules/user/user.module");
const balance_module_1 = require("./modules/balance/balance.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validate: env => env_1.envSchema.parse(env),
                isGlobal: true
            }),
            infra_module_1.InfraModule,
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            payment_type_module_1.PaymentTypeModule,
            bank_module_1.BankModule,
            category_module_1.CategoryModule,
            store_module_1.StoreModule,
            statement_period_module_1.StatementPeriodModule,
            expense_module_1.ExpenseModule,
            balance_module_1.BalanceModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map