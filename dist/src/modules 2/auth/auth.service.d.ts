import { AuthenticatedUser } from '@/domains/authentication.domain';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signIn(email: string, pass: string): Promise<AuthenticatedUser>;
}
