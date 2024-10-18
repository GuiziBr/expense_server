import { Bank } from '@/domains/bank.domain'
import { faker } from '@faker-js/faker'

export const createBank = (params: Partial<Bank> = {}): Bank => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...params
})
