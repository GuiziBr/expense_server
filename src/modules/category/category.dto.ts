import { Category } from '@/domains/category.domain'
import { z } from 'zod'

export interface CategoryDTO extends Omit<Category, 'deletedAt'> {}

export const listCategoriesSchema = z.object({
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(1).max(20).default(20)
})

export type ListCategoryDTO = z.infer<typeof listCategoriesSchema>

export const categoryByIdSchema = z.object({
  id: z.string().uuid()
})

export type CategoryByIdDTO = z.infer<typeof categoryByIdSchema>

export const createCategorySchema = z.object({
  description: z.string()
})

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>
