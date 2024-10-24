import { Body, Controller, Post, Request, UseInterceptors } from '@nestjs/common'
import { ExpenseService } from './expense.service'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreateExpenseDTO, createExpenseSchema } from './expense.dto'
import { CurrentUserInterceptor } from '@/infra/auth/current-user.interceptor'
import { ExpensePresenter } from '@/infra/http/presenters/expense.presenter'


@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService
  ) {}

  @UseInterceptors(CurrentUserInterceptor)
  @Post()
  async createExpense(
  @Request() { userId },
  @Body(new ZodValidationPipe(createExpenseSchema)) body: CreateExpenseDTO
  ):Promise<any> {
    const expense = await this.expenseService.createExpense(body, userId)
    return ExpensePresenter.toExpenseDTO(expense)
  }
}
