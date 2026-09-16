import {
	BadRequestException,
	HttpException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from "@nestjs/common"
import { Bank } from "../../domains/bank.domain.js"
import { Prisma } from "../../generated/prisma/client.js"
import { DatabaseService } from "../../infra/database/database.service.js"
import { constants } from "../utils/constants.js"

@Injectable()
export class BankService {
	private readonly logger = new Logger(BankService.name)

	constructor(private readonly databaseService: DatabaseService) {}

	/**
	 * Fetches all non-deleted banks, ordered by name ascending.
	 * @param offset - Number of records to skip, for pagination.
	 * @param limit - Maximum number of records to return.
	 * @returns The matching banks.
	 * @throws {InternalServerErrorException} On unexpected database errors.
	 */
	async getAll(offset?: number, limit?: number): Promise<Bank[]> {
		try {
			const banks = await this.databaseService.bank.findMany({
				where: { deletedAt: null },
				skip: offset,
				take: limit,
				orderBy: { name: "asc" }
			})
			return banks
		} catch (error) {
			this.logger.error(`Error - ${error.message || error} - getting all banks`)
			throw new InternalServerErrorException("Internal server error")
		}
	}

	/**
	 * Fetches a single non-deleted bank by id.
	 * @param id - The bank id.
	 * @returns The bank, or null if none matches.
	 * @throws {InternalServerErrorException} On unexpected database errors.
	 */
	async getById(id: string): Promise<Bank | null> {
		try {
			const bank = await this.databaseService.bank.findUnique({
				where: { id, deletedAt: null }
			})
			return bank
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - getting bank by id ${id}`
			)
			throw new InternalServerErrorException("Internal server error")
		}
	}

	/**
	 * Creates a bank with the given name, or, if a bank with that name already
	 * exists (including soft-deleted ones), updates it and clears `deletedAt`
	 * to reactivate it.
	 * @param name - The bank name; must be unique among active banks.
	 * @returns The created or reactivated bank.
	 * @throws {InternalServerErrorException} On unexpected database errors.
	 */
	async create(name: string): Promise<Bank> {
		try {
			const bank = await this.databaseService.bank.upsert({
				where: { name },
				update: { name, deletedAt: null },
				create: { name }
			})
			return bank
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - creating bank ${name}`
			)
			throw new InternalServerErrorException("Internal server error")
		}
	}

	/**
	 * Updates a bank's name. If another active bank already has the requested
	 * name, throws. If the requested name only exists on a soft-deleted bank,
	 * that soft-deleted bank is renamed (freeing up the name) inside a
	 * transaction while the target bank is renamed and reactivated.
	 * @param id - Id of the bank to update.
	 * @param name - The new name for the bank.
	 * @returns The updated bank.
	 * @throws {NotFoundException} If the bank does not exist.
	 * @throws {BadRequestException} If another active bank already has that name.
	 * @throws {InternalServerErrorException} On unexpected errors (including a unique
	 * constraint violation from the database).
	 */
	async update(id: string, name: string): Promise<Bank> {
		try {
			const [bank, sameNameBank] = await Promise.all([
				this.databaseService.bank.findUnique({ where: { id } }),
				this.databaseService.bank.findUnique({ where: { name } })
			])

			if (!bank) {
				this.logger.error(`Bank ${id} not found`)
				throw new NotFoundException("Bank not found")
			}

			if ((bank && !sameNameBank) || sameNameBank?.id === id) {
				const updatedBank = await this.databaseService.bank.update({
					where: { id },
					data: { name, deletedAt: null }
				})
				return updatedBank
			}

			if (sameNameBank) {
				if (!sameNameBank?.deletedAt) {
					this.logger.error(`Bank with name "${name}" already exists`)
					throw new BadRequestException(
						"There is already a bank with same name"
					)
				}
			}

			const [, renamedBank] = await this.databaseService.$transaction([
				this.databaseService.bank.update({
					where: { id: sameNameBank.id },
					data: { name: `${sameNameBank.name}_${sameNameBank.id}` }
				}),
				this.databaseService.bank.update({
					where: { id },
					data: { name, deletedAt: null }
				})
			])

			return renamedBank
		} catch (error) {
			if (error instanceof HttpException) {
				throw error
			}
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === constants.UNIQUE_CONSTRAINT_VIOLATION
			) {
				this.logger.error(`Bank with name "${name}" already exists`)
				throw new BadRequestException("There is already a bank with same name")
			}
			this.logger.error(
				`Error - ${error.message || error} - updating bank ${id}`
			)
			throw new InternalServerErrorException("Internal server error")
		}
	}

	/**
	 * Soft-deletes a bank by setting its `deletedAt` timestamp. Deleting a
	 * bank that no longer exists is treated as a no-op rather than an error.
	 * @param id - Id of the bank to delete.
	 * @returns Nothing.
	 * @throws {InternalServerErrorException} On unexpected database errors.
	 */
	async delete(id: string): Promise<void> {
		try {
			await this.databaseService.bank.update({
				where: { id },
				data: { deletedAt: new Date() }
			})
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === constants.RECORD_NOT_FOUND
			) {
				return
			}
			this.logger.error(
				`Error - ${error.message || error} - deleting bank ${id}`
			)
			throw new InternalServerErrorException("Internal server error")
		}
	}
}
