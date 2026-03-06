import {
	Controller,
	Get,
	Param,
	Query,
	Request,
	UseInterceptors
} from "@nestjs/common"
import { CurrentUserInterceptor } from "@/infra/auth/current-user.interceptor"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"
import { BalancePresenter } from "@/infra/http/presenters/balance.presenter"
import {
	ConsolidatedBalanceDTO,
	GetBalanceResponse,
	QueryBalanceDTO,
	QueryConsolidatedBalanceDTO,
	queryBalanceSchema,
	queryConsolidatedBalanceSchema
} from "./balance.dto"
import { BalanceService } from "./balance.service"

@Controller("balance")
export class BalanceController {
	constructor(private readonly balanceService: BalanceService) {}

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
}
