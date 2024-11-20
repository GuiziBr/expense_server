import { Bank } from './bank.domain'
import { Category } from './category.domain'
import { PaymentType } from './payment-type.domain'
import { Store } from './store.domain'
import { User } from './user.domain'

export interface Expense {
  id: string
  description: string
  date: Date
  amount: number
  split: boolean
  personal: boolean
  dueDate: Date
  ownerId: string
  categoryId: string
  paymentTypeId: string
  bankId: string
  storeId: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null,
  category: Category,
  paymentType: PaymentType,
  bank: Bank,
  store: Store
  user: User
}
