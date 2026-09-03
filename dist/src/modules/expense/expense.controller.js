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
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Request, Response, UseInterceptors } from "@nestjs/common";
import { CurrentUserInterceptor } from "../../infra/auth/current-user.interceptor.js";
import { ZodValidationPipe } from "../../infra/http/pipes/zod-validation-pipe.js";
import { ExpensePresenter } from "../../infra/http/presenters/expense.presenter.js";
import { createExpenseSchema, expenseByIdSchema, queryExpenseSchema, updateExpenseSchema } from "./expense.dto.js";
import { ExpenseService } from "./expense.service.js";
let ExpenseController = class ExpenseController {
    expenseService;
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    async createExpense({ userId }, body) {
        const expense = await this.expenseService.createExpense(body, userId);
        return ExpensePresenter.toExpenseDTO(expense);
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
        res.setHeader("X-Total-Count", totalCount);
        return expenses.map(ExpensePresenter.toPersonalExpenseDTO);
    }
    async updateExpense({ userId }, params, body) {
        const expense = await this.expenseService.updateExpense(params.id, body, userId);
        return ExpensePresenter.toExpenseDTO(expense);
    }
    async deleteExpense({ userId }, params) {
        return this.expenseService.deleteExpense(params.id, userId);
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
        res.setHeader("X-Total-Count", totalCount);
        return expenses.map((expense) => ExpensePresenter.toSharedExpenseDTO(expense, userId));
    }
};
__decorate([
    UseInterceptors(CurrentUserInterceptor),
    Post(),
    __param(0, Request()),
    __param(1, Body(new ZodValidationPipe(createExpenseSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "createExpense", null);
__decorate([
    UseInterceptors(CurrentUserInterceptor),
    Get("/personal"),
    __param(0, Request()),
    __param(1, Query(new ZodValidationPipe(queryExpenseSchema))),
    __param(2, Response({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "getPersonalExpenses", null);
__decorate([
    UseInterceptors(CurrentUserInterceptor),
    Put(":id"),
    __param(0, Request()),
    __param(1, Param(new ZodValidationPipe(expenseByIdSchema))),
    __param(2, Body(new ZodValidationPipe(updateExpenseSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "updateExpense", null);
__decorate([
    UseInterceptors(CurrentUserInterceptor),
    HttpCode(204),
    Delete(":id"),
    __param(0, Request()),
    __param(1, Param(new ZodValidationPipe(expenseByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "deleteExpense", null);
__decorate([
    UseInterceptors(CurrentUserInterceptor),
    Get("/shared"),
    __param(0, Request()),
    __param(1, Query(new ZodValidationPipe(queryExpenseSchema))),
    __param(2, Response({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "getSharedExpenses", null);
ExpenseController = __decorate([
    Controller("expenses"),
    __metadata("design:paramtypes", [ExpenseService])
], ExpenseController);
export { ExpenseController };
//# sourceMappingURL=expense.controller.js.map