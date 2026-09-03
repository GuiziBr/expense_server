var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { InfraModule } from "../../infra/infra.module.js";
import { ExpenseModule } from "../expense/expense.module.js";
import { PaymentTypeModule } from "../payment-type/payment-type.module.js";
import { StatementPeriodModule } from "../statement-period/statement-period.module.js";
import { BalanceController } from "./balance.controller.js";
import { BalanceService } from "./balance.service.js";
let BalanceModule = class BalanceModule {
};
BalanceModule = __decorate([
    Module({
        imports: [
            InfraModule,
            ExpenseModule,
            PaymentTypeModule,
            StatementPeriodModule
        ],
        controllers: [BalanceController],
        providers: [BalanceService]
    })
], BalanceModule);
export { BalanceModule };
//# sourceMappingURL=balance.module.js.map