import { User } from '@/domains/user.domain';
import { DatabaseService } from '@/infra/database/database.service';
export declare class UserService {
    private readonly databaseService;
    private readonly logger;
    constructor(databaseService: DatabaseService);
    findUserByEmail(email: string): Promise<User>;
    updateUserAvatar(userId: string, avatar: string): Promise<void>;
}
