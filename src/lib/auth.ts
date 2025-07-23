import { ErrorResponse } from "./ErrorResponse";
import { NextRequest } from "next/server";
import { read } from "@/lib/joseHelper";

export const verifyAuth = async (req: NextRequest) => {
	const token = req.cookies.get("token")?.value;
	if (!token) {
		throw new ErrorResponse(401, "Unauthenticated");
	}

	try {
		const payload = await read(token);
		return payload;
	} catch {
		throw new ErrorResponse(403, "Invalid or expired authentication");
	}
};
