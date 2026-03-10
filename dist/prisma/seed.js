"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const users = require('./seed-data/user.json');
const banks = require('./seed-data/bank.json');
const categories = require('./seed-data/category.json');
const paymentTypes = require('./seed-data/payment_type.json');
const stores = require('./seed-data/store.json');
const statementPeriods = require('./seed-data/statement_period.json');
const expenses = require('./seed-data/expense.json');
const toDate = (value) => value ? new Date(value) : null;
async function main() {
    console.log('Seeding users...');
    await prisma.user.createMany({
        data: users.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            password: u.password,
            avatar: u.avatar || null,
            createdAt: new Date(u.created_at),
            updatedAt: toDate(u.updated_at),
        })),
        skipDuplicates: true,
    });
    console.log('Seeding banks...');
    await prisma.bank.createMany({
        data: banks.map((b) => ({
            id: b.id,
            name: b.name,
            createdAt: new Date(b.created_at),
            updatedAt: toDate(b.updated_at),
            deletedAt: toDate(b.deleted_at),
        })),
        skipDuplicates: true,
    });
    console.log('Seeding categories...');
    await prisma.category.createMany({
        data: categories.map((c) => ({
            id: c.id,
            description: c.description,
            createdAt: new Date(c.created_at),
            updatedAt: toDate(c.updated_at),
            deletedAt: toDate(c.deleted_at),
        })),
        skipDuplicates: true,
    });
    console.log('Seeding payment types...');
    await prisma.paymentType.createMany({
        data: paymentTypes.map((p) => ({
            id: p.id,
            description: p.description,
            hasStatement: p.hasStatement,
            createdAt: new Date(p.created_at),
            updatedAt: toDate(p.updated_at),
            deletedAt: toDate(p.deleted_at),
        })),
        skipDuplicates: true,
    });
    console.log('Seeding stores...');
    await prisma.store.createMany({
        data: stores.map((s) => ({
            id: s.id,
            name: s.name,
            createdAt: new Date(s.created_at),
            updatedAt: toDate(s.updated_at),
            deletedAt: toDate(s.deleted_at),
        })),
        skipDuplicates: true,
    });
    console.log('Seeding statement periods...');
    await prisma.statementPeriod.createMany({
        data: statementPeriods.map((sp) => ({
            id: sp.id,
            userId: sp.user_id,
            bankId: sp.bank_id,
            paymentTypeId: sp.payment_type_id,
            initialDay: sp.initial_day,
            finalDay: sp.final_day,
            createdAt: new Date(sp.created_at),
            updatedAt: toDate(sp.updated_at),
            deletedAt: toDate(sp.deleted_at),
        })),
        skipDuplicates: true,
    });
    console.log('Seeding expenses...');
    await prisma.expense.createMany({
        data: expenses.map((e) => ({
            id: e.id,
            description: e.description,
            date: new Date(e.date),
            amount: e.amount,
            split: e.split,
            personal: e.personal,
            dueDate: new Date(e.due_date),
            ownerId: e.owner_id,
            categoryId: e.category_id,
            paymentTypeId: e.payment_type_id,
            bankId: e.bank_id ?? null,
            storeId: e.store_id ?? null,
            createdAt: new Date(e.created_at),
            updatedAt: toDate(e.updated_at),
            deletedAt: toDate(e.deleted_at),
        })),
        skipDuplicates: true,
    });
    console.log('Seeding complete.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exitCode = 1;
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map