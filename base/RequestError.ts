export default class RequestError {
	readonly statusCode: number;

	readonly message: string;

	constructor(statusCode: number, message: string) {
		this.statusCode = statusCode;
		this.message = message;
	}
}
