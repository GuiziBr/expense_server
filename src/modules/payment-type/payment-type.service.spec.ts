import { DatabaseService } from '@/infra/database/database.service'
import { Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
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
              upsert: vi.fn().mockResolvedValue(fakePaymentType),
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
      vi.spyOn(databaseService.paymentType, 'upsert').mockRejectedValue(new Error())

      await expect(paymentTypeService.create('payment', true))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.paymentType.upsert).toBeCalledWith({
        where: { description: 'payment' },
        update: { description: 'payment', hasStatement: true, deletedAt: null },
        create: { description: 'payment', hasStatement: true }
      })

      expect(loggerSpy)
        .toBeCalledWith('Error - Error - creating payment type payment')
    })

    it('should return created payment type', async () => {
      const result = await paymentTypeService.create('payment', true)

      expect(result).toEqual(fakePaymentType)

      expect(databaseService.paymentType.upsert).toBeCalledWith({
        where: { description: 'payment' },
        update: { description: 'payment', hasStatement: true, deletedAt: null },
        create: { description: 'payment', hasStatement: true }
      })

      expect(loggerSpy).not.toBeCalled()
    })
  })

  describe('update', () => {
    it('should throw payment not found exception', async () => {
      vi.spyOn(databaseService.paymentType, 'findUnique').mockResolvedValue(null)

      await expect(paymentTypeService.update('payment-id', 'updated-payment', true))
        .rejects
        .toThrow('Payment type not found')

      expect(databaseService.paymentType.findUnique).toBeCalledWith({
        where: { id: 'payment-id' }
      })

      expect(databaseService.paymentType.findUnique).toBeCalledWith({
        where: { description: 'updated-payment' }
      })

      expect(loggerSpy).toBeCalledWith('Payment type payment-id not found')
    })

    it('should return updated payment type', async () => {
      const result = await paymentTypeService.update(
        fakePaymentType.id,
        'updated-payment',
        false
      )

      expect(result).toEqual(fakePaymentType)

      expect(databaseService.paymentType.findUnique).toBeCalledWith({
        where: { id: fakePaymentType.id }
      })

      expect(databaseService.paymentType.findUnique).toBeCalledWith({
        where: { description: 'updated-payment' }
      })

      expect(databaseService.paymentType.update).toBeCalledWith({
        where: { id: fakePaymentType.id },
        data: { description: 'updated-payment', hasStatement: false, deletedAt: null }
      })

      expect(loggerSpy).not.toBeCalled()
    })

    it('should throw payment type already exists exception', async () => {
      await expect(paymentTypeService.update('payment-id', 'updated-payment', true))
        .rejects
        .toThrow('There is already a payment type with same description')

      expect(databaseService.paymentType.findUnique).toBeCalledWith({
        where: { id: 'payment-id' }
      })

      expect(databaseService.paymentType.findUnique).toBeCalledWith({
        where: { description: 'updated-payment' }
      })

      expect(loggerSpy)
        .toBeCalledWith('Payment type with description "updated-payment" already exists')
    })

    it('should reactivate deleted payment type', async () => {
      const deletedPaymentType = createPaymentType({ deletedAt: new Date() })

      vi.spyOn(databaseService.paymentType, 'findUnique')
        .mockResolvedValue(deletedPaymentType)

      const result = await paymentTypeService.update(
        fakePaymentType.id,
        'updated-payment',
        false
      )

      expect(result).toEqual(fakePaymentType)

      expect(databaseService.paymentType.findUnique).toBeCalledWith({
        where: { id: fakePaymentType.id }
      })

      expect(databaseService.paymentType.findUnique).toBeCalledWith({
        where: { description: 'updated-payment' }
      })

      expect(databaseService.paymentType.update).toBeCalledWith({
        where: { id: fakePaymentType.id },
        data: { deletedAt: expect.any(Date) }
      })

      expect(databaseService.paymentType.update).toBeCalledWith({
        where: { id: deletedPaymentType.id },
        data: { deletedAt: null }
      })






    })

    it('should throw internal server error exception', async () => {
      vi.spyOn(databaseService.paymentType, 'findUnique').mockRejectedValue(new Error())

      await expect(paymentTypeService.update('payment-id', 'updated-payment', true))
        .rejects
        .toThrow('Internal server error')

      expect(loggerSpy).toBeCalledWith('Error - Error - updating payment type payment-id')
    })
  })

})
