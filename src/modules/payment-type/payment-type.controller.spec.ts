import { CurrentUserInterceptor } from '@/infra/auth/current-user.interceptor'
import { Test } from '@nestjs/testing'
import { createPaymentType } from '../test-utils/payment-type.factory'
import { PaymentTypeController } from './payment-type.controller'
import { PaymentTypeService } from './payment-type.service'

describe('PaymentTypeController', () => {
  let paymentTypeController: PaymentTypeController
  let paymentTypeService: PaymentTypeService
  const fakePaymentType = createPaymentType()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PaymentTypeController],
      providers: [
        {
          provide: PaymentTypeService,
          useValue: {
            getAll: vi.fn().mockResolvedValue([fakePaymentType]),
            getById: vi.fn().mockResolvedValue(fakePaymentType),
            create: vi.fn().mockResolvedValue(fakePaymentType),
            update: vi.fn().mockResolvedValue(fakePaymentType),
            delete: vi.fn()
          }
        }
      ]
    })
      .overrideInterceptor(CurrentUserInterceptor)
      .useValue({})
      .compile()

    paymentTypeController = module.get(PaymentTypeController)
    paymentTypeService = module.get(PaymentTypeService)
  })

  describe('listPaymentTypes', () => {
    it('should return list of payment types', async () => {
      const result = await paymentTypeController.listPaymentTypes(
        { offset: 0, limit: 10 }
      )

      expect(result).toHaveLength(1)

      expect(result[0]).toEqual({
        id: fakePaymentType.id,
        description: fakePaymentType.description,
        createdAt: fakePaymentType.createdAt,
        updatedAt: fakePaymentType.updatedAt,
        hasStatement: fakePaymentType.hasStatement
      })

      expect(paymentTypeService.getAll).toBeCalledWith(0,10)

    })
  })

  describe('getPaymentType', () => {
    it('should return payment type', async () => {
      const result = await paymentTypeController.getPaymentTypeById({ id: 'id' })

      expect(result).toEqual({
        id: fakePaymentType.id,
        description: fakePaymentType.description,
        createdAt: fakePaymentType.createdAt,
        updatedAt: fakePaymentType.updatedAt,
        hasStatement: fakePaymentType.hasStatement
      })

      expect(paymentTypeService.getById).toBeCalledWith('id')
    })
  })

  describe('createPaymentType', () => {
    it('should return created payment type', async () => {
      const result = await paymentTypeController.createPaymentType({
        description: 'description',
        hasStatement: true
      })

      expect(result).toEqual({
        id: fakePaymentType.id,
        description: fakePaymentType.description,
        createdAt: fakePaymentType.createdAt,
        updatedAt: fakePaymentType.updatedAt,
        hasStatement: fakePaymentType.hasStatement
      })

      expect(paymentTypeService.create).toBeCalledWith(
        'description',
        true
      )
    })
  })

  describe('updatePaymentType', () => {
    it('should return updated payment type', async () => {
      const result = await paymentTypeController.updatePaymentType({
        id: 'payment-id'
      },
      {
        description: 'new-description',
        hasStatement: true
      })

      expect(result).toEqual({
        id: fakePaymentType.id,
        description: fakePaymentType.description,
        createdAt: fakePaymentType.createdAt,
        updatedAt: fakePaymentType.updatedAt,
        hasStatement: fakePaymentType.hasStatement
      })

      expect(paymentTypeService.update).toBeCalledWith(
        'payment-id',
        'new-description',
        true
      )
    })
  })

  describe('deletePaymentType', () => {
    it('should delete payment type', async () => {
      await paymentTypeController.deletePaymentType({ id: 'id' })
      expect(paymentTypeService.delete).toBeCalledWith('id')
    })
  })
})
