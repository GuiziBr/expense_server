import { InfraModule } from '@/infra/infra.module'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [InfraModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})

export class UserModule {}
