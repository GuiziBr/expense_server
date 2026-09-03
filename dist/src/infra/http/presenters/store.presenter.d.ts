import { Store } from "../../../domains/store.domain.js";
import { StoreDTO } from "../../../modules/store/store.dto.js";
export declare class StorePresenter {
    static toHttp(store: Store): StoreDTO;
}
