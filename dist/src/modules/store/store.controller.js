"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const zod_validation_pipe_1 = require("../../infra/http/pipes/zod-validation-pipe");
const store_presenter_1 = require("../../infra/http/presenters/store.presenter");
const common_1 = require("@nestjs/common");
const store_dto_1 = require("./store.dto");
const store_service_1 = require("./store.service");
let StoreController = class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    async listStores(query) {
        const { offset, limit } = query;
        const stores = await this.storeService.getAll(offset, limit);
        return stores.map(store_presenter_1.StorePresenter.toHttp);
    }
    async getStoreById(params) {
        const { id } = params;
        const store = await this.storeService.getById(id);
        if (!store) {
            throw new common_1.NotFoundException();
        }
        return store_presenter_1.StorePresenter.toHttp(store) || null;
    }
    async createStore(body) {
        const { name } = body;
        const store = await this.storeService.create(name);
        return store_presenter_1.StorePresenter.toHttp(store);
    }
    async updateStore(params, body) {
        const { id } = params;
        const { name } = body;
        const store = await this.storeService.update(id, name);
        return store_presenter_1.StorePresenter.toHttp(store);
    }
    async deleteStore(params) {
        const { id } = params;
        return this.storeService.delete(id);
    }
};
exports.StoreController = StoreController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(store_dto_1.listStoresSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "listStores", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(store_dto_1.storeByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getStoreById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(store_dto_1.createStoreSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "createStore", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(store_dto_1.storeByIdSchema))),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(store_dto_1.createStoreSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "updateStore", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(store_dto_1.storeByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "deleteStore", null);
exports.StoreController = StoreController = __decorate([
    (0, common_1.Controller)('stores'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map