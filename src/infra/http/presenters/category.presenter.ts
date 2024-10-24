import { Category } from '@/domains/category.domain'
import { CategoryDTO } from '@/modules/category/category.dto'

export class CategoryPresenter {
  static toHttp(category: Category): CategoryDTO {
    return {
      id: category.id,
      description: category.description,
      created_at: category.createdAt,
      updated_at: category.updatedAt
    }
  }
}
