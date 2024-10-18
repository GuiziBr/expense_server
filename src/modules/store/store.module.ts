import { InfraModule } from '@/infra/infra.module'
import { Module } from '@nestjs/common'
import { StoreController } from './store.controller'
import { StoreService } from './store.service'

@Module({
  imports: [InfraModule],
  controllers: [StoreController],
  providers: [StoreService]
})

export class StoreModule {}
