var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ExpenseService_1;
import { Injectable, Logger } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { addMonths, endOfMonth, getMonth, getYear, isFuture, setDate } from "date-fns";
import { DatabaseService } from "../../infra/database/database.service.js";
import { PaymentTypeService } from "../payment-type/payment-type.service.js";
import { StatementPeriodService } from "../statement-period/statement-period.service.js";
import AppError from "../utils/appError.js";
import { constants } from "../utils/constants.js";
let ExpenseService = ExpenseService_1 = class ExpenseService {
    databaseService;
    paymentTypeService;
    statementPeriodService;
    logger = new Logger(ExpenseService_1.name);
    constructor(databaseService, paymentTypeService, statementPeriodService) {
        this.databaseService = databaseService;
        this.paymentTypeService = paymentTypeService;
        this.statementPeriodService = statementPeriodService;
    }
    calculateNetAmount(amount, personal, split) {
        const amountInCents = amount * 100;
        return personal
            ? amountInCents
            : split
                ? Math.round(amountInCents / 2)
                : amountInCents;
    }
    getOrderByClause(orderBy, orderType = "asc") {
        const orderByColumn = constants.orderColumns[orderBy] || constants.orderColumns.date;
        const orderByClause = typeof orderByColumn === "string"
            ? { [orderByColumn]: orderType }
            : {
                [orderByColumn[0].split(".")[0]]: {
                    [orderByColumn[0].split(".")[1]]: orderType
                }
            };
        return orderByClause;
    }
    async calculateDueDate(transactionDate, paymentTypeId, userId, bankId, currentMonth) {
        const paymentType = await this.paymentTypeService.getById(paymentTypeId);
        if (!paymentType?.hasStatement) {
            const referenceDate = currentMonth
                ? transactionDate
                : addMonths(transactionDate, 1);
            return endOfMonth(referenceDate);
        }
        if (paymentType?.hasStatement && !bankId) {
            throw new AppError("This payment type must have a bank");
        }
        const statementPeriod = await this.statementPeriodService.findByUserAndBank(userId, bankId, paymentTypeId);
        if (!statementPeriod) {
            throw new AppError("No statement period for provided payment type and bank was found");
        }
        const { initialDay, finalDay } = statementPeriod;
        const lastDayOfMonth = endOfMonth(transactionDate).getDate();
        const transactionNextMonth = getMonth(transactionDate) + 1;
        const statementInitialDate = setDate(transactionDate, Number(initialDay));
        return transactionDate < statementInitialDate
            ? setDate(transactionDate, Number(lastDayOfMonth))
            : new Date(getYear(transactionDate), transactionNextMonth, Number(finalDay) + 1);
    }
    async createExpense(data, userId) {
        if (isFuture(data.date))
            throw new AppError("Date must not be in the future", 400);
        try {
            const netAmount = this.calculateNetAmount(data.amount, data.personal, data.split);
            const dueDate = await this.calculateDueDate(data.date, data.payment_type_id, userId, data.bank_id, data.current_month);
            const expense = await this.databaseService.expense.create({
                data: {
                    ownerId: userId,
                    description: data.description,
                    date: data.date,
                    amount: netAmount,
                    categoryId: data.category_id,
                    personal: data.personal || false,
                    split: data.personal ? false : data.split || false,
                    paymentTypeId: data.payment_type_id,
                    bankId: data.bank_id ?? null,
                    storeId: data.store_id ?? null,
                    dueDate
                },
                include: {
                    category: true,
                    paymentType: true,
                    bank: true,
                    store: true,
                    user: true
                }
            });
            return expense;
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            if (error instanceof PrismaClientKnownRequestError) {
                this.logger.error(`Error - ${error.code || error} - creating expense`);
                if (error.code === constants.FOREIGN_KEY_VIOLATION) {
                    const dbField = error.meta.field_name;
                    const fieldName = dbField.split("_")[1];
                    const errorMessage = constants.foreignKeyMessages[fieldName];
                    throw new AppError(errorMessage, 400);
                }
                if (error.code === constants.UNIQUE_CONSTRAINT_VIOLATION) {
                    throw new AppError(constants.uniqueConstraintMessages.duplicatedExpenses, 400);
                }
            }
            this.logger.error(`Error - ${error instanceof Error ? error.message : error} - creating expense`);
            throw new AppError("Internal server error", 500);
        }
    }
    async updateExpense(id, data, userId) {
        try {
            const expense = await this.databaseService.expense.findFirst({
                where: { id, deletedAt: null }
            });
            if (!expense) {
                throw new AppError("Expense not found", 404);
            }
            if (expense.ownerId !== userId) {
                throw new AppError("Unauthorized", 403);
            }
            if (isFuture(data.date)) {
                throw new AppError("Date must not be in the future", 400);
            }
            const netAmount = this.calculateNetAmount(data.amount, data.personal, data.split);
            const dueDate = await this.calculateDueDate(data.date, data.payment_type_id, userId, data.bank_id, data.current_month);
            const updateExpense = await this.databaseService.$transaction(async (tx) => {
                const current = await tx.expense.findFirst({
                    where: { id, deletedAt: null }
                });
                if (!current) {
                    throw new AppError("Expense not found", 404);
                }
                return tx.expense.update({
                    where: { id },
                    data: {
                        description: data.description,
                        date: data.date,
                        amount: netAmount,
                        categoryId: data.category_id,
                        personal: data.personal || false,
                        split: data.personal ? false : data.split || false,
                        paymentTypeId: data.payment_type_id,
                        bankId: data.bank_id ?? null,
                        storeId: data.store_id ?? null,
                        dueDate
                    },
                    include: {
                        category: true,
                        paymentType: true,
                        bank: true,
                        store: true,
                        user: true
                    }
                });
            });
            return updateExpense;
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            if (error instanceof PrismaClientKnownRequestError) {
                this.logger.error(`Error - ${error.code || error} - updating expense`);
                if (error.code === constants.FOREIGN_KEY_VIOLATION) {
                    const dbField = error.meta.field_name;
                    const fieldName = dbField.split("_")[1];
                    const errorMessage = constants.foreignKeyMessages[fieldName];
                    throw new AppError(errorMessage, 400);
                }
                if (error.code === constants.UNIQUE_CONSTRAINT_VIOLATION) {
                    throw new AppError(constants.uniqueConstraintMessages.duplicatedExpenses, 400);
                }
            }
            this.logger.error(`Error - ${error instanceof Error ? error.message : error} - updating expense ${id}`);
            throw new AppError("Internal server error", 500);
        }
    }
    async deleteExpense(id, userId) {
        const expense = await this.databaseService.expense.findFirst({
            where: { id, deletedAt: null }
        });
        if (!expense) {
            throw new AppError("Expense not found", 404);
        }
        if (expense.ownerId !== userId) {
            throw new AppError("Unauthorized", 403);
        }
        try {
            await this.databaseService.expense.update({
                where: { id },
                data: { deletedAt: new Date() }
            });
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError &&
                error.code === constants.RECORD_NOT_FOUND) {
                return;
            }
            this.logger.error(`Error - ${error instanceof Error ? error.message : error} - deleting expense ${id}`);
            throw new AppError("Internal server error", 500);
        }
    }
    async getPersonalExpenses({ ownerId, startDate, endDate, offset, limit, orderBy, orderType, filterBy, filterValue }) {
        const whereClause = {
            deletedAt: null,
            OR: [
                { AND: [{ ownerId }, { OR: [{ personal: true }, { split: true }] }] },
                { AND: [{ NOT: { ownerId } }, { personal: false }] }
            ],
            dueDate: {
                lte: endDate,
                ...(startDate ? { gte: startDate } : {})
            }
        };
        if (filterBy && filterValue) {
            whereClause[constants.filterColumns[filterBy]] = filterValue;
        }
        const orderByClause = this.getOrderByClause(orderBy, orderType);
        const [expenses, totalCount] = await Promise.all([
            this.databaseService.expense.findMany({
                where: whereClause,
                include: {
                    category: true,
                    paymentType: true,
                    bank: true,
                    store: true,
                    user: true
                },
                orderBy: orderByClause,
                skip: offset,
                take: limit
            }),
            this.databaseService.expense.count({ where: whereClause })
        ]);
        return { expenses, totalCount };
    }
    async getSharedExpenses({ startDate, endDate, offset, limit, orderBy, orderType, filterBy, filterValue }) {
        const whereClause = {
            deletedAt: null,
            personal: false,
            dueDate: {
                lte: endDate,
                ...(startDate ? { gte: startDate } : {})
            }
        };
        if (filterBy && filterValue) {
            whereClause[constants.filterColumns[filterBy]] = filterValue;
        }
        const orderByClause = this.getOrderByClause(orderBy, orderType);
        const [expenses, totalCount] = await Promise.all([
            this.databaseService.expense.findMany({
                where: whereClause,
                include: {
                    category: true,
                    paymentType: true,
                    bank: true,
                    store: true,
                    user: true
                },
                orderBy: orderByClause,
                skip: offset,
                take: limit
            }),
            this.databaseService.expense.count({ where: whereClause })
        ]);
        return { expenses, totalCount };
    }
    async getExpensesByDateRange(personal, startDate, endDate) {
        return this.databaseService.expense.findMany({
            where: {
                deletedAt: null,
                personal,
                dueDate: {
                    lte: endDate,
                    gte: startDate
                },
                paymentType: { deletedAt: null }
            },
            include: {
                category: true,
                paymentType: true,
                bank: true,
                store: true,
                user: true
            }
        });
    }
};
ExpenseService = ExpenseService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DatabaseService,
        PaymentTypeService,
        StatementPeriodService])
], ExpenseService);
export { ExpenseService };
//# sourceMappingURL=expense.service.js.map