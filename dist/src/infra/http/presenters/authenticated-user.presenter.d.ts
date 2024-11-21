import { AuthenticatedUser } from '@/domains/authentication.domain';
import { AuthenticatedUserDTO } from '@/modules/auth/auth.dto';
export declare class AuthenticatedUserPresenter {
    static toHttp({ user, token }: AuthenticatedUser): AuthenticatedUserDTO;
}
