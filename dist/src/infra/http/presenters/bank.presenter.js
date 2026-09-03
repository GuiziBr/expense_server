export class BankPresenter {
    static toHttp(bank) {
        return {
            id: bank.id,
            name: bank.name,
            created_at: bank.createdAt,
            updated_at: bank.updatedAt
        };
    }
}
//# sourceMappingURL=bank.presenter.js.map