import { GetConsolidatedBalanceResponse } from "../../../modules/balance/balance.dto"
import { BalancePresenter } from "./balance.presenter"

describe("BalancePresenter", () => {
	const requester = {
		ownerId: "requester-id",
		ownerName: "requester-name",
		payments: [],
		categories: [],
		total: 100
	}

	describe("toConsolidatedBalanceDTO", () => {
		it("should include the partner block when a partner is present", () => {
			const consolidatedReport: GetConsolidatedBalanceResponse = {
				userId: "requester-id",
				requesterBalance: 100,
				partnerBalance: 40,
				requester,
				partner: {
					ownerId: "partner-id",
					ownerName: "partner-name",
					payments: [],
					categories: [],
					total: 40
				}
			}

			const result =
				BalancePresenter.toConsolidatedBalanceDTO(consolidatedReport)

			expect(result).toEqual({
				requester: {
					id: "requester-id",
					name: "requester-name",
					payments: [],
					categories: [],
					total: 100
				},
				partner: {
					id: "partner-id",
					name: "partner-name",
					payments: [],
					categories: [],
					total: 40
				},
				balance: 60
			})
		})

		it("should omit the partner block when no partner is present", () => {
			const consolidatedReport = {
				userId: "requester-id",
				requesterBalance: 100,
				partnerBalance: 0,
				requester,
				partner: undefined
			} as unknown as GetConsolidatedBalanceResponse

			const result =
				BalancePresenter.toConsolidatedBalanceDTO(consolidatedReport)

			expect(result).toEqual({
				requester: {
					id: "requester-id",
					name: "requester-name",
					payments: [],
					categories: [],
					total: 100
				},
				balance: 100
			})

			expect(result).not.toHaveProperty("partner")
		})

		it("should default requester and partner payments/categories to empty arrays when missing", () => {
			const consolidatedReport = {
				userId: "requester-id",
				requesterBalance: 100,
				partnerBalance: 40,
				requester: {
					ownerId: "requester-id",
					ownerName: "requester-name",
					total: 100
				},
				partner: {
					ownerId: "partner-id",
					ownerName: "partner-name",
					total: 40
				}
			} as unknown as GetConsolidatedBalanceResponse

			const result =
				BalancePresenter.toConsolidatedBalanceDTO(consolidatedReport)

			expect(result.requester.payments).toEqual([])
			expect(result.requester.categories).toEqual([])
			expect(result.partner?.payments).toEqual([])
			expect(result.partner?.categories).toEqual([])
		})
	})
})
