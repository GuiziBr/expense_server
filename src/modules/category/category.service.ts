import {
	BadRequestException,
	HttpException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from "@nestjs/common"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { Category } from "../../domains/category.domain.js"
import { DatabaseService } from "../../infra/database/database.service.js"
import { constants } from "../utils/constants.js"

@Injectable()
export class CategoryService {
	private readonly logger = new Logger(CategoryService.name)

	constructor(private readonly databaseService: DatabaseService) {}

	/**
	 * Retrieves all non-deleted categories, ordered by description ascending.
	 * @param offset - Number of records to skip, for pagination.
	 * @param limit - Maximum number of records to return.
	 * @returns The list of matching categories.
	 * @throws {InternalServerErrorException} If the query fails.
	 */
	async getAll(offset?: number, limit?: number): Promise<Category[]> {
		try {
			const categories = await this.databaseService.category.findMany({
				where: { deletedAt: null },
				skip: offset,
				take: limit,
				orderBy: { description: "asc" }
			})
			return categories
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - getting all categories`
			)
			throw new InternalServerErrorException("Internal server error")
		}
	}

	/**
	 * Retrieves a single non-deleted category by its id.
	 * @param id - The category id to look up.
	 * @returns The matching category, or `null` if none is found.
	 * @throws {InternalServerErrorException} If the query fails.
	 */
	async getById(id: string): Promise<Category | null> {
		try {
			const category = await this.databaseService.category.findUnique({
				where: { id, deletedAt: null }
			})
			return category
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - getting category by id ${id}`
			)
			throw new InternalServerErrorException("Internal server error")
		}
	}

	/**
	 * Creates a category with the given description, or, if a soft-deleted category
	 * with the same description already exists, reactivates it (upsert on `description`).
	 * @param description - The category description; must be unique among active categories.
	 * @returns The created or reactivated category.
	 * @throws {InternalServerErrorException} If the operation fails.
	 */
	async create(description: string): Promise<Category> {
		try {
			const category = await this.databaseService.category.upsert({
				where: { description },
				update: { description, deletedAt: null },
				create: { description }
			})
			return category
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - creating category ${description}`
			)
			throw new InternalServerErrorException("Internal server error")
		}
	}

	/**
	 * Updates a category's description. If another category already has the target
	 * description, the update is only allowed when that other category is soft-deleted,
	 * in which case this category is soft-deleted and the other one is reactivated
	 * with the new description via {@link reactivateCategory}.
	 * @param id - The id of the category to update.
	 * @param description - The new description to apply.
	 * @returns The updated (or reactivated) category.
	 * @throws {NotFoundException} If the category is not found.
	 * @throws {BadRequestException} If an active category already has the same description.
	 * @throws {InternalServerErrorException} On unexpected errors.
	 */
	async update(id: string, description: string): Promise<Category> {
		try {
			const [category, sameDescriptionCategory] = await Promise.all([
				this.databaseService.category.findUnique({ where: { id } }),
				this.databaseService.category.findUnique({ where: { description } })
			])

			if (!category) {
				this.logger.error(`Category ${id} not found`)
				throw new NotFoundException("Category not found")
			}

			if (
				(category && !sameDescriptionCategory) ||
				sameDescriptionCategory?.id === id
			) {
				const updatedCategory = await this.databaseService.category.update({
					where: { id },
					data: { description, deletedAt: null }
				})
				return updatedCategory
			}

			if (sameDescriptionCategory) {
				if (!sameDescriptionCategory?.deletedAt) {
					this.logger.error(
						`Category with description "${description}" already exists`
					)
					throw new BadRequestException(
						"There is already a category with same description"
					)
				}
			}

			const reactivatedCategory = await this.reactivateCategory(
				id,
				sameDescriptionCategory.id
			)

			return reactivatedCategory
		} catch (error) {
			if (error instanceof HttpException) {
				throw error
			}
			this.logger.error(
				`Error - ${error.message || error} - updating category ${id}`
			)
			throw new InternalServerErrorException("Internal server error")
		}
	}

	/**
	 * Soft-deletes a category by setting its `deletedAt` timestamp.
	 * Deleting a category that does not exist is treated as a no-op rather than an error.
	 * @param id - The id of the category to delete.
	 * @returns Nothing.
	 * @throws {InternalServerErrorException} If the operation fails for a reason other than
	 * the record not existing.
	 */
	async delete(id: string): Promise<void> {
		try {
			await this.databaseService.category.update({
				where: { id },
				data: { deletedAt: new Date() }
			})
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === constants.RECORD_NOT_FOUND
			) {
				return
			}
			this.logger.error(
				`Error - ${error.message || error} - deleting category ${id}`
			)
			throw new InternalServerErrorException("Internal server error")
		}
	}

	/**
	 * Swaps the soft-delete state of two categories: soft-deletes `categoryIdToDelete`
	 * and reactivates `categoryIdToRestore` (clearing its `deletedAt`), used when
	 * updating a category's description to match a previously soft-deleted one.
	 * @param categoryIdToDelete - The id of the category to soft-delete.
	 * @param categoryIdToRestore - The id of the soft-deleted category to reactivate.
	 * @returns The reactivated category.
	 * @throws {InternalServerErrorException} If the operation fails.
	 */
	private async reactivateCategory(
		categoryIdToDelete: string,
		categoryIdToRestore: string
	): Promise<Category> {
		try {
			const [, reactivatedCategory] = await Promise.all([
				this.delete(categoryIdToDelete),
				this.databaseService.category.update({
					where: { id: categoryIdToRestore },
					data: { deletedAt: null }
				})
			])
			return reactivatedCategory
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - reactivating category ${categoryIdToDelete}`
			)
			throw new InternalServerErrorException("Internal server error")
		}
	}
}
