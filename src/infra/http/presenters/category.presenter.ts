import { Category } from "../../../domains/category.domain.js"
import { CategoryDTO } from "../../../modules/category/category.dto.js"

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
