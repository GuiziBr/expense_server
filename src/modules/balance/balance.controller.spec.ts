import { Test } from '@nestjs/testing'
import { BalanceController } from './balance.controller'
import { BalanceService } from './balance.service'
import { CurrentUserInterceptor } from '@/infra/auth/current-user.interceptor'
import { createExpense } from '../test-utils/expense.factory'

describe('BalanceController', () => {
  let balanceController: BalanceController
  let balanceService: BalanceService

  const fakeExpenses = [
    createExpense({ ownerId: 'owner-id' }),
    createExpense({ ownerId: 'owner-id-2' })
  ]

  const fakeConsolidatedBalance = {
    userId: 'owner-id',
    requesterBalance: fakeExpenses[0].amount,
    partnerBalance: fakeExpenses[1].amount,
    requester: {
      ownerId: 'owner-id',
      ownerName: fakeExpenses[0].user.name,
      payments: [{
        id: fakeExpenses[0].paymentTypeId,
        description: fakeExpenses[0].paymentType.description,
        banks: [{
          id: fakeExpenses[0].bank.id,
          name: fakeExpenses[0].bank.name,
          total: fakeExpenses[0].amount
        }],
        total: fakeExpenses[0].amount
      }],
      categories: [{
        id: fakeExpenses[0].categoryId,
        description: fakeExpenses[0].category.description,
        total: fakeExpenses[0].amount
      }],
      total: fakeExpenses[0].amount
    },
    partner: {
      ownerId: 'owner-id-2',
      ownerName: fakeExpenses[1].user.name,
      payments: [{
        id: fakeExpenses[1].paymentTypeId,
        description: fakeExpenses[1].paymentType.description,
        banks: [{
          id: fakeExpenses[1].bank.id,
          name: fakeExpenses[1].bank.name,
          total: fakeExpenses[1].amount
        }],
        total: fakeExpenses[1].amount
      }],
      categories: [{
        id: fakeExpenses[1].categoryId,
        description: fakeExpenses[1].category.description,
        total: fakeExpenses[1].amount
      }],
      total: fakeExpenses[1].amount
    }
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BalanceController],
      providers: [
        {
          provide: BalanceService,
          useValue: {
            getBalance: vi.fn(),
            getConsolidatedBalance: vi.fn().mockResolvedValue(fakeConsolidatedBalance)
          }
        }
      ]
    })
      .overrideInterceptor(CurrentUserInterceptor)
      .useValue({})
      .compile()

    balanceController = module.get<BalanceController>(BalanceController)
    balanceService = module.get<BalanceService>(BalanceService)
  })

  describe('getBalance', () => {
    it('should get balance', async () => {
      const query = {
        startDate: new Date(),
        endDate: new Date()
      }

      await balanceController.getBalance({ userId: 1 }, query)

      expect(balanceService.getBalance).toHaveBeenCalledWith({
        ownerId: 1,
        startDate: query.startDate,
        endDate: query.endDate
      })
    })
  })

  describe('getConsolidatedBalance', () => {
    it('should get consolidated balance', async () => {
      const params = {
        month: 1,
        year: 2022
      }

      const result = await balanceController.getConsolidatedBalance({ userId: 1 }, params)

      expect(result).toEqual({
        requester: {
          id: fakeConsolidatedBalance.userId,
          name: fakeConsolidatedBalance.requester.ownerName,
          payments: fakeConsolidatedBalance.requester.payments,
          categories: fakeConsolidatedBalance.requester.categories,
          total: fakeConsolidatedBalance.requesterBalance
        },
        partner: {
          id: fakeConsolidatedBalance.partner.ownerId,
          name: fakeConsolidatedBalance.partner.ownerName,
          payments: fakeConsolidatedBalance.partner.payments,
          categories: fakeConsolidatedBalance.partner.categories,
          total: fakeConsolidatedBalance.partnerBalance
        },
        balance: fakeConsolidatedBalance
          .requesterBalance - fakeConsolidatedBalance.partnerBalance
      })

      expect(balanceService.getConsolidatedBalance).toHaveBeenCalledWith({
        userId: 1,
        month: 0,
        year: 2021
      })


    })
  })


})
