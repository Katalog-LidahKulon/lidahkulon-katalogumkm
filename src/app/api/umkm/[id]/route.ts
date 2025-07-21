import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/lib/gcp";
import { UpdateUmkmSchema } from "@/validations/UmkmSchema";
import { z } from "zod";
import { cloudStorage } from "@/lib/CloudStorage";
import { createFileSchema } from "@/validations/zodValidate";

// Get Detail UMKM Data by ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
	try {
		const docRef = firestore.collection("umkm").doc(params.id);
		const docSnap = await docRef.get();

		if (!docSnap.exists) {
			return NextResponse.json({ success: false, message: "UMKM not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, data: docSnap.data() });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		console.error("__GET /api/umkm/[id]__ :", e);
		return NextResponse.json({ success: false, message: e.message }, { status: 500 });
	}
}

// Update UMKM Data by ID
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const ImgSchema = createFileSchema(10, ["image/jpeg", "image/jpg", "image/png", "image/webp"], true);

	try {
		const form = await req.formData();

		const docRef = firestore.collection("umkm").doc(params.id);
		const docSnap = await docRef.get();

		if (!docSnap.exists) {
			return NextResponse.json({ success: false, message: "UMKM not found" }, { status: 404 });
		}

		const prevData = docSnap.data();

		const newData: Record<string, unknown> = {
			...prevData,

			name: form.get("name") || prevData?.name,
			owner: form.get("owner") || prevData?.owner,
			description: form.get("description") || prevData?.description,
			address: form.get("address") || prevData?.address,

			contacts: {
				phone: form.get("phone") || prevData?.contacts?.phone || "",
				email: form.get("email") || prevData?.contacts?.email || ""
			},

			links: {
				instagram: form.get("instagram") || prevData?.contacts?.instagram || "",
				tiktok: form.get("tiktok") || prevData?.contacts?.tiktok || "",
				facebook: form.get("facebook") || prevData?.contacts?.facebook || "",
				youtube: form.get("youtube") || prevData?.contacts?.youtube || "",
				website: form.get("website") || prevData?.contacts?.website || ""
			}
		};

		UpdateUmkmSchema.parse(newData);

		const imagesData = {
			thumbnail: form.get("img_tn")
				? await cloudStorage.replace(
						ImgSchema.parse(form.get("img_tn")),
						`umkm/${prevData!.id}/tn-${Date.now()}-`,
						prevData?.images.thumbnail
				  )
				: prevData?.images.thumbnail,
			background: form.get("img_bg")
				? await cloudStorage.replace(
						ImgSchema.parse(form.get("img_bg")),
						`umkm/${prevData!.id}/bg-${Date.now()}-`,
						prevData?.images.background
				  )
				: prevData?.images.background,
			products: {
				"1": form.get("img_pd_1")
					? await cloudStorage.replace(
							ImgSchema.parse(form.get("img_pd_1")),
							`umkm/${prevData!.id}/pd_1-${Date.now()}-`,
							prevData?.images.products?.["1"]
					  )
					: prevData?.images.products?.["1"],
				"2": form.get("img_pd_2")
					? await cloudStorage.replace(
							ImgSchema.parse(form.get("img_pd_2")),
							`umkm/${prevData!.id}/pd_2-${Date.now()}-`,
							prevData?.images.products?.["2"]
					  )
					: prevData?.images.products?.["2"],
				"3": form.get("img_pd_3")
					? await cloudStorage.replace(
							ImgSchema.parse(form.get("img_pd_3")),
							`umkm/${prevData!.id}/pd_3-${Date.now()}-`,
							prevData?.images.products?.["3"]
					  )
					: prevData?.images.products?.["3"],
				"4": form.get("img_pd_4")
					? await cloudStorage.replace(
							ImgSchema.parse(form.get("img_pd_4")),
							`umkm/${prevData!.id}/pd_4-${Date.now()}-`,
							prevData?.images.products?.["4"]
					  )
					: prevData?.images.products?.["4"],
				"5": form.get("img_pd_5")
					? await cloudStorage.replace(
							ImgSchema.parse(form.get("img_pd_5")),
							`umkm/${prevData!.id}/pd_5-${Date.now()}-`,
							prevData?.images.products?.["5"]
					  )
					: prevData?.images.products?.["5"]
			}
		};

		await docRef.update({ ...newData, images: imagesData });

		return NextResponse.json({ success: true, message: "UMKM updated successfully" });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		if (e instanceof z.ZodError) {
			return NextResponse.json({ success: false, message: z.prettifyError(e) }, { status: 400 });
		}

		console.error("__PATCH /api/umkm/[id]__ :", e);
		return NextResponse.json({ success: false, message: e.message }, { status: 500 });
	}
}

// Delete UMKM Data by ID
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
	try {
		const docRef = firestore.collection("umkm").doc(params.id);
		const docSnap = await docRef.get();

		if (!docSnap.exists) {
			return NextResponse.json({ success: false, message: "UMKM not found" }, { status: 404 });
		}

		const prevData = docSnap.data();

		if (prevData?.images) {
			await cloudStorage.delete(prevData.images.thumbnail);
			await cloudStorage.delete(prevData.images.background);
			for (const [, value] of Object.entries(prevData.images.products || {})) {
				if (value) {
					await cloudStorage.delete(value as string);
				}
			}
		}

		await docRef.delete();

		return NextResponse.json({ success: true, message: "UMKM deleted successfully" }, { status: 200 });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		console.error("__DELETE /api/umkm/[id]__ :", e);
		return NextResponse.json({ success: false, message: e.message }, { status: 500 });
	}
}
