import { faker } from "@faker-js/faker";
export const createCategory = (params = {}) => ({
    id: faker.string.uuid(),
    description: faker.lorem.word(),
    isEnvelope: false,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    ...params
});
//# sourceMappingURL=category.factory.js.map