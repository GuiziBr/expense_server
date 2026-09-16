import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	Request,
	Response,
	UseInterceptors
} from "@nestjs/common"
import { Response as Res } from "express"
import { CurrentUserInterceptor } from "../../infra/auth/current-user.interceptor.js"
import { ZodValidationPipe } from "../../infra/http/pipes/zod-validation-pipe.js"
import { ExpensePresenter } from "../../infra/http/presenters/expense.presenter.js"
import {
	CreateExpenseDTO,
	createExpenseSchema,
	ExpenseByIdDTO,
	ExpenseDTO,
	expenseByIdSchema,
	QueryExpenseDTO,
	queryExpenseSchema,
	UpdateExpenseDTO,
	updateExpenseSchema
} from "./expense.dto.js"
import { ExpenseService } from "./expense.service.js"

@Controller("expenses")
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) {}

	/**
	 * Creates a new expense owned by the current user.
	 * @param userId - ID of the currently authenticated user, injected from the request.
	 * @param body - Validated expense creation payload.
	 * @returns The newly created expense, presented as an `ExpenseDTO`.
	 */
	@UseInterceptors(CurrentUserInterceptor)
	@Post()
	async createExpense(
		@Request() { userId },
		@Body(new ZodValidationPipe(createExpenseSchema)) body: CreateExpenseDTO
	): Promise<ExpenseDTO> {
		const expense = await this.expenseService.createExpense(body, userId)
		return ExpensePresenter.toExpenseDTO(expense)
	}

	/**
	 * Retrieves the current user's personal expenses (owned expenses that are
	 * either marked personal/split, or expenses owned by others that are not
	 * personal), filtered and paginated by the provided query.
	 * @param userId - ID of the currently authenticated user, injected from the request.
	 * @param query - Validated query params (date range, pagination, ordering, filtering).
	 * @param res - Express response used to set the `X-Total-Count` header (side effect).
	 * @returns The list of matching expenses, presented as `ExpenseDTO[]`.
	 */
	@UseInterceptors(CurrentUserInterceptor)
	@Get("/personal")
	async getPersonalExpenses(
		@Request() { userId },
		@Query(new ZodValidationPipe(queryExpenseSchema)) query: QueryExpenseDTO,
		@Response({ passthrough: true }) res: Res
	): Promise<ExpenseDTO[]> {
		const { expenses, totalCount } =
			await this.expenseService.getPersonalExpenses({
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
		res.setHeader("X-Total-Count", totalCount)
		return expenses.map(ExpensePresenter.toPersonalExpenseDTO)
	}

	/**
	 * Updates an existing expense.
	 * @param userId - ID of the currently authenticated user, injected from the request.
	 * @param params - Validated route params containing the expense `id`.
	 * @param body - Validated expense update payload.
	 * @returns The updated expense, presented as an `ExpenseDTO`.
	 * @throws {NotFoundException} If the expense does not exist.
	 * @throws {ForbiddenException} If the current user is not the expense owner.
	 * @throws {BadRequestException} If the expense date is in the future.
	 */
	@UseInterceptors(CurrentUserInterceptor)
	@Put(":id")
	async updateExpense(
		@Request() { userId },
		@Param(new ZodValidationPipe(expenseByIdSchema)) params: ExpenseByIdDTO,
		@Body(new ZodValidationPipe(updateExpenseSchema)) body: UpdateExpenseDTO
	): Promise<ExpenseDTO> {
		const expense = await this.expenseService.updateExpense(
			params.id,
			body,
			userId
		)
		return ExpensePresenter.toExpenseDTO(expense)
	}

	/**
	 * Soft-deletes an expense by setting its `deletedAt` timestamp.
	 * @param userId - ID of the currently authenticated user, injected from the request.
	 * @param params - Validated route params containing the expense `id`.
	 * @returns Nothing; responds with HTTP 204 on success.
	 * @throws {NotFoundException} If the expense does not exist.
	 * @throws {ForbiddenException} If the current user is not the expense owner.
	 */
	@UseInterceptors(CurrentUserInterceptor)
	@HttpCode(204)
	@Delete(":id")
	async deleteExpense(
		@Request() { userId },
		@Param(new ZodValidationPipe(expenseByIdSchema)) params: ExpenseByIdDTO
	): Promise<void> {
		return this.expenseService.deleteExpense(params.id, userId)
	}

	/**
	 * Retrieves shared (non-personal) expenses visible to the current user,
	 * filtered and paginated by the provided query.
	 * @param userId - ID of the currently authenticated user, injected from the request, used to
	 * tag each result with whether it is an "income" or "outcome" for this user.
	 * @param query - Validated query params (date range, pagination, ordering, filtering).
	 * @param res - Express response used to set the `X-Total-Count` header (side effect).
	 * @returns The list of matching shared expenses, each annotated with a `type` of
	 * `"income"` or `"outcome"` relative to the current user.
	 */
	@UseInterceptors(CurrentUserInterceptor)
	@Get("/shared")
	async getSharedExpenses(
		@Request() { userId },
		@Query(new ZodValidationPipe(queryExpenseSchema)) query: QueryExpenseDTO,
		@Response({ passthrough: true }) res: Res
	): Promise<(ExpenseDTO & { type: "income" | "outcome" })[]> {
		const { expenses, totalCount } =
			await this.expenseService.getSharedExpenses({
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
		res.setHeader("X-Total-Count", totalCount)
		return expenses.map((expense) =>
			ExpensePresenter.toSharedExpenseDTO(expense, userId)
		)
	}
}
