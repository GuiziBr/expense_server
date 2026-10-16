import { Response as Res } from "express";
import { CreateStoreDTO, ListStoreDTO, StoreByIdDTO, StoreDTO } from "./store.dto.js";
import { StoreService } from "./store.service.js";
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    listStores(query: ListStoreDTO, res: Res): Promise<StoreDTO[]>;
    getStoreById(params: StoreByIdDTO): Promise<StoreByIdDTO>;
    createStore(body: CreateStoreDTO): Promise<StoreDTO>;
    updateStore(params: StoreByIdDTO, body: CreateStoreDTO): Promise<StoreDTO>;
    deleteStore(params: StoreByIdDTO): Promise<void>;
}
