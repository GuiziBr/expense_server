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
import { CategoryPresenter } from "../../infra/http/presenters/category.presenter.js";
import { categoryByIdSchema, createCategorySchema, listCategoriesSchema } from "./category.dto.js";
import { CategoryService } from "./category.service.js";
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async listCategories(query) {
        const { offset, limit } = query;
        const categories = await this.categoryService.getAll(offset, limit);
        return categories.map(CategoryPresenter.toHttp);
    }
    async getCategoryById(params) {
        const { id } = params;
        const category = await this.categoryService.getById(id);
        if (!category) {
            throw new NotFoundException();
        }
        return CategoryPresenter.toHttp(category) || null;
    }
    async createCategory(body) {
        const { description } = body;
        const category = await this.categoryService.create(description);
        return CategoryPresenter.toHttp(category);
    }
    async updateCategory(params, body) {
        const { id } = params;
        const { description } = body;
        const category = await this.categoryService.update(id, description);
        return CategoryPresenter.toHttp(category);
    }
    async deleteCategory(params) {
        const { id } = params;
        return this.categoryService.delete(id);
    }
};
__decorate([
    Get(),
    __param(0, Query(new ZodValidationPipe(listCategoriesSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "listCategories", null);
__decorate([
    Get(":id"),
    __param(0, Param(new ZodValidationPipe(categoryByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryById", null);
__decorate([
    Post(),
    __param(0, Body(new ZodValidationPipe(createCategorySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    Patch(":id"),
    __param(0, Param(new ZodValidationPipe(categoryByIdSchema))),
    __param(1, Body(new ZodValidationPipe(createCategorySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    HttpCode(204),
    Delete(":id"),
    __param(0, Param(new ZodValidationPipe(categoryByIdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
CategoryController = __decorate([
    Controller("categories"),
    __metadata("design:paramtypes", [CategoryService])
], CategoryController);
export { CategoryController };
//# sourceMappingURL=category.controller.js.map