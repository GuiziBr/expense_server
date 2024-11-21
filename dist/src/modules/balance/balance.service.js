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
var BalanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const expense_service_1 = require("../expense/expense.service");
const appError_1 = require("../utils/appError");
let BalanceService = BalanceService_1 = class BalanceService {
    constructor(expensesService) {
        this.expensesService = expensesService;
        this.logger = new common_1.Logger(BalanceService_1.name);
    }
    getBank(bank, amount) {
        return { id: bank.id, name: bank.name, total: amount };
    }
    getPayment(expense) {
        return {
            id: expense.paymentTypeId,
            description: expense.paymentType.description,
            banks: [this.getBank(expense.bank, expense.amount)],
            total: expense.amount
        };
    }
    getCategory(expense) {
        return {
            id: expense.categoryId,
            description: expense.category.description,
            total: expense.amount
        };
    }
    async getBalance(data) {
        try {
            const [{ expenses: personalExpenses }, { expenses: sharedExpenses }] = await Promise.all([
                this.expensesService.getPersonalExpenses(data),
                this.expensesService.getSharedExpenses(data)
            ]);
            const { ownerId } = data;
            const personalBalance = personalExpenses.reduce((acc, expense) => acc + expense.amount, 0);
            const sharedBalance = sharedExpenses.reduce((acc, expense) => {
                if (expense.ownerId === ownerId)
                    acc.paying += expense.amount;
                else
                    acc.payed += expense.amount;
                return acc;
            }, { paying: 0, payed: 0, total: 0 });
            return {
                personalBalance,
                sharedBalance: {
                    paying: sharedBalance.paying,
                    payed: sharedBalance.payed,
                    total: sharedBalance.paying - sharedBalance.payed
                }
            };
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting balance`);
            throw new appError_1.default('Error getting balance', 500);
        }
    }
    async getConsolidatedBalance({ year, month, userId }) {
        try {
            const initialDate = new Date(year, month, 1);
            const finalDate = (0, date_fns_1.endOfMonth)(initialDate);
            const expenses = await this.expensesService.getExpensesByDateRange(false, initialDate, finalDate);
            const consolidatedReport = expenses.reduce((acc, expense) => {
                const ownerIndex = acc.findIndex(({ ownerId }) => ownerId === expense.ownerId);
                if (ownerIndex >= 0) {
                    const owner = acc[ownerIndex];
                    const paymentTypeIndex = owner
                        .payments
                        ?.findIndex(({ id }) => id === expense.paymentTypeId);
                    if (paymentTypeIndex >= 0) {
                        const bankIndex = owner.payments[paymentTypeIndex].banks.findIndex((bank) => bank.id === expense.bankId);
                        if (bankIndex >= 0) {
                            owner.payments[paymentTypeIndex].banks[bankIndex].total += expense.amount;
                        }
                        else {
                            owner.payments[paymentTypeIndex].banks.push(this.getBank(expense.bank, expense.amount));
                        }
                        owner.payments[paymentTypeIndex].total += expense.amount;
                    }
                    else {
                        owner.payments.push(this.getPayment(expense));
                    }
                    const categoryIndex = owner.categories?.findIndex(({ id }) => id === expense.categoryId);
                    if (categoryIndex >= 0) {
                        owner.categories[categoryIndex].total += expense.amount;
                    }
                    else {
                        owner.categories.push(this.getCategory(expense));
                    }
                    owner.total += expense.amount;
                }
                else {
                    acc.push({
                        ownerId: expense.ownerId,
                        ownerName: expense.user.name,
                        payments: [this.getPayment(expense)],
                        categories: [this.getCategory(expense)],
                        total: expense.amount
                    });
                }
                return acc;
            }, []);
            const requester = consolidatedReport.find(({ ownerId }) => ownerId === userId);
            const requesterBalance = requester ? requester.total : 0;
            const partner = consolidatedReport.find(({ ownerId }) => ownerId !== userId);
            const partnerBalance = partner ? partner.total : 0;
            return {
                userId,
                requesterBalance,
                partnerBalance,
                requester,
                partner
            };
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting consolidated balance`);
            throw new appError_1.default('Error getting consolidated balance', 500);
        }
    }
};
exports.BalanceService = BalanceService;
exports.BalanceService = BalanceService = BalanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService])
], BalanceService);
//# sourceMappingURL=balance.service.js.map