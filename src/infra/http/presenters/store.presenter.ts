import { Store } from '@/domains/store.domain'
import { StoreDTO } from '@/modules/store/store.dto'

export class StorePresenter {
  static toHttp(store: Store): StoreDTO {
    return {
      id: store.id,
      name: store.name,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt
    }
  }
}
