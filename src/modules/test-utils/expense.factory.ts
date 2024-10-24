import { Expense } from '@/domains/expense.domain'
import { faker } from '@faker-js/faker'

export const createExpense = (params: Partial<Expense> = {}): Expense => ({
  id: faker.string.uuid(),
  description: faker.lorem.word(),
  date: new Date(),
  amount: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  split: false,
  personal: false,
  dueDate: new Date(),
  ownerId: faker.string.uuid(),
  categoryId: faker.string.uuid(),
  paymentTypeId: faker.string.uuid(),
  bankId: faker.string.uuid(),
  storeId: faker.string.uuid(),
  createdAt: new Date(),
  updatedAt: null,
  deletedAt: null,
  category: {
    id: faker.string.uuid(),
    description: faker.lorem.word(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null
  },
  paymentType: {
    id: faker.string.uuid(),
    description: faker.lorem.word(),
    hasStatement: false,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null
  },
  bank: {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null
  },
  store: {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null
  },
  ...params
})
