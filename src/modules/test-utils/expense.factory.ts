import { Expense } from '@/domains/expense.domain'
import { faker } from '@faker-js/faker'
import { createCategory } from './category.factory'
import { createPaymentType } from './payment-type.factory'
import { createBank } from './bank.factory'
import { createStore } from './store.factory'

export const createExpense = (params: Partial<Expense> = {}): Expense => {

  const category = createCategory()
  const paymentType = createPaymentType()
  const bank = createBank()
  const store = createStore()

  return {
    id: faker.string.uuid(),
    description: faker.lorem.word(),
    date: new Date(),
    amount: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    split: false,
    personal: false,
    dueDate: new Date(),
    ownerId: faker.string.uuid(),
    categoryId: category.id,
    paymentTypeId: paymentType.id,
    bankId: bank.id,
    storeId: store.id,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    category,
    paymentType: paymentType,
    bank,
    store,
    user: {
      id: faker.string.uuid(),
      name: faker.lorem.word(),
      createdAt: new Date(),
      updatedAt: null,
      email: faker.internet.email(),
      password: faker.internet.password(),
      avatar: faker.image.avatar()
    },
    ...params
  }
}
