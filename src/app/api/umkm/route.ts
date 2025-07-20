import type { Firestore } from "@google-cloud/firestore";
import { NextResponse, NextRequest } from "next/server";
import { firestore, bucket } from "@/lib/gcp";
import { v4 as uuid } from "uuid";
import { CreateUmkmSchema } from "@/validations/UmkmSchema";
import { ImageFileSchema } from "@/validations/ImageSchema";

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
	try {
		const form = await req.formData();

		const docData = {
			// ID, Created At
			id: `umkm-${uuid()}`,
			created_at: new Date(),

			// Name, Owner, Description, Address
			name: form.get("name"),
			owner: form.get("owner"),
			description: form.get("description"),
			address: form.get("address"),

			// Contacts
			contacts: {
				whatsapp: form.get("whatsapp"),
				email: form.get("email"),
				instagram: form.get("instagram"),
				tiktok: form.get("tiktok"),
				youtube: form.get("youtube"),
				website: form.get("website")
			},

			// Images
			thumbnail_img_url: "",
			background_img_url: "",
			product_img_urls: [] as string[]
		};

		const parseDocData = CreateUmkmSchema.safeParse(docData);
		if (!parseDocData.success) {
			return NextResponse.json(
				{
					success: false,
					message: JSON.parse(parseDocData.error.message)
						.map((e: { message: string }) => e.message)
						.join(", ")
				},
				{ status: 400 }
			);
		}

		// Thumbnail Image
		const thumbnail = form.get("thumbnail_img") as File;
		const thumbnailParse = ImageFileSchema.safeParse(thumbnail);
		if (!thumbnailParse.success) {
			return NextResponse.json(
				{
					success: false,
					message: JSON.parse(thumbnailParse.error.message)
						.map((e: { message: string }) => e.message)
						.join(", ")
				},
				{ status: 400 }
			);
		} else {
			const buf = Buffer.from(await thumbnail.arrayBuffer());
			const thumbBlob = bucket.file(`umkm/${docData.id}/thumb_${Date.now()}_${thumbnail.name}`);
			await new Promise((res, rej) => {
				const s = thumbBlob.createWriteStream({ metadata: { contentType: thumbnail.type } });
				s.on("finish", res).on("error", rej);
				s.end(buf);
			});
			docData.thumbnail_img_url = `https://storage.googleapis.com/${bucket.name}/${thumbBlob.name}`;
		}

		// Background Image
		const background = form.get("background_img") as File;
		const backgroundParse = ImageFileSchema.safeParse(background);
		if (!backgroundParse.success) {
			return NextResponse.json(
				{
					success: false,
					message: JSON.parse(backgroundParse.error.message)
						.map((e: { message: string }) => e.message)
						.join(", ")
				},
				{ status: 400 }
			);
		} else {
			const buf = Buffer.from(await background.arrayBuffer());
			const bgBlob = bucket.file(`umkm/${docData.id}/bg_${Date.now()}_${background.name}`);
			await new Promise((res, rej) => {
				const s = bgBlob.createWriteStream({ metadata: { contentType: background.type } });
				s.on("finish", res).on("error", rej);
				s.end(buf);
			});
			docData.background_img_url = `https://storage.googleapis.com/${bucket.name}/${bgBlob.name}`;
		}

		// Products Images
		const prodFiles = form.getAll("product_imgs") as File[];
		let prodFileCount = 1;
		for (const file of prodFiles) {
			const productParse = ImageFileSchema.safeParse(file);
			if (!productParse.success) {
				return NextResponse.json(
					{
						success: false,
						message: JSON.parse(productParse.error.message)
							.map((e: { message: string }) => e.message)
							.join(", ")
					},
					{ status: 400 }
				);
			} else {
				const buf = Buffer.from(await file.arrayBuffer());
				const blob = bucket.file(`umkm/${docData.id}/product_${prodFileCount++}_${Date.now()}_${file.name}`);
				await new Promise((res, rej) => {
					const s = blob.createWriteStream({ metadata: { contentType: file.type } });
					s.on("finish", res).on("error", rej);
					s.end(buf);
				});
				docData.product_img_urls.push(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
			}
		}

		await (firestore as Firestore).collection("umkm").doc(docData.id).set(docData);

		return NextResponse.json({ success: true, id: docData.id }, { status: 201 });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		console.error("__POST /api/umkm__ :", e);
		return NextResponse.json({ success: false, message: e.message }, { status: 500 });
	}
}
