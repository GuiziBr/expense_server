"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
const faker_1 = require("@faker-js/faker");
const createStore = (params = {}) => ({
    id: faker_1.faker.string.uuid(),
    name: faker_1.faker.lorem.word(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    ...params
});
exports.createStore = createStore;
//# sourceMappingURL=store.factory.js.map