import { PaymentType } from '@/domains/payment-type.domain';
import { PaymentTypeDTO } from '@/modules/payment-type/payment-type.dto';
export declare class PaymentTypePresenter {
    static toHttp({ id, description, createdAt, updatedAt, hasStatement }: PaymentType): PaymentTypeDTO;
}
