import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query
} from "@nestjs/common"
import { ZodValidationPipe } from "../../infra/http/pipes/zod-validation-pipe.js"
import { CategoryPresenter } from "../../infra/http/presenters/category.presenter.js"
import {
	CategoryByIdDTO,
	CategoryDTO,
	CreateCategoryDTO,
	categoryByIdSchema,
	createCategorySchema,
	ListCategoryDTO,
	listCategoriesSchema
} from "./category.dto.js"
import { CategoryService } from "./category.service.js"

@Controller("categories")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	/**
	 * Lists categories, optionally paginated.
	 * @param query - Validated query params containing `offset` and `limit` for pagination.
	 * @returns The list of categories mapped to their HTTP representation.
	 */
	@Get()
	async listCategories(
		@Query(new ZodValidationPipe(listCategoriesSchema)) query?: ListCategoryDTO
	) {
		const { offset, limit } = query
		const categories = await this.categoryService.getAll(offset, limit)
		return categories.map(CategoryPresenter.toHttp)
	}

	/**
	 * Retrieves a single category by its id.
	 * @param params - Validated route params containing the category `id`.
	 * @returns The category mapped to its HTTP representation.
	 * @throws {NotFoundException} When no category exists with the given id.
	 */
	@Get(":id")
	async getCategoryById(
		@Param(new ZodValidationPipe(categoryByIdSchema)) params: CategoryByIdDTO
	): Promise<CategoryByIdDTO> {
		const { id } = params
		const category = await this.categoryService.getById(id)
		if (!category) {
			throw new NotFoundException()
		}
		return CategoryPresenter.toHttp(category) || null
	}

	/**
	 * Creates a new category, or reactivates a soft-deleted one with the same description.
	 * @param body - Validated request body containing the category `description`.
	 * @returns The created (or reactivated) category mapped to its HTTP representation.
	 */
	@Post()
	async createCategory(
		@Body(new ZodValidationPipe(createCategorySchema)) body: CreateCategoryDTO
	): Promise<CategoryDTO> {
		const { description } = body
		const category = await this.categoryService.create(description)
		return CategoryPresenter.toHttp(category)
	}

	/**
	 * Updates an existing category's description.
	 * @param params - Validated route params containing the category `id`.
	 * @param body - Validated request body containing the new `description`.
	 * @returns The updated category mapped to its HTTP representation.
	 * @throws {AppError} With status 404 if the category is not found, or 400 if another
	 * active category already has the same description.
	 */
	@Patch(":id")
	async updateCategory(
		@Param(new ZodValidationPipe(categoryByIdSchema)) params: CategoryByIdDTO,
		@Body(new ZodValidationPipe(createCategorySchema)) body: CreateCategoryDTO
	): Promise<CategoryDTO> {
		const { id } = params
		const { description } = body
		const category = await this.categoryService.update(id, description)
		return CategoryPresenter.toHttp(category)
	}

	/**
	 * Soft-deletes a category by id, responding with 204 No Content.
	 * @param params - Validated route params containing the category `id`.
	 * @returns Nothing on success; deleting a non-existent category is a no-op.
	 */
	@HttpCode(204)
	@Delete(":id")
	async deleteCategory(
		@Param(new ZodValidationPipe(categoryByIdSchema)) params: CategoryByIdDTO
	): Promise<void> {
		const { id } = params
		return this.categoryService.delete(id)
	}
}
