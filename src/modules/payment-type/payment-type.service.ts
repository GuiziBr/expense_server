import { Injectable, Logger } from "@nestjs/common"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { PaymentType } from "../../domains/payment-type.domain.js"
import { DatabaseService } from "../../infra/database/database.service.js"
import AppError from "../utils/appError.js"
import { constants } from "../utils/constants.js"

@Injectable()
export class PaymentTypeService {
	private readonly logger = new Logger(PaymentTypeService.name)
	constructor(private readonly databaseService: DatabaseService) {}

	/**
	 * Retrieves all non-deleted payment types, ordered by description ascending.
	 * @param offset - Number of records to skip, for pagination.
	 * @param limit - Maximum number of records to return.
	 * @returns The list of matching payment types.
	 * @throws {AppError} With status 500 if the query fails.
	 */
	async getAll(offset?: number, limit?: number): Promise<PaymentType[]> {
		try {
			const paymentTypes = await this.databaseService.paymentType.findMany({
				where: { deletedAt: null },
				skip: offset,
				take: limit,
				orderBy: { description: "asc" }
			})
			return paymentTypes
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - getting all payment types`
			)
			throw new AppError("Internal server error", 500)
		}
	}

	/**
	 * Retrieves a single non-deleted payment type by its id.
	 * @param id - The payment type id to look up.
	 * @returns The matching payment type, or `null` if none is found.
	 * @throws {AppError} With status 500 if the query fails.
	 */
	async getById(id: string): Promise<PaymentType | null> {
		try {
			const paymentType = await this.databaseService.paymentType.findUnique({
				where: { id, deletedAt: null }
			})
			return paymentType
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - getting payment type by id ${id}`
			)
			throw new AppError("Internal server error", 500)
		}
	}

	/**
	 * Creates a payment type with the given description and `hasStatement` flag, or,
	 * if a soft-deleted payment type with the same description already exists,
	 * reactivates it (upsert on `description`).
	 * @param description - The payment type description; must be unique among active payment types.
	 * @param hasStatement - Whether this payment type produces a statement.
	 * @returns The created or reactivated payment type.
	 * @throws {AppError} With status 500 if the operation fails.
	 */
	async create(
		description: string,
		hasStatement: boolean
	): Promise<PaymentType> {
		try {
			const paymentType = await this.databaseService.paymentType.upsert({
				where: { description },
				update: { description, hasStatement, deletedAt: null },
				create: { description, hasStatement }
			})
			return paymentType
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - creating payment type ${description}`
			)
			throw new AppError("Internal server error", 500)
		}
	}

	/**
	 * Updates a payment type's description and/or `hasStatement` flag. If another
	 * payment type already has the target description, the update is only allowed
	 * when that other payment type is soft-deleted, in which case this payment type
	 * is soft-deleted and the other one is reactivated with the new data via
	 * {@link reactivatePaymentType}.
	 * @param id - The id of the payment type to update.
	 * @param description - The new description to apply.
	 * @param hasStatement - The new `hasStatement` value to apply.
	 * @returns The updated (or reactivated) payment type. Note: no value is returned
	 * (implicit `undefined`) when the description collides with an active payment type
	 * whose id differs and is not soft-deleted, since the thrown error path is only
	 * reached inside the reactivation branch.
	 * @throws {AppError} With status 404 if the payment type is not found, or 400 if an
	 * active payment type already has the same description; 500 on unexpected errors.
	 */
	async update(
		id: string,
		description: string,
		hasStatement?: boolean
	): Promise<PaymentType> {
		try {
			const [paymentType, sameDescriptionPaymentType] = await Promise.all([
				this.databaseService.paymentType.findUnique({ where: { id } }),
				this.databaseService.paymentType.findUnique({
					where: { description }
				})
			])

			if (!paymentType) {
				this.logger.error(`Payment type ${id} not found`)
				throw new AppError("Payment type not found", 404)
			}

			if (
				(paymentType && !sameDescriptionPaymentType) ||
				sameDescriptionPaymentType?.id === id
			) {
				const updatedPaymentType =
					await this.databaseService.paymentType.update({
						where: { id },
						data: { description, hasStatement, deletedAt: null }
					})
				return updatedPaymentType
			}

			if (sameDescriptionPaymentType) {
				if (!sameDescriptionPaymentType?.deletedAt) {
					this.logger.error(
						`Payment type with description "${description}" already exists`
					)
					throw new AppError(
						"There is already a payment type with same description",
						400
					)
				}
				const reactivatedPaymentType = await this.reactivatePaymentType(
					id,
					sameDescriptionPaymentType.id
				)
				return reactivatedPaymentType
			}
		} catch (error) {
			if (error instanceof AppError) {
				throw error
			}
			this.logger.error(
				`Error - ${error.message || error} - updating payment type ${id}`
			)
			throw new AppError("Internal server error", 500)
		}
	}

	/**
	 * Soft-deletes a payment type by setting its `deletedAt` timestamp.
	 * Deleting a payment type that does not exist is treated as a no-op rather than an error.
	 * @param id - The id of the payment type to delete.
	 * @returns Nothing.
	 * @throws {AppError} With status 500 if the operation fails for a reason other than
	 * the record not existing.
	 */
	async delete(id: string): Promise<void> {
		try {
			await this.databaseService.paymentType.update({
				where: { id },
				data: { deletedAt: new Date() }
			})
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === constants.RECORD_NOT_FOUND
			) {
				return
			}
			this.logger.error(
				`Error - ${error.message || error} - deleting payment type ${id}`
			)
			throw new AppError("Internal server error", 500)
		}
	}

	/**
	 * Swaps the soft-delete state of two payment types: soft-deletes
	 * `paymentTypeIdToDelete` and reactivates `paymentTypeIdToRestore` (clearing its
	 * `deletedAt`), used when updating a payment type's description to match a
	 * previously soft-deleted one.
	 * @param paymentTypeIdToDelete - The id of the payment type to soft-delete.
	 * @param paymentTypeIdToRestore - The id of the soft-deleted payment type to reactivate.
	 * @returns The reactivated payment type.
	 * @throws {AppError} With status 500 if the operation fails.
	 */
	private async reactivatePaymentType(
		paymentTypeIdToDelete: string,
		paymentTypeIdToRestore: string
	): Promise<PaymentType> {
		try {
			const [, reactivatedPaymentType] = await Promise.all([
				this.delete(paymentTypeIdToDelete),
				this.databaseService.paymentType.update({
					where: { id: paymentTypeIdToRestore },
					data: { deletedAt: null }
				})
			])
			return reactivatedPaymentType
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - reactivating payment type ${paymentTypeIdToDelete}`
			)
			throw new AppError("Internal server error", 500)
		}
	}
}
