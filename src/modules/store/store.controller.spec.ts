import { NotFoundException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { Response } from "express"
import { CurrentUserInterceptor } from "@/infra/auth/current-user.interceptor.js"
import { createStore } from "../test-utils/store.factory.js"
import { StoreController } from "./store.controller.js"
import { StoreService } from "./store.service.js"

describe("StoreController", () => {
	let storeController: StoreController
	let storeService: StoreService
	const fakeStore = createStore()

	const res = { setHeader: vi.fn() } as unknown as Response

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [StoreController],
			providers: [
				{
					provide: StoreService,
					useValue: {
						getAll: vi
							.fn()
							.mockResolvedValue({ stores: [fakeStore], totalCount: 1 }),
						getById: vi.fn().mockResolvedValue(fakeStore),
						create: vi.fn().mockResolvedValue(fakeStore),
						update: vi.fn().mockResolvedValue(fakeStore),
						delete: vi.fn()
					}
				}
			]
		})
			.overrideInterceptor(CurrentUserInterceptor)
			.useValue({})
			.compile()

		storeController = module.get(StoreController)
		storeService = module.get(StoreService)
	})

	describe("listStores", () => {
		it("should return list of stores", async () => {
			const result = await storeController.listStores(
				{ offset: 0, limit: 10 },
				res
			)

			expect(result).toHaveLength(1)

			expect(result[0]).toEqual({
				id: fakeStore.id,
				name: fakeStore.name,
				created_at: fakeStore.createdAt,
				updated_at: fakeStore.updatedAt
			})

			expect(storeService.getAll).toBeCalledWith(0, 10)
			expect(res.setHeader).toBeCalledWith("X-Total-Count", 1)
		})
	})

	describe("getStore", () => {
		it("should return store", async () => {
			const result = await storeController.getStoreById({ id: "id" })

			expect(result).toEqual({
				id: fakeStore.id,
				name: fakeStore.name,
				created_at: fakeStore.createdAt,
				updated_at: fakeStore.updatedAt
			})

			expect(storeService.getById).toBeCalledWith("id")
		})

		it("should throw NotFoundException when store does not exist", async () => {
			vi.spyOn(storeService, "getById").mockResolvedValue(null)

			await expect(storeController.getStoreById({ id: "id" })).rejects.toThrow(
				NotFoundException
			)
		})
	})

	describe("createStore", () => {
		it("should return created store", async () => {
			const result = await storeController.createStore({
				name: "name"
			})

			expect(result).toEqual({
				id: fakeStore.id,
				name: fakeStore.name,
				created_at: fakeStore.createdAt,
				updated_at: fakeStore.updatedAt
			})

			expect(storeService.create).toBeCalledWith("name")
		})
	})

	describe("updateStore", () => {
		it("should return updated store", async () => {
			const result = await storeController.updateStore(
				{
					id: "store-id"
				},
				{
					name: "new-name"
				}
			)

			expect(result).toEqual({
				id: fakeStore.id,
				name: fakeStore.name,
				created_at: fakeStore.createdAt,
				updated_at: fakeStore.updatedAt
			})

			expect(storeService.update).toBeCalledWith("store-id", "new-name")
		})
	})

	describe("deleteStore", () => {
		it("should delete store", async () => {
			await storeController.deleteStore({ id: "id" })
			expect(storeService.delete).toBeCalledWith("id")
		})
	})
})
