import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { HttpModule } from './http/http.module'

@Module({
  imports: [DatabaseModule, HttpModule],
  exports: [DatabaseModule, HttpModule]
})

export class InfraModule {}
