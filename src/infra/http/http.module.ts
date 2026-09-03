import { Module } from "@nestjs/common"
import { ZodValidationPipe } from "./pipes/zod-validation-pipe.js"

@Module({
	providers: [ZodValidationPipe],
	exports: [ZodValidationPipe]
})
export class HttpModule {}
