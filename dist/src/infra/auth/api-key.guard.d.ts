import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Env } from "../env.js";
export declare class ApiKeyGuard implements CanActivate {
    private readonly configService;
    constructor(configService: ConfigService<Env, true>);
    canActivate(context: ExecutionContext): boolean;
    private matchesApiKey;
}
