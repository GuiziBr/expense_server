import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CategoryPresenter } from '@/infra/http/presenters/category.presenter'
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
} from '@nestjs/common'
import {
  CategoryByIdDTO,
  categoryByIdSchema,
  CategoryDTO,
  CreateCategoryDTO,
  createCategorySchema,
  listCategoriesSchema,
  ListCategoryDTO
} from './category.dto'
import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async listCategories(
    @Query(new ZodValidationPipe(listCategoriesSchema)) query?: ListCategoryDTO
  ) {
    const { offset, limit } = query
    const categories = await this.categoryService.getAll(offset,limit)
    return categories.map(CategoryPresenter.toHttp)
  }

  @Get(':id')
  async getCategoryById(
    @Param(new ZodValidationPipe(categoryByIdSchema)) params: CategoryByIdDTO
  ): Promise<CategoryByIdDTO>  {
    const { id } = params
    const category = await this.categoryService.getById(id)
    if(!category) {
      throw new NotFoundException()
    }
    return CategoryPresenter.toHttp(category) || null
  }

  @Post()
  async createCategory(
    @Body(new ZodValidationPipe(createCategorySchema)) body: CreateCategoryDTO
  ): Promise<CategoryDTO> {
    const { description } = body
    const category = await this.categoryService.create(description)
    return CategoryPresenter.toHttp(category)
  }

  @Patch(':id')
  async updateCategory(
    @Param(new ZodValidationPipe(categoryByIdSchema)) params: CategoryByIdDTO,
    @Body(new ZodValidationPipe(createCategorySchema)) body: CreateCategoryDTO
  ): Promise<CategoryDTO> {
    const { id } = params
    const { description } = body
    const category = await this.categoryService.update(id, description)
    return CategoryPresenter.toHttp(category)
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteCategory(
    @Param(new ZodValidationPipe(categoryByIdSchema)) params: CategoryByIdDTO
  ): Promise<void> {
    const { id } = params
    return this.categoryService.delete(id)
  }
}
