"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentType = void 0;
const faker_1 = require("@faker-js/faker");
const createPaymentType = (params = {}) => ({
    id: faker_1.faker.string.uuid(),
    description: faker_1.faker.lorem.word(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    hasStatement: false,
    ...params
});
exports.createPaymentType = createPaymentType;
//# sourceMappingURL=payment-type.factory.js.map