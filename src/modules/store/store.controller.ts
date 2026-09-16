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
import { StorePresenter } from "../../infra/http/presenters/store.presenter.js"
import {
	CreateStoreDTO,
	createStoreSchema,
	ListStoreDTO,
	listStoresSchema,
	StoreByIdDTO,
	StoreDTO,
	storeByIdSchema
} from "./store.dto.js"
import { StoreService } from "./store.service.js"

@Controller("stores")
export class StoreController {
	constructor(private readonly storeService: StoreService) {}

	/**
	 * Lists stores, ordered by name ascending, excluding soft-deleted records.
	 * @param query - Optional pagination query, validated against `listStoresSchema` (`offset`, `limit`).
	 * @returns The list of stores mapped to their HTTP representation.
	 */
	@Get()
	async listStores(
		@Query(new ZodValidationPipe(listStoresSchema)) query?: ListStoreDTO
	) {
		const { offset, limit } = query
		const stores = await this.storeService.getAll(offset, limit)
		return stores.map(StorePresenter.toHttp)
	}

	/**
	 * Retrieves a single store by its id.
	 * @param params - Route params validated against `storeByIdSchema` (`id`).
	 * @returns The store mapped to its HTTP representation.
	 * @throws NotFoundException if no store with the given id exists (or it was soft-deleted).
	 */
	@Get(":id")
	async getStoreById(
		@Param(new ZodValidationPipe(storeByIdSchema)) params: StoreByIdDTO
	): Promise<StoreByIdDTO> {
		const { id } = params
		const store = await this.storeService.getById(id)
		if (!store) {
			throw new NotFoundException()
		}
		return StorePresenter.toHttp(store) || null
	}

	/**
	 * Creates a new store, or reactivates a soft-deleted store with the same name.
	 * @param body - Request body validated against `createStoreSchema` (`name`).
	 * @returns The created (or reactivated) store mapped to its HTTP representation.
	 */
	@Post()
	async createStore(
		@Body(new ZodValidationPipe(createStoreSchema)) body: CreateStoreDTO
	): Promise<StoreDTO> {
		const { name } = body
		const store = await this.storeService.create(name)
		return StorePresenter.toHttp(store)
	}

	/**
	 * Updates a store's name.
	 * @param params - Route params validated against `storeByIdSchema` (`id`).
	 * @param body - Request body validated against `createStoreSchema` (`name`).
	 * @returns The updated store mapped to its HTTP representation.
	 * @throws {NotFoundException} If the store does not exist.
	 * @throws {BadRequestException} If another active store already uses the requested name.
	 */
	@Patch(":id")
	async updateStore(
		@Param(new ZodValidationPipe(storeByIdSchema)) params: StoreByIdDTO,
		@Body(new ZodValidationPipe(createStoreSchema)) body: CreateStoreDTO
	): Promise<StoreDTO> {
		const { id } = params
		const { name } = body
		const store = await this.storeService.update(id, name)
		return StorePresenter.toHttp(store)
	}

	/**
	 * Soft-deletes a store by setting its `deletedAt` timestamp.
	 * @param params - Route params validated against `storeByIdSchema` (`id`).
	 * @returns Nothing; responds with HTTP 204 on success.
	 */
	@HttpCode(204)
	@Delete(":id")
	async deleteStore(
		@Param(new ZodValidationPipe(storeByIdSchema)) params: StoreByIdDTO
	): Promise<void> {
		const { id } = params
		return this.storeService.delete(id)
	}
}
