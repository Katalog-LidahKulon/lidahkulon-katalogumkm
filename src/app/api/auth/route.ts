import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { AuthSchema } from "@/validations/AuthSchema";
import { sign } from "@/lib/jwt";
import { z } from "zod";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
if (!ADMIN_PASSWORD) {
	throw new Error("ADMIN_PASSWORD environment variable is not configured");
}

function safeCompare(input: string, secret: string): boolean {
	try {
		const bufInput = Buffer.from(input, "utf-8");
		const bufSecret = Buffer.from(secret, "utf-8");
		if (bufInput.length !== bufSecret.length) {
			return false;
		}
		return timingSafeEqual(bufInput, bufSecret);
	} catch (e) {
		console.error("safeCompare error:", e);
		return false;
	}
}

// Admin Authentication
export async function POST(request: NextRequest) {
	try {
		let reqBody: unknown;
		try {
			reqBody = await request.json();
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			return NextResponse.json({ success: false, message: "Invalid JSON data" }, { status: 400 });
		}

		const parsedBody = AuthSchema.parse(reqBody);

		if (!safeCompare(parsedBody.password, ADMIN_PASSWORD)) {
			return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
		}

		const token = sign({ time: Date.now() });

		const response = NextResponse.json({ success: true }, { status: 200 });
		response.cookies.set({
			name: "token",
			value: token,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/",
			maxAge: 60 * 60 * 24 * 1 // 1 Day
		});
		return response;
	} catch (e) {
		if (e instanceof z.ZodError) {
			return NextResponse.json(
				{
					success: false,
					message: z.prettifyError(e)
				},
				{ status: 400 }
			);
		}

		console.error("Error in POST /api/auth:", e);
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}
}
