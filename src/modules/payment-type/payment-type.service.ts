import { PaymentType } from '@/domains/payment-type.domain'
import { DatabaseService } from '@/infra/database/database.service'
import { Injectable, Logger } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import AppError from '../utils/appError'

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
      const paymentType = await this.databaseService.paymentType.create({
        data: { description, hasStatement }
      })
      return paymentType
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError) {
        if(error.code === 'P2002') {
          this.logger.error(`Payment type ${description} already exists`)
          throw new AppError('Payment type already exists', 400)
        }
      }
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
      const paymentType = await this.databaseService.paymentType.update({
        where: { id },
        data: { description, hasStatement }
      })
      return paymentType
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
        case 'P2022':
          this.logger.error(`Payment type with description "${description}" already exists`)
          throw new AppError('There is already a payment type with same description', 400)
        case 'P2025':
          this.logger.error(`Payment type ${id} not found`)
          throw new AppError('Payment type not found', 404)
        default:
          this.logger.error('Database error updating payment type')
          throw new AppError('Internal server error', 500)
        }
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
      if(error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
        case 'P2025':
          return
        default:
          throw new AppError('Internal server error', 500)
        }
      }
      this.logger.error(`Error - ${error.message || error} - deleting payment type ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }
}
