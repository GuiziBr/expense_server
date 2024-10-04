import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env'
import { InfraModule } from './infra/infra.module'
import { HealthModule } from './modules/health/health.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    InfraModule,
    HealthModule
  ],
  controllers: [],
  providers: []
})

export class AppModule {}
