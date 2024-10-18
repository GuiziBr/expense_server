import { Category } from '@/domains/category.domain'
import { CategoryDTO } from '@/modules/category/category.dto'

export class CategoryPresenter {
  static toHttp(category: Category): CategoryDTO {
    return {
      id: category.id,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    }
  }
}
