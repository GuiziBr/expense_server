import { faker } from "@faker-js/faker"
import { Category } from "@/domains/category.domain"

export const createCategory = (params: Partial<Category> = {}): Category => ({
	id: faker.string.uuid(),
	description: faker.lorem.word(),
	createdAt: new Date(),
	updatedAt: null,
	deletedAt: null,
	...params
})
