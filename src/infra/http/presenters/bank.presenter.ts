import { Bank } from '@/domains/bank.domain'
import { BankDTO } from '@/modules/bank/bank.dto'

export class BankPresenter {
  static toHttp(bank: Bank): BankDTO {
    return {
      id: bank.id,
      name: bank.name,
      createdAt: bank.createdAt,
      updatedAt: bank.updatedAt
    }
  }
}
