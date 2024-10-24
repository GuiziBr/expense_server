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
  store_id: string
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
  updated_at: Date | null
}
