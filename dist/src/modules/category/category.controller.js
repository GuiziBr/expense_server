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
exports.CategoryController = void 0;
const zod_validation_pipe_1 = require("../../infra/http/pipes/zod-validation-pipe");
const category_presenter_1 = require("../../infra/http/presenters/category.presenter");
const common_1 = require("@nestjs/common");
const category_dto_1 = require("./category.dto");
const category_service_1 = require("./category.service");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async listCategories(query) {
        const { offset, limit } = query;
        const categories = await this.categoryService.getAll(offset, limit);
        return categories.map(category_presenter_1.CategoryPresenter.toHttp);
    }
    async getCategoryById(params) {
        const { id } = params;
        const category = await this.categoryService.getById(id);
        if (!category) {
            throw new common_1.NotFoundException();
        }
        return category_presenter_1.CategoryPresenter.toHttp(category) || null;
    }
    async createCategory(body) {
        const { description } = body;
        const category = await this.categoryService.create(description);
        return category_presenter_1.CategoryPresenter.toHttp(category);
    }
    async updateCategory(params, body) {
        const { id } = params;
        const { description } = body;
        const category = await this.categoryService.update(id, description);
        return category_presenter_1.CategoryPresenter.toHttp(category);
    }
    async deleteCategory(params) {
        const { id } = params;
        return this.categoryService.delete(id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(category_dto_1.listCategoriesSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "listCategories", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(category_dto_1.categoryByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(category_dto_1.createCategorySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(category_dto_1.categoryByIdSchema))),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(category_dto_1.createCategorySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(category_dto_1.categoryByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map