export class AuthenticatedUserPresenter {
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
//# sourceMappingURL=authenticated-user.presenter.js.map