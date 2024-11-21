import { AuthenticatedUserDTO, LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(body: LoginDTO): Promise<AuthenticatedUserDTO>;
}
