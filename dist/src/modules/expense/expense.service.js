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
var ExpenseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const database_service_1 = require("../../infra/database/database.service");
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const date_fns_1 = require("date-fns");
const payment_type_service_1 = require("../payment-type/payment-type.service");
const statement_period_service_1 = require("../statement-period/statement-period.service");
const appError_1 = require("../utils/appError");
const constants_1 = require("../utils/constants");
let ExpenseService = ExpenseService_1 = class ExpenseService {
    constructor(databaseService, paymentTypeService, statementPeriodService) {
        this.databaseService = databaseService;
        this.paymentTypeService = paymentTypeService;
        this.statementPeriodService = statementPeriodService;
        this.logger = new common_1.Logger(ExpenseService_1.name);
    }
    calculateNetAmount(amount, personal, split) {
        return personal ? amount : (split ? Math.round(amount / 2) : amount);
    }
    getOrderByClause(orderBy, orderType = 'asc') {
        const orderByColumn = constants_1.constants.orderColumns[orderBy] || constants_1.constants.orderColumns.date;
        const orderByClause = typeof orderByColumn === 'string'
            ? { [orderByColumn]: orderType }
            : {
                [orderByColumn[0].split('.')[0]]: {
                    [orderByColumn[0].split('.')[1]]: orderType
                }
            };
        return orderByClause;
    }
    async calculateDueDate(transactionDate, paymentTypeId, userId, bankId) {
        const paymentType = await this.paymentTypeService.getById(paymentTypeId);
        if (!paymentType?.hasStatement) {
            return (0, date_fns_1.addMonths)(transactionDate, 1);
        }
        if (paymentType?.hasStatement && !bankId) {
            throw new appError_1.default('This payment type must have a bank');
        }
        const statementPeriod = await this.statementPeriodService.findByUserAndBank(userId, bankId, paymentTypeId);
        if (!statementPeriod) {
            throw new appError_1.default('No statement period for provided payment type and bank was found');
        }
        const { initialDay, finalDay } = statementPeriod;
        const lastDayOfMonth = (0, date_fns_1.endOfMonth)(transactionDate).getDate();
        const transactionNextMonth = (0, date_fns_1.getMonth)(transactionDate) + 1;
        const statementInitialDate = (0, date_fns_1.setDate)(transactionDate, Number(initialDay));
        return transactionDate < statementInitialDate
            ? (0, date_fns_1.setDate)(transactionDate, Number(lastDayOfMonth))
            : new Date((0, date_fns_1.getYear)(transactionDate), transactionNextMonth, Number(finalDay) + 1);
    }
    async createExpense(data, userId) {
        if ((0, date_fns_1.isFuture)(data.date))
            throw new appError_1.default('Date must not be in the future', 400);
        try {
            const netAmount = this.calculateNetAmount(data.amount, data.personal, data.split);
            const dueDate = await this.calculateDueDate(data.date, data.payment_type_id, userId, data.bank_id);
            const expense = await this.databaseService.expense.create({
                data: {
                    ownerId: userId,
                    description: data.description,
                    date: data.date,
                    amount: netAmount,
                    categoryId: data.category_id,
                    personal: data.personal || false,
                    split: data.personal ? false : (data.split || false),
                    paymentTypeId: data.payment_type_id,
                    bankId: data.bank_id,
                    storeId: data.store_id,
                    dueDate
                },
                include: {
                    category: true,
                    paymentType: true,
                    bank: true,
                    store: true
                }
            });
            return expense;
        }
        catch (error) {
            if (error instanceof appError_1.default) {
                throw error;
            }
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                this.logger.error(`Error - ${error.code || error} - creating expense`);
                if (error.code === constants_1.constants.FOREIGN_KEY_VIOLATION) {
                    const dbField = error.meta.field_name;
                    const fieldName = dbField.split('_')[1];
                    const errorMessage = constants_1.constants.foreignKeyMessages[fieldName];
                    throw new appError_1.default(errorMessage, 400);
                }
                if (error.code === constants_1.constants.UNIQUE_CONSTRAINT_VIOLATION) {
                    throw new appError_1.default(constants_1.constants.uniqueConstraintMessages.duplicatedExpenses, 400);
                }
            }
            this.logger.error(`Error - ${error.message || error} - creating expense`);
            throw new appError_1.default('Internal server error', 500);
        }
    }
    async getPersonalExpenses({ ownerId, startDate, endDate, offset, limit, orderBy, orderType, filterBy, filterValue }) {
        const whereClause = {
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
            whereClause[constants_1.constants.filterColumns[filterBy]] = filterValue;
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
            personal: false,
            dueDate: {
                lte: endDate,
                ...(startDate ? { gte: startDate } : {})
            }
        };
        if (filterBy && filterValue) {
            whereClause[constants_1.constants.filterColumns[filterBy]] = filterValue;
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
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = ExpenseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        payment_type_service_1.PaymentTypeService,
        statement_period_service_1.StatementPeriodService])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map