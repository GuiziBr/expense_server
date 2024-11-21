"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorePresenter = void 0;
class StorePresenter {
    static toHttp(store) {
        return {
            id: store.id,
            name: store.name,
            created_at: store.createdAt,
            updated_at: store.updatedAt
        };
    }
}
exports.StorePresenter = StorePresenter;
//# sourceMappingURL=store.presenter.js.map