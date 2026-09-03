import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module.js"
import { env } from "./infra/env.js"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors({
		exposedHeaders: ["X-Total-Count"]
	})
	await app.listen(env.PORT)
}
bootstrap()
