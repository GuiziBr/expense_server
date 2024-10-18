import { InfraModule } from '@/infra/infra.module'
import { Module } from '@nestjs/common'
import { BankController } from './bank.controller'
import { BankService } from './bank.service'

@Module({
  imports: [InfraModule],
  controllers: [BankController],
  providers: [BankService]
})

export class BankModule {}
