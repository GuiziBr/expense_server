import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { compare } from "bcrypt"
import { AuthenticatedUser } from "../../domains/authentication.domain.js"
import { UserService } from "../user/user.service.js"

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	/**
	 * Validates user credentials and issues a signed JWT for the session.
	 * Looks up the user by email, compares the given password against the stored
	 * bcrypt hash, and signs a JWT payload containing the user's id and email.
	 * @param email - The email address of the user attempting to sign in.
	 * @param pass - The plain-text password to verify against the stored hash.
	 * @returns The authenticated user along with a signed JWT access token.
	 * @throws UnauthorizedException if no user is found for the given email, or if the password does not match.
	 */
	async signIn(email: string, pass: string): Promise<AuthenticatedUser> {
		const user = await this.userService.findUserByEmail(email)

		if (!user) {
			throw new UnauthorizedException()
		}

		const passwordMatched = await compare(pass, user.password)

		if (!passwordMatched) {
			throw new UnauthorizedException()
		}

		const payload = { sub: user.id, email: user.email }

		return {
			user,
			token: await this.jwtService.signAsync(payload)
		}
	}
}
