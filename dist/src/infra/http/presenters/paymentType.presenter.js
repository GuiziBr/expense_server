"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTypePresenter = void 0;
class PaymentTypePresenter {
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
exports.PaymentTypePresenter = PaymentTypePresenter;
//# sourceMappingURL=paymentType.presenter.js.map