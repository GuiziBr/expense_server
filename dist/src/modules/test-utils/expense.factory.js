"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpense = void 0;
const faker_1 = require("@faker-js/faker");
const category_factory_1 = require("./category.factory");
const payment_type_factory_1 = require("./payment-type.factory");
const bank_factory_1 = require("./bank.factory");
const store_factory_1 = require("./store.factory");
const createExpense = (params = {}) => {
    const category = (0, category_factory_1.createCategory)();
    const paymentType = (0, payment_type_factory_1.createPaymentType)();
    const bank = (0, bank_factory_1.createBank)();
    const store = (0, store_factory_1.createStore)();
    return {
        id: faker_1.faker.string.uuid(),
        description: faker_1.faker.lorem.word(),
        date: new Date(),
        amount: faker_1.faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
        split: false,
        personal: false,
        dueDate: new Date(),
        ownerId: faker_1.faker.string.uuid(),
        categoryId: category.id,
        paymentTypeId: paymentType.id,
        bankId: bank.id,
        storeId: store.id,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        category,
        paymentType: paymentType,
        bank,
        store,
        user: {
            id: faker_1.faker.string.uuid(),
            name: faker_1.faker.lorem.word(),
            createdAt: new Date(),
            updatedAt: null,
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
            avatar: faker_1.faker.image.avatar()
        },
        ...params
    };
};
exports.createExpense = createExpense;
//# sourceMappingURL=expense.factory.js.map