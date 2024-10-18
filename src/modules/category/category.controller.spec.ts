import { CurrentUserInterceptor } from '@/infra/auth/current-user.interceptor'
import { Test } from '@nestjs/testing'
import { createCategory } from '../test-utils/category.factory'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

describe('CategoryController', () => {
  let categoryController: CategoryController
  let categoryService: CategoryService
  const fakeCategory = createCategory()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getAll: vi.fn().mockResolvedValue([fakeCategory]),
            getById: vi.fn().mockResolvedValue(fakeCategory),
            create: vi.fn().mockResolvedValue(fakeCategory),
            update: vi.fn().mockResolvedValue(fakeCategory),
            delete: vi.fn()
          }
        }
      ]
    })
      .overrideInterceptor(CurrentUserInterceptor)
      .useValue({})
      .compile()

    categoryController = module.get(CategoryController)
    categoryService = module.get(CategoryService)
  })

  describe('listCategories', () => {
    it('should return list of categories', async () => {
      const result = await categoryController.listCategories(
        { offset: 0, limit: 10 }
      )

      expect(result).toHaveLength(1)

      expect(result[0]).toEqual({
        id: fakeCategory.id,
        description: fakeCategory.description,
        createdAt: fakeCategory.createdAt,
        updatedAt: fakeCategory.updatedAt
      })

      expect(categoryService.getAll).toBeCalledWith(0,10)

    })
  })

  describe('getCategory', () => {
    it('should return bank', async () => {
      const result = await categoryController.getCategoryById({ id: 'id' })

      expect(result).toEqual({
        id: fakeCategory.id,
        description: fakeCategory.description,
        createdAt: fakeCategory.createdAt,
        updatedAt: fakeCategory.updatedAt
      })

      expect(categoryService.getById).toBeCalledWith('id')
    })
  })

  describe('createCategory', () => {
    it('should return created category', async () => {
      const result = await categoryController.createCategory({
        description: 'description'
      })

      expect(result).toEqual({
        id: fakeCategory.id,
        description: fakeCategory.description,
        createdAt: fakeCategory.createdAt,
        updatedAt: fakeCategory.updatedAt
      })

      expect(categoryService.create).toBeCalledWith('description')
    })
  })

  describe('updateCategory', () => {
    it('should return updated category', async () => {
      const result = await categoryController.updateCategory({
        id: 'category-id'
      },
      {
        description: 'new-description'
      })

      expect(result).toEqual({
        id: fakeCategory.id,
        description: fakeCategory.description,
        createdAt: fakeCategory.createdAt,
        updatedAt: fakeCategory.updatedAt
      })

      expect(categoryService.update).toBeCalledWith(
        'category-id',
        'new-description',
      )
    })
  })

  describe('deleteCategory', () => {
    it('should delete category', async () => {
      await categoryController.deleteCategory({ id: 'id' })
      expect(categoryService.delete).toBeCalledWith('id')
    })
  })
})
