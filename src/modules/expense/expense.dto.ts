import { Expense } from '@/domains/expense.domain'
import { z } from 'zod'

export const createExpenseSchema = z.object({
  description: z.string(),
  date: z.coerce.date(),
  amount: z.number(),
  category_id: z.string(),
  payment_type_id: z.string(),
  bank_id: z.string().optional(),
  store_id: z.string().optional(),
  personal: z.boolean(),
  split: z.boolean()
})

export type CreateExpenseDTO = z.infer<typeof createExpenseSchema>


export interface ExpenseDTO {
  id: string
  description: string
  date: Date
  amount: number
  category_id: string
  payment_type_id: string
  bank_id: string
  store_id: string,
  category: {
    description: string
  }
  payment_type: {
    description: string
  }
  bank?: {
    name: string
  }
  store?: {
    name: string
  }
  personal: boolean
  split: boolean
  due_date: Date
  owner_id: string
  created_at: Date
}

export const queryExpenseSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().default(() => new Date()).optional(),
  offset: z.coerce.number().min(0).default(0).optional(),
  limit: z.coerce.number().min(1).optional(),
  orderBy: z.enum([
    'description',
    'amount',
    'date',
    'dueDate',
    'category',
    'payment_type',
    'bank',
    'store'
  ]).optional(),
  orderType: z.enum(['asc', 'desc']).optional().default('asc').optional(),
  filterBy: z.enum(['category', 'payment_type', 'bank', 'store']).optional(),
  filterValue: z.string().optional()

})

export type QueryExpenseDTO = z.infer<typeof queryExpenseSchema>

export type OrderByType = 'asc' | 'desc'

export interface GetExpensesRequest {
  ownerId: string
  startDate?: Date
  endDate: Date
  offset?: number
  limit?: number
  orderBy?: string
  orderType?: OrderByType
  filterBy?: string
  filterValue?: string
}

export interface GetExpensesResponse {
  expenses: Expense[]
  totalCount: number
}
