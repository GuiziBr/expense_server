import { faker } from "@faker-js/faker"
import { Bank } from "@/domains/bank.domain"

export const createBank = (params: Partial<Bank> = {}): Bank => ({
	id: faker.string.uuid(),
	name: faker.lorem.word(),
	createdAt: new Date(),
	updatedAt: null,
	deletedAt: null,
	...params
})
