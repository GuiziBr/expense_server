var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CategoryService_1;
import { Injectable, Logger } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DatabaseService } from "../../infra/database/database.service.js";
import AppError from "../utils/appError.js";
import { constants } from "../utils/constants.js";
let CategoryService = CategoryService_1 = class CategoryService {
    databaseService;
    logger = new Logger(CategoryService_1.name);
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getAll(offset, limit) {
        try {
            const categories = await this.databaseService.category.findMany({
                where: { deletedAt: null },
                skip: offset,
                take: limit,
                orderBy: { description: "asc" }
            });
            return categories;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting all categories`);
            throw new AppError("Internal server error", 500);
        }
    }
    async getById(id) {
        try {
            const category = await this.databaseService.category.findUnique({
                where: { id, deletedAt: null }
            });
            return category;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - getting category by id ${id}`);
            throw new AppError("Internal server error", 500);
        }
    }
    async create(description) {
        try {
            const category = await this.databaseService.category.upsert({
                where: { description },
                update: { description, deletedAt: null },
                create: { description }
            });
            return category;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - creating category ${description}`);
            throw new AppError("Internal server error", 500);
        }
    }
    async update(id, description) {
        try {
            const [category, sameDescriptionCategory] = await Promise.all([
                this.databaseService.category.findUnique({ where: { id } }),
                this.databaseService.category.findUnique({ where: { description } })
            ]);
            if (!category) {
                this.logger.error(`Category ${id} not found`);
                throw new AppError("Category not found", 404);
            }
            if ((category && !sameDescriptionCategory) ||
                sameDescriptionCategory?.id === id) {
                const updatedCategory = await this.databaseService.category.update({
                    where: { id },
                    data: { description, deletedAt: null }
                });
                return updatedCategory;
            }
            if (sameDescriptionCategory) {
                if (!sameDescriptionCategory?.deletedAt) {
                    this.logger.error(`Category with description "${description}" already exists`);
                    throw new AppError("There is already a category with same description", 400);
                }
            }
            const reactivatedCategory = await this.reactivateCategory(id, sameDescriptionCategory.id);
            return reactivatedCategory;
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            this.logger.error(`Error - ${error.message || error} - updating category ${id}`);
            throw new AppError("Internal server error", 500);
        }
    }
    async delete(id) {
        try {
            await this.databaseService.category.update({
                where: { id },
                data: { deletedAt: new Date() }
            });
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError &&
                error.code === constants.RECORD_NOT_FOUND) {
                return;
            }
            this.logger.error(`Error - ${error.message || error} - deleting category ${id}`);
            throw new AppError("Internal server error", 500);
        }
    }
    async reactivateCategory(categoryIdToDelete, categoryIdToRestore) {
        try {
            const [, reactivatedCategory] = await Promise.all([
                this.delete(categoryIdToDelete),
                this.databaseService.category.update({
                    where: { id: categoryIdToRestore },
                    data: { deletedAt: null }
                })
            ]);
            return reactivatedCategory;
        }
        catch (error) {
            this.logger.error(`Error - ${error.message || error} - reactivating category ${categoryIdToDelete}`);
            throw new AppError("Internal server error", 500);
        }
    }
};
CategoryService = CategoryService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DatabaseService])
], CategoryService);
export { CategoryService };
//# sourceMappingURL=category.service.js.map