"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPresenter = void 0;
class CategoryPresenter {
    static toHttp(category) {
        return {
            id: category.id,
            description: category.description,
            created_at: category.createdAt,
            updated_at: category.updatedAt
        };
    }
}
exports.CategoryPresenter = CategoryPresenter;
//# sourceMappingURL=category.presenter.js.map