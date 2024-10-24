import { Test } from '@nestjs/testing'
import { createExpense } from '../test-utils/expense.factory'
import { ExpenseController } from './expense.controller'
import { ExpenseService } from './expense.service'
import { CurrentUserInterceptor } from '@/infra/auth/current-user.interceptor'


describe('ExpenseController', () => {
  let expenseController: ExpenseController
  let expenseService: ExpenseService
  const fakeExpense = createExpense()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        {
          provide: ExpenseService,
          useValue: {
            createExpense: vi.fn().mockResolvedValue(fakeExpense)
          }
        }
      ]
    })
      .overrideInterceptor(CurrentUserInterceptor)
      .useValue({})
      .compile()

    expenseController = module.get<ExpenseController>(ExpenseController)
    expenseService = module.get<ExpenseService>(ExpenseService)
  })

  describe('createExpense', () => {
    it('should create an expense', async () => {
      const payload = {
        description: 'description',
        date: new Date(),
        amount: 1,
        category_id: 'category_id',
        payment_type_id: 'payment_type_id',
        bank_id: 'bank_id',
        store_id: 'store_id',
        personal: true,
        split: true
      }

      const result = await expenseController.createExpense({ userId: 'userId' }, payload)

      expect(result).toEqual({
        id: fakeExpense.id,
        description: fakeExpense.description,
        date: fakeExpense.date,
        amount: fakeExpense.amount,
        category_id: fakeExpense.categoryId,
        payment_type_id: fakeExpense.paymentTypeId,
        bank_id: fakeExpense.bankId,
        store_id: fakeExpense.storeId,
        personal: fakeExpense.personal,
        split: fakeExpense.split,
        created_at: fakeExpense.createdAt,
        updated_at: fakeExpense.updatedAt,
        category: {
          description: fakeExpense.category.description
        },
        payment_type: {
          description: fakeExpense.paymentType.description
        },
        bank: {
          name: fakeExpense.bank.name
        },
        store: {
          name: fakeExpense.store.name
        },
        owner_id: fakeExpense.ownerId,
        due_date: fakeExpense.dueDate
      })

      expect(expenseService.createExpense).toBeCalledWith(payload, 'userId')
    })
  })

})
