export class PaymentTypePresenter {
    static toHttp({ id, description, createdAt, updatedAt, hasStatement }) {
        return {
            id,
            description,
            created_at: createdAt,
            updated_at: updatedAt,
            has_statement: hasStatement
        };
    }
}
//# sourceMappingURL=paymentType.presenter.js.map