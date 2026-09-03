import { User } from "./user.domain.js";
export interface AuthenticatedUser {
    user: User;
    token: string;
}
