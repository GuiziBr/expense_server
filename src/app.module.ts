import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env'
import { InfraModule } from './infra/infra.module'
import { AuthModule } from './modules/auth/auth.module'
import { HealthModule } from './modules/health/health.module'
import { PaymentTypeModule } from './modules/payment-type/payment-type.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    InfraModule,
    HealthModule,
    AuthModule,
    UserModule,
    PaymentTypeModule
  ]
})

export class AppModule {}
