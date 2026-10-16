import { NotFoundException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { Response } from "express"
import { CurrentUserInterceptor } from "@/infra/auth/current-user.interceptor.js"
import { createCategory } from "../test-utils/category.factory.js"
import { CategoryController } from "./category.controller.js"
import { CategoryService } from "./category.service.js"

describe("CategoryController", () => {
	let categoryController: CategoryController
	let categoryService: CategoryService
	const fakeCategory = createCategory()

	const res = { setHeader: vi.fn() } as unknown as Response

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [CategoryController],
			providers: [
				{
					provide: CategoryService,
					useValue: {
						getAll: vi
							.fn()
							.mockResolvedValue({ categories: [fakeCategory], totalCount: 1 }),
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

	describe("listCategories", () => {
		it("should return list of categories", async () => {
			const result = await categoryController.listCategories(
				{ offset: 0, limit: 10 },
				res
			)

			expect(result).toHaveLength(1)

			expect(result[0]).toEqual({
				id: fakeCategory.id,
				description: fakeCategory.description,
				created_at: fakeCategory.createdAt,
				updated_at: fakeCategory.updatedAt
			})

			expect(categoryService.getAll).toBeCalledWith(0, 10)
			expect(res.setHeader).toBeCalledWith("X-Total-Count", 1)
		})
	})

	describe("getCategory", () => {
		it("should return bank", async () => {
			const result = await categoryController.getCategoryById({ id: "id" })

			expect(result).toEqual({
				id: fakeCategory.id,
				description: fakeCategory.description,
				created_at: fakeCategory.createdAt,
				updated_at: fakeCategory.updatedAt
			})

			expect(categoryService.getById).toBeCalledWith("id")
		})

		it("should throw NotFoundException when category does not exist", async () => {
			vi.spyOn(categoryService, "getById").mockResolvedValue(null)

			await expect(
				categoryController.getCategoryById({ id: "id" })
			).rejects.toThrow(NotFoundException)
		})
	})

	describe("createCategory", () => {
		it("should return created category", async () => {
			const result = await categoryController.createCategory({
				description: "description"
			})

			expect(result).toEqual({
				id: fakeCategory.id,
				description: fakeCategory.description,
				created_at: fakeCategory.createdAt,
				updated_at: fakeCategory.updatedAt
			})

			expect(categoryService.create).toBeCalledWith("description")
		})
	})

	describe("updateCategory", () => {
		it("should return updated category", async () => {
			const result = await categoryController.updateCategory(
				{
					id: "category-id"
				},
				{
					description: "new-description"
				}
			)

			expect(result).toEqual({
				id: fakeCategory.id,
				description: fakeCategory.description,
				created_at: fakeCategory.createdAt,
				updated_at: fakeCategory.updatedAt
			})

			expect(categoryService.update).toBeCalledWith(
				"category-id",
				"new-description"
			)
		})
	})

	describe("deleteCategory", () => {
		it("should delete category", async () => {
			await categoryController.deleteCategory({ id: "id" })
			expect(categoryService.delete).toBeCalledWith("id")
		})
	})
})
