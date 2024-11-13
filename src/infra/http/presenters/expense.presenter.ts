import { Expense } from '@/domains/expense.domain'
import { ExpenseDTO } from '@/modules/expense/expense.dto'

export class ExpensePresenter {
  static toExpenseDTO(expense: Expense): ExpenseDTO {
    return {
      id: expense.id,
      description: expense.description,
      date: expense.date,
      amount: expense.amount,
      split: expense.split,
      personal: expense.personal,
      due_date: expense.dueDate,
      owner_id: expense.ownerId,
      category_id: expense.categoryId,
      payment_type_id: expense.paymentTypeId,
      bank_id: expense.bankId,
      store_id: expense.storeId,
      created_at: expense.createdAt,
      category: {
        description: expense.category.description
      },
      payment_type: {
        description: expense.paymentType.description
      },
      ...expense.bank && {
        bank: {
          name: expense.bank.name
        }
      },
      ...expense.store && {
        store: {
          name: expense.store.name
        }
      }
    }
  }

  static toPersonalExpenseDTO(
    expense: Expense
  ): ExpenseDTO {
    return ExpensePresenter.toExpenseDTO(expense)
  }

  static toSharedExpenseDTO(
    expense: Expense,
    ownerId: string
  ):  ExpenseDTO & { type: 'income' | 'outcome'}   {
    const formattedExpense = this.toExpenseDTO(expense)
    return {
      ...formattedExpense,
      type: expense.ownerId === ownerId ? 'income' : 'outcome'
    }
  }
}
