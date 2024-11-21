import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateAvatar({ userId }: {
        userId: any;
    }, { avatar }: {
        avatar: any;
    }): Promise<void>;
}
