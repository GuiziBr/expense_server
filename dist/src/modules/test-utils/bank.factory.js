"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBank = void 0;
const faker_1 = require("@faker-js/faker");
const createBank = (params = {}) => ({
    id: faker_1.faker.string.uuid(),
    name: faker_1.faker.lorem.word(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    ...params
});
exports.createBank = createBank;
//# sourceMappingURL=bank.factory.js.map