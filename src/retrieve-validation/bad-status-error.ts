class BadStatusError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);

		this.statusCode = statusCode;
		this.name = 'BadStatusError';
	}
}

export default BadStatusError;
