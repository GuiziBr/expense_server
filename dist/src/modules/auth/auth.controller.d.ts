import { AuthenticatedUserDTO, LoginDTO } from "./auth.dto.js";
import { AuthService } from "./auth.service.js";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(body: LoginDTO): Promise<AuthenticatedUserDTO>;
}
