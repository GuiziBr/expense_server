import { PaymentType } from '@/domains/payment-type.domain'
import { DatabaseService } from '@/infra/database/database.service'
import { Injectable, Logger } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import AppError from '../utils/appError'
import { constants } from '../utils/constants'

@Injectable()
export class PaymentTypeService {
  private readonly logger = new Logger(PaymentTypeService.name)
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async getAll(offset?: number, limit?: number): Promise<PaymentType[]> {
    try {
      const paymentTypes = await this.databaseService.paymentType.findMany({
        where: { deletedAt: null },
        skip: offset,
        take: limit,
        orderBy: { description: 'asc' }
      })
      return paymentTypes
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - getting all payment types`)
      throw new AppError('Internal server error', 500)
    }
  }

  async getById(id: string): Promise<PaymentType | null> {
    try {
      const paymentType = await this.databaseService.paymentType.findUnique(
        { where: { id, deletedAt: null }}
      )
      return paymentType
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - getting payment type by id ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }

  async create(description: string, hasStatement: boolean): Promise<PaymentType> {
    try {
      const paymentType = await this.databaseService.paymentType.upsert({
        where: { description },
        update: { description, hasStatement, deletedAt: null },
        create: { description, hasStatement }
      })
      return paymentType
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - creating payment type ${description}`)
      throw new AppError('Internal server error', 500)
    }
  }

  async update(
    id: string,
    description: string,
    hasStatement?: boolean
  ): Promise<PaymentType> {
    try {
      const [paymentType, sameDescriptionPaymentType] = await Promise.all([
        this.databaseService.paymentType.findUnique({ where: { id }}),
        this.databaseService.paymentType.findUnique({
          where: { description }
        })
      ])

      if(!paymentType) {
        this.logger.error(`Payment type ${id} not found`)
        throw new AppError('Payment type not found', 404)
      }

      if(
        (paymentType && !sameDescriptionPaymentType)
        || (sameDescriptionPaymentType?.id === id)
      ) {
        const updatedPaymentType = await this.databaseService.paymentType.update({
          where: { id },
          data: { description, hasStatement, deletedAt: null }
        })
        return updatedPaymentType
      }

      if(sameDescriptionPaymentType) {
        if(!sameDescriptionPaymentType?.deletedAt) {
          this.logger.error(`Payment type with description "${description}" already exists`)
          throw new AppError('There is already a payment type with same description', 400)
        }
        const reactivatedPaymentType = await this.reactivatePaymentType(
          id,
          sameDescriptionPaymentType.id
        )
        return reactivatedPaymentType
      }
    } catch (error) {
      if(error instanceof AppError) {
        throw error
      }
      this.logger.error(`Error - ${error.message || error} - updating payment type ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.databaseService.paymentType.update({
        where: { id },
        data: { deletedAt: new Date() }
      })
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError
        && error.code === constants.RECORD_NOT_FOUND
      ) {
        return
      }
      this.logger.error(`Error - ${error.message || error} - deleting payment type ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }

  private async reactivatePaymentType(
    paymentTypeIdToDelete: string,
    paymentTypeIdToRestore: string
  ): Promise<PaymentType> {
    try {
      const [,reactivatedPaymentType] = await Promise.all([
        this.delete(paymentTypeIdToDelete),
        this.databaseService.paymentType.update({
          where: { id: paymentTypeIdToRestore },
          data: { deletedAt: null }
        })
      ])
      return reactivatedPaymentType
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - reactivating payment type ${paymentTypeIdToDelete}`)
      throw new AppError('Internal server error', 500)
    }
  }
}
