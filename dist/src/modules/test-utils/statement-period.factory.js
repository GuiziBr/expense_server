import { faker } from "@faker-js/faker";
export const createStatementPeriod = (params = {}) => ({
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    paymentTypeId: faker.string.uuid(),
    bankId: faker.string.uuid(),
    initialDay: faker.number.int({ min: 1, max: 3 }).toString(),
    finalDay: faker.number.int({ min: 1, max: 3 }).toString(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    ...params
});
//# sourceMappingURL=statement-period.factory.js.map