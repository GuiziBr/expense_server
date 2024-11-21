"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalancePresenter = void 0;
class BalancePresenter {
    static toConsolidatedBalanceDTO(consolidatedReport) {
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
        };
    }
}
exports.BalancePresenter = BalancePresenter;
//# sourceMappingURL=balance.presenter.js.map