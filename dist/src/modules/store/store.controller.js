var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query } from "@nestjs/common";
import { ZodValidationPipe } from "../../infra/http/pipes/zod-validation-pipe.js";
import { StorePresenter } from "../../infra/http/presenters/store.presenter.js";
import { createStoreSchema, listStoresSchema, storeByIdSchema } from "./store.dto.js";
import { StoreService } from "./store.service.js";
let StoreController = class StoreController {
    storeService;
    constructor(storeService) {
        this.storeService = storeService;
    }
    async listStores(query) {
        const { offset, limit } = query;
        const stores = await this.storeService.getAll(offset, limit);
        return stores.map(StorePresenter.toHttp);
    }
    async getStoreById(params) {
        const { id } = params;
        const store = await this.storeService.getById(id);
        if (!store) {
            throw new NotFoundException();
        }
        return StorePresenter.toHttp(store) || null;
    }
    async createStore(body) {
        const { name } = body;
        const store = await this.storeService.create(name);
        return StorePresenter.toHttp(store);
    }
    async updateStore(params, body) {
        const { id } = params;
        const { name } = body;
        const store = await this.storeService.update(id, name);
        return StorePresenter.toHttp(store);
    }
    async deleteStore(params) {
        const { id } = params;
        return this.storeService.delete(id);
    }
};
__decorate([
    Get(),
    __param(0, Query(new ZodValidationPipe(listStoresSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "listStores", null);
__decorate([
    Get(":id"),
    __param(0, Param(new ZodValidationPipe(storeByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getStoreById", null);
__decorate([
    Post(),
    __param(0, Body(new ZodValidationPipe(createStoreSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "createStore", null);
__decorate([
    Patch(":id"),
    __param(0, Param(new ZodValidationPipe(storeByIdSchema))),
    __param(1, Body(new ZodValidationPipe(createStoreSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "updateStore", null);
__decorate([
    HttpCode(204),
    Delete(":id"),
    __param(0, Param(new ZodValidationPipe(storeByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "deleteStore", null);
StoreController = __decorate([
    Controller("stores"),
    __metadata("design:paramtypes", [StoreService])
], StoreController);
export { StoreController };
//# sourceMappingURL=store.controller.js.map