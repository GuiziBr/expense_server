export function errorMessage(error) {
    if (error instanceof Error && error.message) {
        return error.message;
    }
    if (typeof error === "object" && error !== null && "message" in error) {
        const { message } = error;
        if (typeof message === "string" && message) {
            return message;
        }
    }
    return String(error);
}
//# sourceMappingURL=error-message.js.map