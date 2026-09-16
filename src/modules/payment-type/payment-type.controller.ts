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
import { PaymentTypePresenter } from "../../infra/http/presenters/paymentType.presenter.js"
import {
	CreatePaymentTypeDTO,
	createPaymentTypeSchema,
	ListPaymentTypesDTO,
	listPaymentTypesSchema,
	PaymentTypeByIdDTO,
	PaymentTypeDTO,
	paymentTypeByIdSchema
} from "./payment-type.dto.js"
import { PaymentTypeService } from "./payment-type.service.js"

@Controller("paymentType")
export class PaymentTypeController {
	constructor(private readonly paymentTypeService: PaymentTypeService) {}

	/**
	 * Lists payment types, optionally paginated.
	 * @param query - Validated query params containing `offset` and `limit` for pagination.
	 * @returns The list of payment types mapped to their HTTP representation.
	 */
	@Get()
	async listPaymentTypes(
		@Query(new ZodValidationPipe(listPaymentTypesSchema))
		query?: ListPaymentTypesDTO
	) {
		const { offset, limit } = query
		const paymentTypes = await this.paymentTypeService.getAll(offset, limit)
		return paymentTypes.map(PaymentTypePresenter.toHttp)
	}

	/**
	 * Retrieves a single payment type by its id.
	 * @param params - Validated route params containing the payment type `id`.
	 * @returns The payment type mapped to its HTTP representation.
	 * @throws {NotFoundException} When no payment type exists with the given id.
	 */
	@Get(":id")
	async getPaymentTypeById(
		@Param(new ZodValidationPipe(paymentTypeByIdSchema))
		params: PaymentTypeByIdDTO
	): Promise<PaymentTypeDTO> {
		const { id } = params
		const paymentType = await this.paymentTypeService.getById(id)
		if (!paymentType) {
			throw new NotFoundException()
		}
		return PaymentTypePresenter.toHttp(paymentType)
	}

	/**
	 * Creates a new payment type, or reactivates a soft-deleted one with the same
	 * description.
	 * @param body - Validated request body containing `description` and `hasStatement`.
	 * @returns The created (or reactivated) payment type mapped to its HTTP representation.
	 */
	@Post()
	async createPaymentType(
		@Body(new ZodValidationPipe(createPaymentTypeSchema))
		body: CreatePaymentTypeDTO
	): Promise<PaymentTypeDTO> {
		const { description, hasStatement } = body
		const paymentType = await this.paymentTypeService.create(
			description,
			hasStatement
		)
		return PaymentTypePresenter.toHttp(paymentType)
	}

	/**
	 * Updates an existing payment type's description and/or `hasStatement` flag.
	 * @param params - Validated route params containing the payment type `id`.
	 * @param body - Validated request body containing the new `description` and `hasStatement`.
	 * @returns The updated payment type mapped to its HTTP representation.
	 * @throws {NotFoundException} If the payment type is not found.
	 * @throws {BadRequestException} If another active payment type already has the same description.
	 */
	@Patch(":id")
	async updatePaymentType(
		@Param(new ZodValidationPipe(paymentTypeByIdSchema))
		params: PaymentTypeByIdDTO,
		@Body(new ZodValidationPipe(createPaymentTypeSchema))
		body: CreatePaymentTypeDTO
	): Promise<PaymentTypeDTO> {
		const { id } = params
		const { description, hasStatement } = body
		const paymentType = await this.paymentTypeService.update(
			id,
			description,
			hasStatement
		)
		return PaymentTypePresenter.toHttp(paymentType)
	}

	/**
	 * Soft-deletes a payment type by id, responding with 204 No Content.
	 * @param params - Validated route params containing the payment type `id`.
	 * @returns Nothing on success; deleting a non-existent payment type is a no-op.
	 */
	@HttpCode(204)
	@Delete(":id")
	async deletePaymentType(
		@Param(new ZodValidationPipe(paymentTypeByIdSchema))
		params: PaymentTypeByIdDTO
	): Promise<void> {
		const { id } = params
		return this.paymentTypeService.delete(id)
	}
}
