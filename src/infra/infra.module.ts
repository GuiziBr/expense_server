import { Module } from "@nestjs/common"
import { DatabaseModule } from "./database/database.module.js"
import { HttpModule } from "./http/http.module.js"

@Module({
	imports: [DatabaseModule, HttpModule],
	exports: [DatabaseModule, HttpModule]
})
export class InfraModule {}
