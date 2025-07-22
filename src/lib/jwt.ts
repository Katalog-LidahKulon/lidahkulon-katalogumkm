import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!;
if (!SECRET_KEY) {
	throw new Error("SECRET_KEY environment variable is not set");
}

export function sign(payload: object) {
	return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}

export function verify(token: string) {
	return jwt.verify(token, SECRET_KEY);
}

export function decode(token: string) {
	return jwt.decode(token);
}
