declare class AppError extends Error {
    readonly message: string;
    readonly statusCode: number;
    constructor(message: string, _statusCode?: number);
}
export default AppError;
