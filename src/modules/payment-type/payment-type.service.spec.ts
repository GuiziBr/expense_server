import { DatabaseService } from '@/infra/database/database.service'
import { Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { createPaymentType } from '../test-utils/payment-type.factory'
import { PaymentTypeService } from './payment-type.service'

describe('PaymentTypeService', () => {
  let paymentTypeService: PaymentTypeService
  let databaseService: DatabaseService
  let loggerSpy: ReturnType<typeof vi.spyOn>
  const fakePaymentType = createPaymentType()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PaymentTypeService,
        {
          provide: DatabaseService,
          useValue: {
            paymentType: {
              findMany: vi.fn().mockResolvedValue([fakePaymentType]),
              findUnique: vi.fn().mockResolvedValue(fakePaymentType),
              create: vi.fn().mockResolvedValue(fakePaymentType),
              update: vi.fn().mockResolvedValue(fakePaymentType),
              delete: vi.fn()
            }
          }
        }
      ]
    }).compile()

    paymentTypeService = module.get<PaymentTypeService>(PaymentTypeService)
    databaseService = module.get<DatabaseService>(DatabaseService)
    loggerSpy = vi.spyOn(Logger.prototype, 'error')
  })

  describe('getAll', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.paymentType, 'findMany').mockRejectedValue(new Error())

      await expect(paymentTypeService.getAll(0,1))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.paymentType.findMany).toBeCalledWith({
        where: { deletedAt: null },
        skip: 0,
        take: 1,
        orderBy: { description: 'asc' }
      })

      expect(loggerSpy).toBeCalledWith('Error - Error - getting all payment types')
    })

    it('should return payment types', async () => {
      const result = await paymentTypeService.getAll(1,2)

      expect(result).toEqual([fakePaymentType])

      expect(databaseService.paymentType.findMany).toBeCalledWith({
        where: { deletedAt: null },
        skip: 1,
        take: 2,
        orderBy: { description: 'asc' }
      })
    })
  })

  describe('getById', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.paymentType, 'findUnique').mockRejectedValue(new Error())

      await expect(paymentTypeService.getById('payment-id'))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.paymentType.findUnique).toBeCalledWith({
        where: { id: 'payment-id', deletedAt: null }
      })

      expect(loggerSpy)
        .toBeCalledWith('Error - Error - getting payment type by id payment-id')
    })

    it('should return payment type', async () => {
      const result = await paymentTypeService.getById('payment-id')

      expect(result).toEqual(fakePaymentType)

      expect(databaseService.paymentType.findUnique).toBeCalledWith({
        where: { id: 'payment-id', deletedAt: null }
      })
    })
  })

  describe('create', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.paymentType, 'create').mockRejectedValue(new Error())

      await expect(paymentTypeService.create('payment', true))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.paymentType.create).toBeCalledWith({
        data: { description: 'payment', hasStatement: true }
      })

      expect(loggerSpy)
        .toBeCalledWith('Error - Error - creating payment type payment')
    })

    it('should throw payment type already exists exception', async () => {
      const prismaError = new PrismaClientKnownRequestError(
        'error',
        { code: 'P2002', clientVersion: 'clientVersion' }
      )

      vi.spyOn(databaseService.paymentType, 'create').mockRejectedValue(prismaError)

      await expect(paymentTypeService.create('payment', true))
        .rejects
        .toThrow('Payment type already exists')

      expect(databaseService.paymentType.create).toBeCalledWith({
        data: { description: 'payment', hasStatement: true }
      })

      expect(loggerSpy).toBeCalledWith('Payment type payment already exists')
    })

    it('should return created payment type', async () => {
      const result = await paymentTypeService.create('payment', true)

      expect(result).toEqual(fakePaymentType)

      expect(databaseService.paymentType.create).toBeCalledWith({
        data: { description: 'payment', hasStatement: true }
      })

      expect(loggerSpy).not.toBeCalled()
    })
  })

  describe('update', () => {
    it('should throw payment type already exists exception', async () => {
      const prismaError = new PrismaClientKnownRequestError(
        'error',
        { code: 'P2022', clientVersion: 'clientVersion' }
      )

      vi.spyOn(databaseService.paymentType, 'update').mockRejectedValue(prismaError)

      await expect(paymentTypeService.update('payment-id', 'updated-payment', true))
        .rejects
        .toThrow('There is already a payment type with same description')

      expect(databaseService.paymentType.update).toBeCalledWith({
        where: { id: 'payment-id' },
        data: { description: 'updated-payment', hasStatement: true }
      })

      expect(loggerSpy)
        .toBeCalledWith('Payment type with description "updated-payment" already exists')
    })

    it('should throw payment not found exception', async () => {
      const prismaError = new PrismaClientKnownRequestError(
        'error',
        { code: 'P2025', clientVersion: 'clientVersion' }
      )

      vi.spyOn(databaseService.paymentType, 'update').mockRejectedValue(prismaError)

      await expect(paymentTypeService.update('payment-id', 'updated-payment', true))
        .rejects
        .toThrow('Payment type not found')

      expect(databaseService.paymentType.update).toBeCalledWith({
        where: { id: 'payment-id' },
        data: { description: 'updated-payment', hasStatement: true }
      })

      expect(loggerSpy).toBeCalledWith('Payment type payment-id not found')
    })

    it('should throw database error exception', async () => {
      const prismaError = new PrismaClientKnownRequestError(
        'error',
        { code: 'P2000', clientVersion: 'clientVersion' }
      )

      vi.spyOn(databaseService.paymentType, 'update').mockRejectedValue(prismaError)

      await expect(paymentTypeService.update('payment-id', 'updated-payment', true))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.paymentType.update).toBeCalledWith({
        where: { id: 'payment-id' },
        data: { description: 'updated-payment', hasStatement: true }
      })

      expect(loggerSpy).toBeCalledWith('Database error updating payment type')
    })

    it('should throw internal server error exception', async () => {
      vi.spyOn(databaseService.paymentType, 'update').mockRejectedValue(new Error())

      await expect(paymentTypeService.update('payment-id', 'updated-payment', true))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.paymentType.update).toBeCalledWith({
        where: { id: 'payment-id' },
        data: { description: 'updated-payment', hasStatement: true }
      })

      expect(loggerSpy).toBeCalledWith('Error - Error - updating payment type payment-id')
    })

    it('should return updated payment type', async () => {
      const result = await paymentTypeService.update(
        'payment-id',
        'updated-payment',
        true
      )

      expect(result).toEqual(fakePaymentType)

      expect(databaseService.paymentType.update).toBeCalledWith({
        where: { id: 'payment-id' },
        data: { description: 'updated-payment', hasStatement: true }
      })

      expect(loggerSpy).not.toBeCalled()
    })
  })

})
