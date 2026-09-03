import { AuthenticatedUser } from "../../../domains/authentication.domain.js";
import { AuthenticatedUserDTO } from "../../../modules/auth/auth.dto.js";
export declare class AuthenticatedUserPresenter {
    static toHttp({ user, token }: AuthenticatedUser): AuthenticatedUserDTO;
}
