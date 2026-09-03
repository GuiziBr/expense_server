var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { InfraModule } from "./infra/infra.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { BalanceModule } from "./modules/balance/balance.module.js";
import { BankModule } from "./modules/bank/bank.module.js";
import { CategoryModule } from "./modules/category/category.module.js";
import { ExpenseModule } from "./modules/expense/expense.module.js";
import { HealthModule } from "./modules/health/health.module.js";
import { PaymentTypeModule } from "./modules/payment-type/payment-type.module.js";
import { StatementPeriodModule } from "./modules/statement-period/statement-period.module.js";
import { StoreModule } from "./modules/store/store.module.js";
import { UserModule } from "./modules/user/user.module.js";
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            InfraModule,
            HealthModule,
            AuthModule,
            UserModule,
            PaymentTypeModule,
            BankModule,
            CategoryModule,
            StoreModule,
            StatementPeriodModule,
            ExpenseModule,
            BalanceModule
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map