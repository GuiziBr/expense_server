import { UpdateUserAvatarDTO } from "./user.dto.js";
import { UserService } from "./user.service.js";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateAvatar(userId: string, { avatar }: UpdateUserAvatarDTO): Promise<void>;
}
