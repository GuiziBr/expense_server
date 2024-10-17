import { PaymentType } from '@/domains/payment-type.domain'
import { faker } from '@faker-js/faker'

export const createPaymentType = (params: Partial<PaymentType> = {}): PaymentType => ({
  id: faker.string.uuid(),
  description: faker.lorem.word(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  hasStatement: false,
  ...params
})
