import { CallHandler, ExecutionContext } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
export declare class CurrentUserInterceptor {
    private readonly databaseService;
    private readonly logger;
    constructor(databaseService: DatabaseService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<import("rxjs").Observable<any>>;
}
