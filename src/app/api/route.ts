import { NextResponse } from "next/server";

// Health Check
export async function GET() {
	try {
		return NextResponse.json(
			{
				success: true,
				message: new Date().toISOString()
			},
			{
				status: 200
			}
		);
	} catch (error) {
		console.error("__GET /api__ :", error);
		return NextResponse.json(
			{
				success: false,
				message: "Internal server error"
			},
			{
				status: 500
			}
		);
	}
}
