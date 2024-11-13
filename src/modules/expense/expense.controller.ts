import { CurrentUserInterceptor } from '@/infra/auth/current-user.interceptor'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ExpensePresenter } from '@/infra/http/presenters/expense.presenter'
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  Response,
  UseInterceptors
} from '@nestjs/common'
import { Response as Res } from 'express'
import {
  CreateExpenseDTO,
  createExpenseSchema,
  ExpenseDTO,
  QueryExpenseDTO,
  queryExpenseSchema
} from './expense.dto'
import { ExpenseService } from './expense.service'

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
  ):Promise<ExpenseDTO> {
    const expense = await this.expenseService.createExpense(body, userId)
    return ExpensePresenter.toExpenseDTO(expense)
  }

  @UseInterceptors(CurrentUserInterceptor)
  @Get('/personal')
  async getPersonalExpenses(
    @Request() { userId },
    @Query(new ZodValidationPipe(queryExpenseSchema)) query: QueryExpenseDTO,
    @Response({ passthrough: true }) res: Res
  ): Promise<any> {
    const { expenses, totalCount } = await this.expenseService.getPersonalExpenses({
      ownerId: userId,
      startDate: query.startDate,
      endDate: query.endDate,
      offset: query.offset,
      limit: query.limit,
      orderBy: query.orderBy,
      orderType: query.orderType,
      filterBy: query.filterBy,
      filterValue: query.filterValue
    })
    res.setHeader('X-Total-Count', totalCount)
    return expenses.map(ExpensePresenter.toPersonalExpenseDTO)
  }

  @UseInterceptors(CurrentUserInterceptor)
  @Get('/shared')
  async getSharedExpenses(
    @Request() { userId },
    @Query(new ZodValidationPipe(queryExpenseSchema)) query: QueryExpenseDTO,
    @Response({ passthrough: true }) res: Res
  ): Promise<any> {
    const { expenses, totalCount } = await this.expenseService.getSharedExpenses({
      ownerId: userId,
      startDate: query.startDate,
      endDate: query.endDate,
      offset: query.offset,
      limit: query.limit,
      orderBy: query.orderBy,
      orderType: query.orderType,
      filterBy: query.filterBy,
      filterValue: query.filterValue
    })
    res.setHeader('X-Total-Count', totalCount)
    return expenses.map(expense => ExpensePresenter.toSharedExpenseDTO(expense, userId))
  }
}
