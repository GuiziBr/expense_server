export class StorePresenter {
    static toHttp(store) {
        return {
            id: store.id,
            name: store.name,
            created_at: store.createdAt,
            updated_at: store.updatedAt
        };
    }
}
//# sourceMappingURL=store.presenter.js.map