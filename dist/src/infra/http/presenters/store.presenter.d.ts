import { Store } from '@/domains/store.domain';
import { StoreDTO } from '@/modules/store/store.dto';
export declare class StorePresenter {
    static toHttp(store: Store): StoreDTO;
}
