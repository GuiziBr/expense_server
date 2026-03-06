class AppError extends Error {
	public readonly message: string
	public readonly statusCode: number

	constructor(message: string, _statusCode = 400) {
		super(message)
		this.name = "AppError"
	}
}

export default AppError
