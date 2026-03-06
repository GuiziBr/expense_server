import { faker } from "@faker-js/faker"
import { PaymentType } from "@/domains/payment-type.domain"

export const createPaymentType = (
	params: Partial<PaymentType> = {}
): PaymentType => ({
	id: faker.string.uuid(),
	description: faker.lorem.word(),
	createdAt: new Date(),
	updatedAt: null,
	deletedAt: null,
	hasStatement: false,
	...params
})
