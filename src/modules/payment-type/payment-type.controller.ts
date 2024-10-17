import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PaymentTypePresenter } from '@/infra/http/presenters/paymentType.presenter'
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
  CreatePaymentTypeDTO,
  createPaymentTypeSchema,
  ListPaymentTypesDTO,
  listPaymentTypesSchema,
  PaymentTypeByIdDTO,
  paymentTypeByIdSchema,
  PaymentTypeDTO
} from './payment-type.dto'
import { PaymentTypeService } from './payment-type.service'

@Controller('paymentType')
export class PaymentTypeController {
  constructor( private readonly paymentTypeService: PaymentTypeService) {}

  @Get()
  async listPaymentTypes(
    @Query(new ZodValidationPipe(listPaymentTypesSchema)) query?: ListPaymentTypesDTO
  ) {
    const { offset, limit } = query
    const paymentTypes = await this.paymentTypeService.getAll(offset,limit)
    return paymentTypes.map(PaymentTypePresenter.toHttp)
  }

  @Get(':id')
  async getPaymentTypeById(
    @Param(new ZodValidationPipe(paymentTypeByIdSchema)) params: PaymentTypeByIdDTO
  ): Promise<PaymentTypeDTO>  {
    const { id } = params
    const paymentType = await this.paymentTypeService.getById(id)
    if(!paymentType) {
      throw new NotFoundException()
    }
    return PaymentTypePresenter.toHttp(paymentType) || null
  }

  @Post()
  async createPaymentType(
    @Body(new ZodValidationPipe(createPaymentTypeSchema)) body: CreatePaymentTypeDTO
  ): Promise<PaymentTypeDTO> {
    const { description, hasStatement } = body
    const paymentType = await this.paymentTypeService.create(description, hasStatement)
    return PaymentTypePresenter.toHttp(paymentType)
  }

  @Patch(':id')
  async updatePaymentType(
    @Param(new ZodValidationPipe(paymentTypeByIdSchema)) params: PaymentTypeByIdDTO,
    @Body(new ZodValidationPipe(createPaymentTypeSchema)) body: CreatePaymentTypeDTO
  ): Promise<PaymentTypeDTO> {
    const { id } = params
    const { description, hasStatement } = body
    const paymentType = await this.paymentTypeService.update(
      id, description, hasStatement
    )
    return PaymentTypePresenter.toHttp(paymentType)
  }

  @HttpCode(204)
  @Delete(':id')
  async deletePaymentType(
    @Param(new ZodValidationPipe(paymentTypeByIdSchema)) params: PaymentTypeByIdDTO
  ): Promise<void> {
    const { id } = params
    return this.paymentTypeService.delete(id)
  }
}
