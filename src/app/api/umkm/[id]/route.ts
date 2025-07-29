import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { firestore } from "@/lib/gcp";
import { cloudStorage } from "@/lib/CloudStorage";
import { z } from "zod";
import { ImgSchema } from "@/validations/zodHelper";
import { UpdateUmkmSchema } from "@/validations/UmkmSchema";
import { verifyAuth } from "@/lib/auth";
import { ErrorResponse } from "@/lib/ErrorResponse";

type RouteContext = {
	params: Promise<{ id: string }>;
};

// Get Detail UMKM Data by ID
export async function GET(_: NextRequest, { params }: RouteContext) {
	try {
		const { id } = await params;

		const docRef = firestore.collection("umkm").doc(id);
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
export async function PATCH(req: NextRequest, { params }: RouteContext) {
	try {
		await verifyAuth(req);
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return NextResponse.json({ success: false, message: error.message }, { status: error.statusCode });
		}
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}

	try {
		const { id } = await params;

		const form = await req.formData();

		const docRef = firestore.collection("umkm").doc(id);
		const docSnap = await docRef.get();

		if (!docSnap.exists) {
			return NextResponse.json({ success: false, message: "UMKM not found" }, { status: 404 });
		}

		const prevData = docSnap.data();

		const newData: Record<string, unknown> = {
			...prevData,

			owner: form.get("owner") || prevData?.owner,
			name: form.get("name") || prevData?.name,
			category: form.get("category") || prevData?.category,
			description: form.get("description") || prevData?.description,
			address: form.get("address") || prevData?.address,
			address_embed: form.get("address_embed") || prevData?.address_embed,

			contacts: {
				phone: form.get("phone") || prevData?.contacts?.phone || "",
				email: form.get("email") || prevData?.contacts?.email || ""
			},

			links: {
				instagram: form.get("instagram") || prevData?.links?.instagram || "",
				tiktok: form.get("tiktok") || prevData?.links?.tiktok || "",
				facebook: form.get("facebook") || prevData?.links?.facebook || "",
				youtube: form.get("youtube") || prevData?.links?.youtube || "",
				website: form.get("website") || prevData?.links?.website || ""
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
		revalidateTag("umkm");

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
export async function DELETE(req: NextRequest, { params }: RouteContext) {
	try {
		await verifyAuth(req);
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return NextResponse.json({ success: false, message: error.message }, { status: error.statusCode });
		}
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}

	try {
		const { id } = await params;

		const docRef = firestore.collection("umkm").doc(id);
		const docSnap = await docRef.get();

		if (!docSnap.exists) {
			return NextResponse.json({ success: false, message: "UMKM not found" }, { status: 404 });
		}

		const prevData = docSnap.data();

		if (prevData?.images) {
			await cloudStorage.delete(prevData.images.thumbnail);
			for (const [, value] of Object.entries(prevData.images.products || {})) {
				if (value) {
					await cloudStorage.delete(value as string);
				}
			}
		}

		await docRef.delete();
		revalidateTag("umkm");

		return NextResponse.json({ success: true, message: "UMKM deleted successfully" }, { status: 200 });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		console.error("__DELETE /api/umkm/[id]__ :", e);
		return NextResponse.json({ success: false, message: e.message }, { status: 500 });
	}
}
