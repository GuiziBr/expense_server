export class CategoryPresenter {
    static toHttp(category) {
        return {
            id: category.id,
            description: category.description,
            created_at: category.createdAt,
            updated_at: category.updatedAt
        };
    }
}
//# sourceMappingURL=category.presenter.js.map