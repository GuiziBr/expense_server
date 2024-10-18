import { DatabaseService } from '@/infra/database/database.service'
import { Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { createCategory } from '../test-utils/category.factory'
import { CategoryService } from './category.service'

describe('CategoryService', () => {
  let categoryService: CategoryService
  let databaseService: DatabaseService
  let loggerSpy: ReturnType<typeof vi.spyOn>
  const fakeCategory = createCategory()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: DatabaseService,
          useValue: {
            category: {
              findMany: vi.fn().mockResolvedValue([fakeCategory]),
              findUnique: vi.fn().mockResolvedValue(fakeCategory),
              update: vi.fn().mockResolvedValue(fakeCategory),
              delete: vi.fn(),
              upsert: vi.fn().mockResolvedValue(fakeCategory)
            }
          }
        }
      ]
    }).compile()

    categoryService = module.get<CategoryService>(CategoryService)
    databaseService = module.get<DatabaseService>(DatabaseService)
    loggerSpy = vi.spyOn(Logger.prototype, 'error')
  })

  describe('getAll', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.category, 'findMany').mockRejectedValue(new Error())

      await expect(categoryService.getAll(0,1))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.category.findMany).toBeCalledWith({
        where: { deletedAt: null },
        skip: 0,
        take: 1,
        orderBy: { description: 'asc' }
      })

      expect(loggerSpy).toBeCalledWith('Error - Error - getting all categories')
    })

    it('should return category', async () => {
      const result = await categoryService.getAll(1,2)

      expect(result).toEqual([fakeCategory])

      expect(databaseService.category.findMany).toBeCalledWith({
        where: { deletedAt: null },
        skip: 1,
        take: 2,
        orderBy: { description: 'asc' }
      })
    })
  })

  describe('getById', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.category, 'findUnique').mockRejectedValue(new Error())

      await expect(categoryService.getById('category-id'))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.category.findUnique).toBeCalledWith({
        where: { id: 'category-id', deletedAt: null }
      })

      expect(loggerSpy)
        .toBeCalledWith('Error - Error - getting category by id category-id')
    })

    it('should return category', async () => {
      const result = await categoryService.getById('category-id')

      expect(result).toEqual(fakeCategory)

      expect(databaseService.category.findUnique).toBeCalledWith({
        where: { id: 'category-id', deletedAt: null }
      })
    })
  })

  describe('create', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.category, 'upsert').mockRejectedValue(new Error())

      const description = 'category_description'

      await expect(categoryService.create(description))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.category.upsert).toBeCalledWith({
        where: { description },
        update: { description, deletedAt: null },
        create: { description }
      })

      expect(loggerSpy)
        .toBeCalledWith(`Error - Error - creating category ${description}`)
    })

    it('should return created category', async () => {
      const description = 'category_description'
      const result = await categoryService.create(description)

      expect(result).toEqual(fakeCategory)

      expect(databaseService.category.upsert).toBeCalledWith({
        where: { description },
        update: { description, deletedAt: null },
        create: { description }
      })

      expect(loggerSpy).not.toBeCalled()
    })
  })

  describe('update', () => {
    it('should throw category not found exception', async () => {
      vi.spyOn(databaseService.category, 'findUnique').mockResolvedValue(null)

      await expect(categoryService.update('category-id', 'updated-category'))
        .rejects
        .toThrow('Category not found')

      expect(databaseService.category.findUnique).toBeCalledWith({
        where: { id: 'category-id' }
      })

      expect(databaseService.category.findUnique).toBeCalledWith({
        where: { description: 'updated-category' }
      })

      expect(loggerSpy).toBeCalledWith('Category category-id not found')
    })

    it('should return updated category', async () => {
      const result = await categoryService.update(
        fakeCategory.id,
        'updated-category',
      )

      expect(result).toEqual(fakeCategory)

      expect(databaseService.category.findUnique).toBeCalledWith({
        where: { id: fakeCategory.id }
      })

      expect(databaseService.category.findUnique).toBeCalledWith({
        where: { description: 'updated-category' }
      })

      expect(databaseService.category.update).toBeCalledWith({
        where: { id: fakeCategory.id },
        data: { description: 'updated-category', deletedAt: null }
      })

      expect(loggerSpy).not.toBeCalled()
    })

    it('should throw category already exists exception', async () => {
      await expect(categoryService.update('category-id', 'updated-category'))
        .rejects
        .toThrow('There is already a category with same description')

      expect(databaseService.category.findUnique).toBeCalledWith({
        where: { id: 'category-id' }
      })

      expect(databaseService.category.findUnique).toBeCalledWith({
        where: { description: 'updated-category' }
      })

      expect(loggerSpy)
        .toBeCalledWith('Category with description "updated-category" already exists')
    })

    it('should reactivate deleted category', async () => {
      const deletedCategory = createCategory({ deletedAt: new Date() })

      vi.spyOn(databaseService.category, 'findUnique')
        .mockResolvedValue(deletedCategory)

      const result = await categoryService.update(
        fakeCategory.id,
        'updated-category'
      )

      expect(result).toEqual(fakeCategory)

      expect(databaseService.category.findUnique).toBeCalledWith({
        where: { id: fakeCategory.id }
      })

      expect(databaseService.category.findUnique).toBeCalledWith({
        where: { description: 'updated-category' }
      })

      expect(databaseService.category.update).toBeCalledWith({
        where: { id: fakeCategory.id },
        data: { deletedAt: expect.any(Date) }
      })

      expect(databaseService.category.update).toBeCalledWith({
        where: { id: deletedCategory.id },
        data: { deletedAt: null }
      })
    })

    it('should throw internal server error exception', async () => {
      vi.spyOn(databaseService.category, 'findUnique').mockRejectedValue(new Error())

      await expect(categoryService.update('category-id', 'updated-category'))
        .rejects
        .toThrow('Internal server error')

      expect(loggerSpy).toBeCalledWith('Error - Error - updating category category-id')
    })
  })
})
