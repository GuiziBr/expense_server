import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { BankPresenter } from '@/infra/http/presenters/bank.presenter'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import {
  BankByIdDTO,
  bankByIdSchema,
  BankDTO,
  CreateBankDTO,
  createBankSchema,
  ListBankDTO,
  listBanksSchema
} from './bank.dto'
import { BankService } from './bank.service'

@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  async listBanks(
    @Query(new ZodValidationPipe(listBanksSchema)) query?: ListBankDTO
  ) {
    const { offset, limit } = query
    const banks = await this.bankService.getAll(offset,limit)
    return banks.map(BankPresenter.toHttp)
  }

  @Get(':id')
  async getBankById(
    @Param(new ZodValidationPipe(bankByIdSchema)) params: BankByIdDTO
  ): Promise<BankByIdDTO>  {
    const { id } = params
    const bank = await this.bankService.getById(id)
    if(!bank) {
      throw new NotFoundException()
    }
    return BankPresenter.toHttp(bank) || null
  }

  @Post()
  async createBank(
    @Body(new ZodValidationPipe(createBankSchema)) body: CreateBankDTO
  ): Promise<BankDTO> {
    const { name } = body
    const bank = await this.bankService.create(name)
    return BankPresenter.toHttp(bank)
  }

  @Patch(':id')
  async updateBank(
    @Param(new ZodValidationPipe(bankByIdSchema)) params: BankByIdDTO,
    @Body(new ZodValidationPipe(createBankSchema)) body: CreateBankDTO
  ): Promise<BankDTO> {
    const { id } = params
    const { name } = body
    const bank = await this.bankService.update(id, name)
    return BankPresenter.toHttp(bank)
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteBank(
    @Param(new ZodValidationPipe(bankByIdSchema)) params: BankByIdDTO
  ): Promise<void> {
    const { id } = params
    return this.bankService.delete(id)
  }
}
