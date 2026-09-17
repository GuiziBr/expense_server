import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger
} from "@nestjs/common"
import { User } from "../../domains/user.domain.js"
import { Prisma } from "../../generated/prisma/client.js"
import { DatabaseService } from "../../infra/database/database.service.js"

@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name)

	constructor(private readonly databaseService: DatabaseService) {}

	/**
	 * Finds a user by their email address.
	 * @param email - The email address to search for.
	 * @returns The matching {@link User}, or `null` if none is found.
	 * @throws {InternalServerErrorException} If the database lookup fails.
	 */
	async findUserByEmail(email: string): Promise<User> {
		try {
			const user = await this.databaseService.user.findUnique({
				where: { email }
			})
			return user
		} catch (error) {
			this.logger.error(`Error - ${error} - finding user by email ${email}`)
			throw new InternalServerErrorException("Internal server error")
		}
	}

	/**
	 * Updates the avatar URL for a given user.
	 * @param userId - The id of the user to update.
	 * @param avatar - The new avatar value to persist.
	 * @returns A promise that resolves once the update completes.
	 * @throws {BadRequestException} If the update fails due to a known
	 * database constraint (e.g. the user does not exist).
	 * @throws {InternalServerErrorException} For any other unexpected error.
	 */
	async updateUserAvatar(userId: string, avatar: string): Promise<void> {
		try {
			await this.databaseService.user.update({
				where: { id: userId },
				data: { avatar }
			})
		} catch (error) {
			this.logger.error(
				`Error - ${error.message || error} - updating user avatar ${userId}`
			)

			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new BadRequestException("Error updating user avatar")
			}
			throw new InternalServerErrorException("Internal server error")
		}
	}
}
