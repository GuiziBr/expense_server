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
import { BankPresenter } from "../../infra/http/presenters/bank.presenter.js"
import {
	BankByIdDTO,
	BankDTO,
	bankByIdSchema,
	CreateBankDTO,
	createBankSchema,
	ListBankDTO,
	listBanksSchema
} from "./bank.dto.js"
import { BankService } from "./bank.service.js"

@Controller("banks")
export class BankController {
	constructor(private readonly bankService: BankService) {}

	/**
	 * Lists banks, ordered by name ascending, excluding soft-deleted records.
	 * @param query - Optional pagination query, validated against `listBanksSchema` (`offset`, `limit`).
	 * @returns The list of banks mapped to their HTTP representation.
	 */
	@Get()
	async listBanks(
		@Query(new ZodValidationPipe(listBanksSchema)) query?: ListBankDTO
	) {
		const { offset, limit } = query
		const banks = await this.bankService.getAll(offset, limit)
		return banks.map(BankPresenter.toHttp)
	}

	/**
	 * Retrieves a single bank by its id.
	 * @param params - Route params validated against `bankByIdSchema` (`id`).
	 * @returns The bank mapped to its HTTP representation.
	 * @throws NotFoundException if no bank with the given id exists (or it was soft-deleted).
	 */
	@Get(":id")
	async getBankById(
		@Param(new ZodValidationPipe(bankByIdSchema)) params: BankByIdDTO
	): Promise<BankByIdDTO> {
		const { id } = params
		const bank = await this.bankService.getById(id)
		if (!bank) {
			throw new NotFoundException()
		}
		return BankPresenter.toHttp(bank) || null
	}

	/**
	 * Creates a new bank, or reactivates a soft-deleted bank with the same name.
	 * @param body - Request body validated against `createBankSchema` (`name`).
	 * @returns The created (or reactivated) bank mapped to its HTTP representation.
	 */
	@Post()
	async createBank(
		@Body(new ZodValidationPipe(createBankSchema)) body: CreateBankDTO
	): Promise<BankDTO> {
		const { name } = body
		const bank = await this.bankService.create(name)
		return BankPresenter.toHttp(bank)
	}

	/**
	 * Updates a bank's name.
	 * @param params - Route params validated against `bankByIdSchema` (`id`).
	 * @param body - Request body validated against `createBankSchema` (`name`).
	 * @returns The updated bank mapped to its HTTP representation.
	 * @throws AppError with status 404 if the bank does not exist, or 400 if another
	 * active bank already uses the requested name.
	 */
	@Patch(":id")
	async updateBank(
		@Param(new ZodValidationPipe(bankByIdSchema)) params: BankByIdDTO,
		@Body(new ZodValidationPipe(createBankSchema)) body: CreateBankDTO
	): Promise<BankDTO> {
		const { id } = params
		const { name } = body
		const bank = await this.bankService.update(id, name)
		return BankPresenter.toHttp(bank)
	}

	/**
	 * Soft-deletes a bank by setting its `deletedAt` timestamp.
	 * @param params - Route params validated against `bankByIdSchema` (`id`).
	 * @returns Nothing; responds with HTTP 204 on success.
	 */
	@HttpCode(204)
	@Delete(":id")
	async deleteBank(
		@Param(new ZodValidationPipe(bankByIdSchema)) params: BankByIdDTO
	): Promise<void> {
		const { id } = params
		return this.bankService.delete(id)
	}
}
