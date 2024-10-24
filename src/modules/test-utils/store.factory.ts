import { Store } from '@/domains/store.domain'
import { faker } from '@faker-js/faker'

export const createStore = (params: Partial<Store> = {}): Store => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  createdAt: new Date(),
  updatedAt: null,
  deletedAt: null,
  ...params
})
