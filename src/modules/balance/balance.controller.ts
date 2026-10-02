import {
	Controller,
	Get,
	Param,
	Query,
	Request,
	UseInterceptors
} from "@nestjs/common"
import { CurrentUserInterceptor } from "../../infra/auth/current-user.interceptor.js"
import { ZodValidationPipe } from "../../infra/http/pipes/zod-validation-pipe.js"
import { BalancePresenter } from "../../infra/http/presenters/balance.presenter.js"
import {
	ConsolidatedBalanceDTO,
	GetBalanceBreakdownResponse,
	GetBalanceResponse,
	QueryBalanceBreakdownDTO,
	QueryBalanceDTO,
	QueryConsolidatedBalanceDTO,
	queryBalanceBreakdownSchema,
	queryBalanceSchema,
	queryConsolidatedBalanceSchema
} from "./balance.dto.js"
import { BalanceService } from "./balance.service.js"

@Controller("balance")
export class BalanceController {
	constructor(private readonly balanceService: BalanceService) {}

	/**
	 * Retrieves the personal and shared balance for the currently
	 * authenticated user, optionally filtered by date range and other
	 * criteria. Requires an authenticated request (populated by
	 * {@link CurrentUserInterceptor}). The query string is validated
	 * against `queryBalanceSchema`.
	 * @param request - The incoming request, from which the current `userId` is extracted.
	 * @param query - Validated query parameters (date range and filters).
	 * @returns The computed personal and shared balance.
	 */
	@UseInterceptors(CurrentUserInterceptor)
	@Get()
	async getBalance(
		@Request() { userId },
		@Query(new ZodValidationPipe(queryBalanceSchema)) query: QueryBalanceDTO
	): Promise<GetBalanceResponse> {
		return this.balanceService.getBalance({
			ownerId: userId,
			startDate: query.startDate,
			endDate: query.endDate,
			filterBy: query.filterBy,
			filterValue: query.filterValue
		})
	}

	/**
	 * Retrieves the consolidated balance report for a given year/month,
	 * comparing the requesting user against their partner. Requires an
	 * authenticated request (populated by {@link CurrentUserInterceptor}).
	 * Route params are validated against `queryConsolidatedBalanceSchema`.
	 * @param request - The incoming request, from which the current `userId` is extracted.
	 * @param params - The route params, containing `year` and `month` (1-indexed month).
	 * @returns The consolidated balance report, presented via {@link BalancePresenter}.
	 */
	@UseInterceptors(CurrentUserInterceptor)
	@Get("/consolidated/:year/:month")
	async getConsolidatedBalance(
		@Request() { userId },
		@Param(new ZodValidationPipe(queryConsolidatedBalanceSchema))
		params: QueryConsolidatedBalanceDTO
	): Promise<ConsolidatedBalanceDTO> {
		const monthValue = Number(params.month) - 1
		const yearValue = Number(params.year)
		const consolidatedBalance =
			await this.balanceService.getConsolidatedBalance({
				userId,
				month: monthValue,
				year: yearValue
			})
		return BalancePresenter.toConsolidatedBalanceDTO(consolidatedBalance)
	}

	/**
	 * Retrieves the current user's personal expense totals for a given
	 * year/month, grouped by a single filter type. Requires an authenticated
	 * request (populated by {@link CurrentUserInterceptor}). Route params are
	 * validated against `queryConsolidatedBalanceSchema` and the query string
	 * against `queryBalanceBreakdownSchema`.
	 * @param request - The incoming request, from which the current `userId` is extracted.
	 * @param params - The route params, containing `year` and `month` (1-indexed month).
	 * @param query - Validated query parameters, containing the `filterBy` type.
	 * @returns One entry per filter value with its id, label, and total.
	 */
	@UseInterceptors(CurrentUserInterceptor)
	@Get("/breakdown/:year/:month")
	async getBalanceBreakdown(
		@Request() { userId },
		@Param(new ZodValidationPipe(queryConsolidatedBalanceSchema))
		params: QueryConsolidatedBalanceDTO,
		@Query(new ZodValidationPipe(queryBalanceBreakdownSchema))
		query: QueryBalanceBreakdownDTO
	): Promise<GetBalanceBreakdownResponse> {
		return this.balanceService.getBalanceBreakdown({
			userId,
			month: Number(params.month) - 1,
			year: Number(params.year),
			filterBy: query.filterBy
		})
	}
}
