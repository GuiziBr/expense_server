import { faker } from "@faker-js/faker";
export const createBank = (params = {}) => ({
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    ...params
});
//# sourceMappingURL=bank.factory.js.map