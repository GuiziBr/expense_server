import { Injectable, Logger } from "@nestjs/common"
import { StatementPeriod } from "../../domains/statement-period.domain.js"
import { DatabaseService } from "../../infra/database/database.service.js"
import AppError from "../utils/appError.js"

@Injectable()
export class StatementPeriodService {
	private readonly logger = new Logger(StatementPeriodService.name)

	constructor(private readonly databaseService: DatabaseService) {}

	/**
	 * Finds the statement period configured for a given user, bank, and
	 * payment type.
	 * @param userId - The id of the user.
	 * @param bankId - The id of the bank.
	 * @param paymentTypeId - The id of the payment type.
	 * @returns The matching {@link StatementPeriod}, or `null` if none is found.
	 * @throws {AppError} With status 500 if the database lookup fails.
	 */
	async findByUserAndBank(
		userId: string,
		bankId: string,
		paymentTypeId: string
	): Promise<StatementPeriod | null> {
		try {
			const statementPeriod =
				await this.databaseService.statementPeriod.findFirst({
					where: {
						userId,
						bankId,
						paymentTypeId
					}
				})
			return statementPeriod
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - getting statement period`
			)
			throw new AppError("Internal server error", 500)
		}
	}
}
