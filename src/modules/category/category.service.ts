import { Category } from '@/domains/category.domain'
import { DatabaseService } from '@/infra/database/database.service'
import { Injectable, Logger } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import AppError from '../utils/appError'
import { constants } from '../utils/constants'

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name)

  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async getAll(offset?: number, limit?: number): Promise<Category[]> {
    try {
      const categories = await this.databaseService.category.findMany({
        where: { deletedAt: null },
        skip: offset,
        take: limit,
        orderBy: { description: 'asc' }
      })
      return categories
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - getting all categories`)
      throw new AppError('Internal server error', 500)
    }
  }

  async getById(id: string): Promise<Category | null> {
    try {
      const category = await this.databaseService.category.findUnique(
        { where: { id, deletedAt: null }}
      )
      return category
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - getting category by id ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }

  async create(description: string): Promise<Category> {
    try {
      const category = await this.databaseService.category.upsert({
        where: { description },
        update: { description, deletedAt: null },
        create: { description }
      })
      return category
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - creating category ${description}`)
      throw new AppError('Internal server error', 500)
    }
  }

  async update(
    id: string,
    description: string,
  ): Promise<Category> {
    try {
      const [category, sameDescriptionCategory] = await Promise.all([
        this.databaseService.category.findUnique({ where: { id }}),
        this.databaseService.category.findUnique({ where: { description }})
      ])

      if(!category) {
        this.logger.error(`Category ${id} not found`)
        throw new AppError('Category not found', 404)
      }

      if((category && !sameDescriptionCategory) || (sameDescriptionCategory?.id === id)) {
        const updatedCategory = await this.databaseService.category.update({
          where: { id },
          data: { description, deletedAt: null }
        })
        return updatedCategory
      }

      if(sameDescriptionCategory) {
        if(!sameDescriptionCategory?.deletedAt) {
          this.logger.error(`Category with description "${description}" already exists`)
          throw new AppError('There is already a category with same description', 400)
        }
      }

      const reactivatedCategory = await this.reactivateCategory(
        id,
        sameDescriptionCategory.id
      )

      return reactivatedCategory
    } catch (error) {
      if(error instanceof AppError) {
        throw error
      }
      this.logger.error(`Error - ${error.message || error} - updating category ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.databaseService.category.update({
        where: { id },
        data: { deletedAt: new Date() }
      })
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError
          && error.code === constants.RECORD_NOT_FOUND
      ) {
        return
      }
      this.logger.error(`Error - ${error.message || error} - deleting category ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }

  private async reactivateCategory(
    categoryIdToDelete: string,
    categoryIdToRestore: string
  ): Promise<Category> {
    try {
      const [,reactivatedCategory] = await Promise.all([
        this.delete(categoryIdToDelete),
        this.databaseService.category.update({
          where: { id: categoryIdToRestore },
          data: { deletedAt: null }
        })
      ])
      return reactivatedCategory
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - reactivating category ${categoryIdToDelete}`)
      throw new AppError('Internal server error', 500)
    }
  }
}
