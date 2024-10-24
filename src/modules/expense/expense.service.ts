import { DatabaseService } from '@/infra/database/database.service'
import { Injectable, Logger } from '@nestjs/common'
import { CreateExpenseDTO } from './expense.dto'
import { addMonths, endOfMonth, getMonth, getYear, isFuture, setDate } from 'date-fns'
import AppError from '../utils/appError'
import { PaymentTypeService } from '../payment-type/payment-type.service'
import { StatementPeriodService } from '../statement-period/statement-period.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { constants } from '../utils/constants'

@Injectable()
export class ExpenseService {
  private readonly logger = new Logger(ExpenseService.name)

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly paymentTypeService: PaymentTypeService,
    private readonly statementPeriodService: StatementPeriodService
  ) {}

  private calculateNetAmount(amount: number, personal: boolean, split: boolean): number {
    return personal ? amount : (split ? Math.round(amount / 2): amount)
  }

  private async calculateDueDate(
    transactionDate: Date,
    paymentTypeId: string,
    userId: string,
    bankId?: string
  ): Promise<Date> {
    const paymentType = await this.paymentTypeService.getById(paymentTypeId)

    if(!paymentType?.hasStatement) {
      return addMonths(transactionDate, 1)
    }

    if(paymentType?.hasStatement && !bankId) {
      throw new AppError('This payment type must have a bank')
    }

    const statementPeriod = await this.statementPeriodService.findByUserAndBank(
      userId,
      bankId,
      paymentTypeId
    )

    if(!statementPeriod) {
      throw new AppError(
        'No statement period for provided payment type and bank was found'
      )
    }

    const { initialDay, finalDay } = statementPeriod
    const lastDayOfMonth = endOfMonth(transactionDate).getDate()
    const transactionNextMonth = getMonth(transactionDate) + 1
    const statementInitialDate = setDate(transactionDate, Number(initialDay))

    return transactionDate < statementInitialDate
      ? setDate(transactionDate, Number(lastDayOfMonth))
      : new Date(getYear(transactionDate), transactionNextMonth, Number(finalDay) + 1)
  }

  async createExpense(data: CreateExpenseDTO, userId: string): Promise<any> {
    if(isFuture(data.date)) throw new AppError('Date must not be in the future', 400)

    try {
      const netAmount = this.calculateNetAmount(data.amount, data.personal, data.split)

      const dueDate = await this.calculateDueDate(
        data.date,
        data.payment_type_id,
        userId,
        data.bank_id
      )

      const expense = await this.databaseService.expense.create({
        data: {
          ownerId: userId,
          description: data.description,
          date: data.date,
          amount: netAmount,
          categoryId: data.category_id,
          personal: data.personal || false,
          split: data.personal ? false : (data.split || false),
          paymentTypeId: data.payment_type_id,
          bankId: data.bank_id,
          storeId: data.store_id,
          dueDate
        },
        include: {
          category: true,
          paymentType: true,
          bank: true,
          store: true
        }
      })

      return expense

    } catch (error) {
      if(error instanceof AppError) {
        throw error
      }

      if(error instanceof PrismaClientKnownRequestError) {
        this.logger.error(`Error - ${error.code || error} - creating expense`)
        if(error.code === constants.FOREIGN_KEY_VIOLATION) {
          const dbField = error.meta.field_name as string
          const fieldName = dbField.split('_')[1]
          const errorMessage = constants.foreignKeyMessages[fieldName]

          throw new AppError(errorMessage, 400)
        }
        if(error.code === constants.UNIQUE_CONSTRAINT_VIOLATION) {
          throw new AppError(constants.uniqueConstraintMessages.duplicatedExpenses, 400)
        }
      }

      this.logger.error(`Error - ${error.message || error} - creating expense`)
      throw new AppError('Internal server error', 500)

    }
  }
}
