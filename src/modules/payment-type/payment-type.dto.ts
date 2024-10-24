import { z } from 'zod'

export interface PaymentTypeDTO {
  id: string
  description: string
  has_statement: boolean
  created_at: Date
  updated_at: Date | null
}

export const listPaymentTypesSchema = z.object({
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(1).max(20).default(20)
})

export type ListPaymentTypesDTO = z.infer<typeof listPaymentTypesSchema>

export const paymentTypeByIdSchema = z.object({
  id: z.string().uuid()
})

export type PaymentTypeByIdDTO = z.infer<typeof paymentTypeByIdSchema>

export const createPaymentTypeSchema = z.object({
  description: z.string(),
  hasStatement: z.boolean()
})

export type CreatePaymentTypeDTO = z.infer<typeof createPaymentTypeSchema>
