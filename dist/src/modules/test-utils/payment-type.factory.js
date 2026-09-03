import { faker } from "@faker-js/faker";
export const createPaymentType = (params = {}) => ({
    id: faker.string.uuid(),
    description: faker.lorem.word(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    hasStatement: false,
    ...params
});
//# sourceMappingURL=payment-type.factory.js.map