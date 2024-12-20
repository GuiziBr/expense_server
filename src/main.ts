import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './infra/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    exposedHeaders: ['X-Total-Count']
  })
  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })
  await app.listen(port)
}
bootstrap()
