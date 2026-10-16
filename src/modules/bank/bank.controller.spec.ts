import { NotFoundException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { Response } from "express"
import { CurrentUserInterceptor } from "@/infra/auth/current-user.interceptor.js"
import { createBank } from "../test-utils/bank.factory.js"
import { BankController } from "./bank.controller.js"
import { BankService } from "./bank.service.js"

describe("BankController", () => {
	let bankController: BankController
	let bankService: BankService
	const fakeBank = createBank()

	const res = { setHeader: vi.fn() } as unknown as Response

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [BankController],
			providers: [
				{
					provide: BankService,
					useValue: {
						getAll: vi
							.fn()
							.mockResolvedValue({ banks: [fakeBank], totalCount: 1 }),
						getById: vi.fn().mockResolvedValue(fakeBank),
						create: vi.fn().mockResolvedValue(fakeBank),
						update: vi.fn().mockResolvedValue(fakeBank),
						delete: vi.fn()
					}
				}
			]
		})
			.overrideInterceptor(CurrentUserInterceptor)
			.useValue({})
			.compile()

		bankController = module.get(BankController)
		bankService = module.get(BankService)
	})

	describe("listBanks", () => {
		it("should return list of banks", async () => {
			const result = await bankController.listBanks(
				{ offset: 0, limit: 10, orderBy: "name", orderType: "asc" },
				res
			)

			expect(result).toHaveLength(1)

			expect(result[0]).toEqual({
				id: fakeBank.id,
				name: fakeBank.name,
				created_at: fakeBank.createdAt,
				updated_at: fakeBank.updatedAt
			})

			expect(bankService.getAll).toBeCalledWith(0, 10, "name", "asc")
			expect(res.setHeader).toBeCalledWith("X-Total-Count", 1)
		})
	})

	describe("getBank", () => {
		it("should return bank", async () => {
			const result = await bankController.getBankById({ id: "id" })

			expect(result).toEqual({
				id: fakeBank.id,
				name: fakeBank.name,
				created_at: fakeBank.createdAt,
				updated_at: fakeBank.updatedAt
			})

			expect(bankService.getById).toBeCalledWith("id")
		})

		it("should throw NotFoundException when bank does not exist", async () => {
			vi.spyOn(bankService, "getById").mockResolvedValue(null)

			await expect(bankController.getBankById({ id: "id" })).rejects.toThrow(
				NotFoundException
			)
		})
	})

	describe("createBank", () => {
		it("should return created bank", async () => {
			const result = await bankController.createBank({
				name: "name"
			})

			expect(result).toEqual({
				id: fakeBank.id,
				name: fakeBank.name,
				created_at: fakeBank.createdAt,
				updated_at: fakeBank.updatedAt
			})

			expect(bankService.create).toBeCalledWith("name")
		})
	})

	describe("updateBank", () => {
		it("should return updated bank", async () => {
			const result = await bankController.updateBank(
				{
					id: "bank-id"
				},
				{
					name: "new-name"
				}
			)

			expect(result).toEqual({
				id: fakeBank.id,
				name: fakeBank.name,
				created_at: fakeBank.createdAt,
				updated_at: fakeBank.updatedAt
			})

			expect(bankService.update).toBeCalledWith("bank-id", "new-name")
		})
	})

	describe("deleteBank", () => {
		it("should delete bank", async () => {
			await bankController.deleteBank({ id: "id" })
			expect(bankService.delete).toBeCalledWith("id")
		})
	})
})
