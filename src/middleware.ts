import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
import { ErrorResponse } from "./lib/ErrorResponse";

export const config = {
	matcher: ["/admin/:path*"]
};

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	try {
		const auth = await verifyAuth(req);

		if (auth && pathname.startsWith("/admin/auth")) {
			return NextResponse.redirect(new URL("/admin/dashboard", req.url));
		}

		return NextResponse.next();
	} catch (e) {
		if (e instanceof ErrorResponse && !pathname.startsWith("/admin/auth")) {
			return NextResponse.redirect(new URL("/admin/auth", req.url));
		}
	}
}
