export class ErrorResponse extends Error {
	constructor(public statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
		this.name = "ErrorResponse";
	}
}
