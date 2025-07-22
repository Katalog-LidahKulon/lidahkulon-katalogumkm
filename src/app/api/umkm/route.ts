import type { Firestore } from "@google-cloud/firestore";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
import { firestore } from "@/lib/gcp";
import { cloudStorage } from "@/lib/CloudStorage";
import z from "zod";
import { CreateUmkmSchema } from "@/validations/UmkmSchema";
import { createFileSchema } from "@/validations/zodHelper";
import { verifyAuth } from "@/lib/auth";

// Get All UMKM Data
export async function GET() {
	try {
		const snapshot = await (firestore as Firestore).collection("umkm").get();
		const data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Record<string, unknown>)
		}));
		return NextResponse.json({ success: true, data });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		console.error("__GET /api/umkm__ :", e);
		return NextResponse.json({ success: false, message: e?.message }, { status: 500 });
	}
}

// Create New UMKM Entry
export async function POST(req: NextRequest) {
	const auth = verifyAuth(req);
	if (auth instanceof NextResponse) {
		return auth;
	}

	const ImgSchema = createFileSchema(10, ["image/jpeg", "image/jpg", "image/png", "image/webp"], true);

	try {
		const form = await req.formData();
		const id = `umkm-${uuid()}`;

		const docData = {
			id,
			created_at: new Date(),

			name: form.get("name"),
			owner: form.get("owner"),
			description: form.get("description"),
			address: form.get("address"),

			contacts: {
				phone: form.get("phone"),
				email: form.get("email")
			},

			links: {
				instagram: form.get("instagram"),
				tiktok: form.get("tiktok"),
				facebook: form.get("facebook"),
				youtube: form.get("youtube"),
				website: form.get("website")
			},

			images: {}
		};

		CreateUmkmSchema.parse(docData);

		const imagesData = {
			thumbnail: await cloudStorage.save(
				form.get("img_tn") ? ImgSchema.parse(form.get("img_tn")) : null,
				`umkm/${id}/tn-${Date.now()}-`
			),
			background: await cloudStorage.save(
				form.get("img_bg") ? ImgSchema.parse(form.get("img_bg")) : null,
				`umkm/${id}/bg-${Date.now()}-`
			),
			products: {
				"1": await cloudStorage.save(
					form.get("img_pd_1") ? ImgSchema.parse(form.get("img_pd_1")) : null,
					`umkm/${id}/pd_1-${Date.now()}-`
				),
				"2": await cloudStorage.save(
					form.get("img_pd_2") ? ImgSchema.parse(form.get("img_pd_2")) : null,
					`umkm/${id}/pd_2-${Date.now()}-`
				),
				"3": await cloudStorage.save(
					form.get("img_pd_3") ? ImgSchema.parse(form.get("img_pd_3")) : null,
					`umkm/${id}/pd_3-${Date.now()}-`
				),
				"4": await cloudStorage.save(
					form.get("img_pd_4") ? ImgSchema.parse(form.get("img_pd_4")) : null,
					`umkm/${id}/pd_4-${Date.now()}-`
				),
				"5": await cloudStorage.save(
					form.get("img_pd_5") ? ImgSchema.parse(form.get("img_pd_5")) : null,
					`umkm/${id}/pd_5-${Date.now()}-`
				)
			}
		};

		await firestore
			.collection("umkm")
			.doc(id)
			.set({
				...docData,
				images: imagesData
			});

		return NextResponse.json({ success: true, id }, { status: 201 });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		if (e instanceof z.ZodError) {
			return NextResponse.json({ success: false, message: z.prettifyError(e) }, { status: 400 });
		}

		console.error("__POST /api/umkm__ :", e);
		return NextResponse.json({ success: false, message: e.message || "Internal Server Error" }, { status: 500 });
	}
}
