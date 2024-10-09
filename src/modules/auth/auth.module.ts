import { Env } from '@/infra/env'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<Env, true>) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET', { infer: true }),
          signOptions: { expiresIn: '1d' }
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})

export class AuthModule {}
