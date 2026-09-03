var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StoreService_1;
import { Injectable, Logger } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DatabaseService } from "../../infra/database/database.service.js";
import AppError from "../utils/appError.js";
import { constants } from "../utils/constants.js";
let StoreService = StoreService_1 = class StoreService {
    databaseService;
    logger = new Logger(StoreService_1.name);
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getAll(offset, limit) {
        try {
            const stores = await this.databaseService.store.findMany({
                where: { deletedAt: null },
                skip: offset,
                take: limit,
                orderBy: { name: "asc" }
            });
            return stores;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting all stores`);
            throw new AppError("Internal server error", 500);
        }
    }
    async getById(id) {
        try {
            const store = await this.databaseService.store.findUnique({
                where: { id, deletedAt: null }
            });
            return store;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting store by id ${id}`);
            throw new AppError("Internal server error", 500);
        }
    }
    async create(name) {
        try {
            const store = await this.databaseService.store.upsert({
                where: { name },
                update: { name, deletedAt: null },
                create: { name }
            });
            return store;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - creating store ${name}`);
            throw new AppError("Internal server error", 500);
        }
    }
    async update(id, name) {
        try {
            const [store, sameNameStore] = await Promise.all([
                this.databaseService.store.findUnique({ where: { id } }),
                this.databaseService.store.findUnique({ where: { name } })
            ]);
            if (!store) {
                this.logger.error(`Store ${id} not found`);
                throw new AppError("Store not found", 404);
            }
            if ((store && !sameNameStore) || sameNameStore?.id === id) {
                const updatedStore = await this.databaseService.store.update({
                    where: { id },
                    data: { name, deletedAt: null }
                });
                return updatedStore;
            }
            if (sameNameStore) {
                if (!sameNameStore?.deletedAt) {
                    this.logger.error(`Store with name "${name}" already exists`);
                    throw new AppError("There is already a store with same name", 400);
                }
            }
            const reactivatedStore = await this.reactivateStore(id, sameNameStore.id);
            return reactivatedStore;
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            this.logger.error(`Error - ${error.message || error} - updating store ${id}`);
            throw new AppError("Internal server error", 500);
        }
    }
    async delete(id) {
        try {
            await this.databaseService.store.update({
                where: { id },
                data: { deletedAt: new Date() }
            });
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError &&
                error.code === constants.RECORD_NOT_FOUND) {
                return;
            }
            this.logger.error(`Error - ${error.message || error} - deleting store ${id}`);
            throw new AppError("Internal server error", 500);
        }
    }
    async reactivateStore(storeIdToDelete, storeIdToRestore) {
        try {
            const [, reactivatedStore] = await Promise.all([
                this.delete(storeIdToDelete),
                this.databaseService.store.update({
                    where: { id: storeIdToRestore },
                    data: { deletedAt: null }
                })
            ]);
            return reactivatedStore;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - reactivating store ${storeIdToDelete}`);
            throw new AppError("Internal server error", 500);
        }
    }
};
StoreService = StoreService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DatabaseService])
], StoreService);
export { StoreService };
//# sourceMappingURL=store.service.js.map