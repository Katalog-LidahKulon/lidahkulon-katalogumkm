import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
import { ErrorResponse } from "./lib/ErrorResponse";

export const config = {
	matcher: ["/admin/dashboard/:path*"]
};

export async function middleware(req: NextRequest) {
	try {
		await verifyAuth(req);
		return NextResponse.next();
	} catch (e) {
		if (e instanceof ErrorResponse) {
			return NextResponse.json({ success: false, message: e.message }, { status: e.statusCode });
		}
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}
}
