import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { AuthSchema } from "@/validations/AuthSchema";

// TODO: JWT Token based authentication & cookie-based session management

enum ErrorMessage {
	MissingEnv = "ADMIN_PASSWORD environment variable is not configured",
	InvalidJson = "Invalid JSON body",
	Unauthorized = "Invalid password",
	ServerError = "Internal server error"
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
if (!ADMIN_PASSWORD) {
	throw new Error(ErrorMessage.MissingEnv);
}

function safeCompare(input: string, secret: string): boolean {
	try {
		const bufInput = Buffer.from(input, "utf-8");
		const bufSecret = Buffer.from(secret, "utf-8");
		if (bufInput.length !== bufSecret.length) {
			return false;
		}
		return timingSafeEqual(bufInput, bufSecret);
	} catch (err) {
		console.error("safeCompare error:", err);
		return false;
	}
}

// Admin Authentication
export async function POST(request: NextRequest) {
	let json: unknown;

	try {
		json = await request.json();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return NextResponse.json({ success: false, message: ErrorMessage.InvalidJson }, { status: 400 });
	}

	const parse = AuthSchema.safeParse(json);
	if (!parse.success) {
		return NextResponse.json(
			{
				success: false,
				message: JSON.parse(parse.error.message)
					.map((e: { message: string }) => e.message)
					.join(", ")
			},
			{ status: 400 }
		);
	}

	const { password } = parse.data;

	if (!safeCompare(password, ADMIN_PASSWORD)) {
		return NextResponse.json({ success: false, message: ErrorMessage.Unauthorized }, { status: 401 });
	}

	return NextResponse.json({ success: true, message: "Authentication successful" }, { status: 200 });
}
