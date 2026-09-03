import { JwtService } from "@nestjs/jwt";
import { AuthenticatedUser } from "../../domains/authentication.domain.js";
import { UserService } from "../user/user.service.js";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signIn(email: string, pass: string): Promise<AuthenticatedUser>;
}
