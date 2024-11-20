import { Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ExpenseService } from '../expense/expense.service'
import { createExpense } from '../test-utils/expense.factory'
import { BalanceService } from './balance.service'
import { endOfMonth } from 'date-fns'

describe('BalanceService', () => {
  let balanceService: BalanceService
  let expenseService: ExpenseService
  let loggerSpy: ReturnType<typeof vi.spyOn>

  const fakeExpenses = [
    createExpense({ ownerId: 'owner-id' }),
    createExpense({ ownerId: 'owner-id-2' })
  ]

  const fakePersonalExpenses = {
    expenses: [{ amount: 10 }]
  }
  const fakeSharedExpenses = {
    expenses: [
      { ownerId: 'owner-id', amount: 5 },
      { ownerId: 'owner-id-2', amount: 10 }
    ]
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BalanceService,
        {
          provide: ExpenseService,
          useValue: {
            getPersonalExpenses: vi.fn().mockResolvedValue(fakePersonalExpenses),
            getSharedExpenses: vi.fn().mockResolvedValue(fakeSharedExpenses),
            getExpensesByDateRange: vi.fn().mockResolvedValue(fakeExpenses)
          }
        }
      ]
    }).compile()

    balanceService = module.get<BalanceService>(BalanceService)
    expenseService = module.get<ExpenseService>(ExpenseService)
    loggerSpy = vi.spyOn(Logger.prototype, 'error')
  })

  describe('getBalance', () => {
    it('should throw error if error getting personal expenses', async () => {
      const payload = {
        ownerId: 'owner-id',
        startDate: new Date(),
        endDate: new Date()
      }

      vi.spyOn(expenseService, 'getPersonalExpenses')
        .mockRejectedValue(new Error('Expenses error'))

      await expect(balanceService.getBalance(payload)).rejects.toThrow()
      expect(expenseService.getPersonalExpenses).toHaveBeenCalledWith(payload)
      expect(loggerSpy).toHaveBeenCalledWith('Error - Expenses error - getting balance')
    })

    it('should get balance for same owner', async () => {
      const payload = {
        ownerId: 'owner-id',
        startDate: new Date(),
        endDate: new Date()
      }

      const result = await balanceService.getBalance(payload)

      expect(result).toEqual({
        personalBalance: 10,
        sharedBalance: {
          paying: 5,
          payed: 10,
          total: -5
        }
      })

      expect(expenseService.getPersonalExpenses).toHaveBeenCalledWith(payload)
      expect(expenseService.getSharedExpenses).toHaveBeenCalledWith(payload)
    })

    it('should get balance for different owner', async () => {
      const payload = {
        ownerId: 'owner-id-2',
        startDate: new Date(),
        endDate: new Date()
      }

      const result = await balanceService.getBalance(payload)

      expect(result).toEqual({
        personalBalance: 10,
        sharedBalance: {
          paying: 10,
          payed: 5,
          total: 5
        }
      })

      expect(expenseService.getPersonalExpenses).toHaveBeenCalledWith(payload)
      expect(expenseService.getSharedExpenses).toHaveBeenCalledWith(payload)
    })
  })

  describe('getConsolidatedBalance', () => {
    it('should throw error if error getting expenses', async () => {
      const payload = {
        year: 2022,
        month: 1,
        userId: 'owner-id'
      }

      vi.spyOn(expenseService, 'getExpensesByDateRange')
        .mockRejectedValue(new Error('Expenses error'))

      await expect(
        balanceService.getConsolidatedBalance(payload)
      ).rejects.toThrow('Error getting consolidated balance')

      expect(expenseService.getExpensesByDateRange).toHaveBeenCalledWith(
        false,
        new Date(2022, 1, 1),
        endOfMonth(new Date(2022, 1, 1))
      )
      expect(loggerSpy).toHaveBeenCalledWith(
        'Error - Expenses error - getting consolidated balance'
      )
    })

    it('should get consolidated balance', async () => {
      const payload = {
        year: 2022,
        month: 1,
        userId: 'owner-id'
      }

      const result = await balanceService.getConsolidatedBalance(payload)

      expect(result).toEqual({
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
      })
    })
  })
})
