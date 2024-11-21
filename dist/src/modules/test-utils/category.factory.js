"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const faker_1 = require("@faker-js/faker");
const createCategory = (params = {}) => ({
    id: faker_1.faker.string.uuid(),
    description: faker_1.faker.lorem.word(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    ...params
});
exports.createCategory = createCategory;
//# sourceMappingURL=category.factory.js.map