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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const current_user_interceptor_1 = require("../../infra/auth/current-user.interceptor");
const zod_validation_pipe_1 = require("../../infra/http/pipes/zod-validation-pipe");
const expense_presenter_1 = require("../../infra/http/presenters/expense.presenter");
const common_1 = require("@nestjs/common");
const expense_dto_1 = require("./expense.dto");
const expense_service_1 = require("./expense.service");
let ExpenseController = class ExpenseController {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    async createExpense({ userId }, body) {
        const expense = await this.expenseService.createExpense(body, userId);
        return expense_presenter_1.ExpensePresenter.toExpenseDTO(expense);
    }
    async getPersonalExpenses({ userId }, query, res) {
        const { expenses, totalCount } = await this.expenseService.getPersonalExpenses({
            ownerId: userId,
            startDate: query.startDate,
            endDate: query.endDate,
            offset: query.offset,
            limit: query.limit,
            orderBy: query.orderBy,
            orderType: query.orderType,
            filterBy: query.filterBy,
            filterValue: query.filterValue
        });
        res.setHeader('X-Total-Count', totalCount);
        return expenses.map(expense_presenter_1.ExpensePresenter.toPersonalExpenseDTO);
    }
    async getSharedExpenses({ userId }, query, res) {
        const { expenses, totalCount } = await this.expenseService.getSharedExpenses({
            ownerId: userId,
            startDate: query.startDate,
            endDate: query.endDate,
            offset: query.offset,
            limit: query.limit,
            orderBy: query.orderBy,
            orderType: query.orderType,
            filterBy: query.filterBy,
            filterValue: query.filterValue
        });
        res.setHeader('X-Total-Count', totalCount);
        return expenses.map(expense => expense_presenter_1.ExpensePresenter.toSharedExpenseDTO(expense, userId));
    }
};
exports.ExpenseController = ExpenseController;
__decorate([
    (0, common_1.UseInterceptors)(current_user_interceptor_1.CurrentUserInterceptor),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(expense_dto_1.createExpenseSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "createExpense", null);
__decorate([
    (0, common_1.UseInterceptors)(current_user_interceptor_1.CurrentUserInterceptor),
    (0, common_1.Get)('/personal'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(expense_dto_1.queryExpenseSchema))),
    __param(2, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "getPersonalExpenses", null);
__decorate([
    (0, common_1.UseInterceptors)(current_user_interceptor_1.CurrentUserInterceptor),
    (0, common_1.Get)('/shared'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(expense_dto_1.queryExpenseSchema))),
    __param(2, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "getSharedExpenses", null);
exports.ExpenseController = ExpenseController = __decorate([
    (0, common_1.Controller)('expenses'),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService])
], ExpenseController);
//# sourceMappingURL=expense.controller.js.map