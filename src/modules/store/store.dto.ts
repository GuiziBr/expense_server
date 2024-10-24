import { z } from 'zod'

export interface StoreDTO {
  id: string
  name: string
  created_at: Date
  updated_at: Date | null
}

export const listStoresSchema = z.object({
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(1).max(20).default(20)
})

export type ListStoreDTO = z.infer<typeof listStoresSchema>

export const storeByIdSchema = z.object({
  id: z.string().uuid()
})

export type StoreByIdDTO = z.infer<typeof storeByIdSchema>

export const createStoreSchema = z.object({
  name: z.string()
})

export type CreateStoreDTO = z.infer<typeof createStoreSchema>
