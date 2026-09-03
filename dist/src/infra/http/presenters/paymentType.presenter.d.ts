import { PaymentType } from "../../../domains/payment-type.domain.js";
import { PaymentTypeDTO } from "../../../modules/payment-type/payment-type.dto.js";
export declare class PaymentTypePresenter {
    static toHttp({ id, description, createdAt, updatedAt, hasStatement }: PaymentType): PaymentTypeDTO;
}
