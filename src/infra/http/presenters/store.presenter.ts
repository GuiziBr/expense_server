import { Store } from '@/domains/store.domain'
import { StoreDTO } from '@/modules/store/store.dto'

export class StorePresenter {
  static toHttp(store: Store): StoreDTO {
    return {
      id: store.id,
      name: store.name,
      created_at: store.createdAt,
      updated_at: store.updatedAt
    }
  }
}
