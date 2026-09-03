import { faker } from "@faker-js/faker";
export const createCategory = (params = {}) => ({
    id: faker.string.uuid(),
    description: faker.lorem.word(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    ...params
});
//# sourceMappingURL=category.factory.js.map