"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedUserPresenter = void 0;
class AuthenticatedUserPresenter {
    static toHttp({ user, token }) {
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            },
            token
        };
    }
}
exports.AuthenticatedUserPresenter = AuthenticatedUserPresenter;
//# sourceMappingURL=authenticated-user.presenter.js.map