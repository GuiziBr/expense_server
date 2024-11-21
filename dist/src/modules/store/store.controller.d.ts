import { CreateStoreDTO, ListStoreDTO, StoreByIdDTO, StoreDTO } from './store.dto';
import { StoreService } from './store.service';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    listStores(query?: ListStoreDTO): Promise<StoreDTO[]>;
    getStoreById(params: StoreByIdDTO): Promise<StoreByIdDTO>;
    createStore(body: CreateStoreDTO): Promise<StoreDTO>;
    updateStore(params: StoreByIdDTO, body: CreateStoreDTO): Promise<StoreDTO>;
    deleteStore(params: StoreByIdDTO): Promise<void>;
}
