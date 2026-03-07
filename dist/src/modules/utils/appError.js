"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, _statusCode = 400) {
        super(message);
        this.name = "AppError";
    }
}
exports.default = AppError;
//# sourceMappingURL=appError.js.map