import { z } from 'zod'

export interface BankDTO {
  id: string
  name: string
  created_at: Date
  updated_at: Date | null
}

export const listBanksSchema = z.object({
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(1).max(20).default(20)
})

export type ListBankDTO = z.infer<typeof listBanksSchema>

export const bankByIdSchema = z.object({
  id: z.string().uuid()
})

export type BankByIdDTO = z.infer<typeof bankByIdSchema>

export const createBankSchema = z.object({
  name: z.string()
})

export type CreateBankDTO = z.infer<typeof createBankSchema>
