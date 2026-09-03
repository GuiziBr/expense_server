class AppError extends Error {
    message;
    statusCode;
    constructor(message, _statusCode = 400) {
        super(message);
        this.name = "AppError";
    }
}
export default AppError;
//# sourceMappingURL=appError.js.map