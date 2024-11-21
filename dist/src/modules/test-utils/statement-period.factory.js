"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStatementPeriod = void 0;
const faker_1 = require("@faker-js/faker");
const createStatementPeriod = (params = {}) => ({
    id: faker_1.faker.string.uuid(),
    userId: faker_1.faker.string.uuid(),
    paymentTypeId: faker_1.faker.string.uuid(),
    bankId: faker_1.faker.string.uuid(),
    initialDay: faker_1.faker.number.int({ min: 1, max: 3 }).toString(),
    finalDay: faker_1.faker.number.int({ min: 1, max: 3 }).toString(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    ...params
});
exports.createStatementPeriod = createStatementPeriod;
//# sourceMappingURL=statement-period.factory.js.map