import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Env } from '../../infra/env';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly configService;
    private readonly reflector;
    constructor(jwtService: JwtService, configService: ConfigService<Env, true>, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
