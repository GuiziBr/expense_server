import { Bank } from '@/domains/bank.domain'
import { BankDTO } from '@/modules/bank/bank.dto'

export class BankPresenter {
  static toHttp(bank: Bank): BankDTO {
    return {
      id: bank.id,
      name: bank.name,
      created_at: bank.createdAt,
      updated_at: bank.updatedAt
    }
  }
}
