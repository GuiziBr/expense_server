import { PaymentType } from '@/domains/payment-type.domain'
import { PaymentTypeDTO } from '@/modules/payment-type/payment-type.dto'

export class PaymentTypePresenter {
  static toHttp({
    id,
    description,
    createdAt,
    updatedAt,
    hasStatement
  }: PaymentType): PaymentTypeDTO {
    return {
      id,
      description,
      createdAt,
      updatedAt,
      hasStatement
    }
  }
}
