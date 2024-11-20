import {
  ConsolidatedBalanceDTO,
  GetConsolidatedBalanceResponse
} from '@/modules/balance/balance.dto'

export class BalancePresenter {
  static toConsolidatedBalanceDTO(
    consolidatedReport: GetConsolidatedBalanceResponse
  ): ConsolidatedBalanceDTO {
    return {
      requester: {
        id: consolidatedReport.userId,
        name: consolidatedReport?.requester?.ownerName,
        payments: consolidatedReport?.requester?.payments || [],
        categories: consolidatedReport?.requester?.categories || [],
        total: consolidatedReport?.requesterBalance
      },
      ...consolidatedReport.partner?.ownerId && {
        partner: {
          id: consolidatedReport.partner.ownerId,
          name: consolidatedReport.partner.ownerName,
          payments: consolidatedReport.partner.payments || [],
          categories: consolidatedReport.partner.categories || [],
          total: consolidatedReport.partnerBalance
        }
      },
      balance: consolidatedReport.requesterBalance - consolidatedReport.partnerBalance
    }
  }
}
