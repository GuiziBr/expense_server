import { Store } from "../../../domains/store.domain.js"
import { StoreDTO } from "../../../modules/store/store.dto.js"

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
