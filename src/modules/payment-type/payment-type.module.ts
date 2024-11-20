import { InfraModule } from '@/infra/infra.module'
import { Module } from '@nestjs/common'
import { PaymentTypeController } from './payment-type.controller'
import { PaymentTypeService } from './payment-type.service'

@Module({
  imports: [InfraModule],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
  exports: [PaymentTypeService]
})

export class PaymentTypeModule {}
