"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankPresenter = void 0;
class BankPresenter {
    static toHttp(bank) {
        return {
            id: bank.id,
            name: bank.name,
            created_at: bank.createdAt,
            updated_at: bank.updatedAt
        };
    }
}
exports.BankPresenter = BankPresenter;
//# sourceMappingURL=bank.presenter.js.map