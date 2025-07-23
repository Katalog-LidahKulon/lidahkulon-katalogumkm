import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) throw new Error("SECRET_KEY environment variable is not set");

const secret = new TextEncoder().encode(SECRET_KEY);

export async function sign(payload: object): Promise<string> {
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 60 * 60 * 24; // 1 Day
	return await new SignJWT({ ...payload })
		.setProtectedHeader({ alg: "HS256", typ: "JWT" })
		.setIssuedAt(iat)
		.setExpirationTime(exp)
		.sign(secret);
}

export async function read(token: string): Promise<JWTPayload> {
	const { payload } = await jwtVerify(token, secret, {
		algorithms: ["HS256"]
	});
	return payload;
}
