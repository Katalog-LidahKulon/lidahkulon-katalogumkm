import { NextRequest, NextResponse } from "next/server";
import { verify } from "@/lib/jwt";

export const verifyAuth = (req: NextRequest) => {
	const token = req.cookies.get("token")?.value;
	if (!token) {
		return NextResponse.json({ success: false, message: "Authentication token is missing" }, { status: 401 });
	}

	try {
		const decoded = verify(token);
		return decoded;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return NextResponse.json({ success: false, message: "Invalid or expired authentication token" }, { status: 403 });
	}
};
