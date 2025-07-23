import type { UmkmBase, UmkmDetail } from "@/types/Umkm";
import { firestore } from "@/lib/gcp";
import { unstable_cache } from "next/cache";

export const getUmkmList: () => Promise<UmkmBase[] | []> = unstable_cache(
	async () => {
		const snap = await firestore.collection("umkm").get();
		const data = snap.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Record<string, unknown>)
		}));

		return data as UmkmBase[] | [];
	},
	[],
	{ tags: ["umkm"] }
);

export const getUmkmDetail: (id: string) => Promise<UmkmDetail | null> = unstable_cache(
	async (id: string) => {
		const ref = firestore.collection("umkm").doc(id);
		const snap = await ref.get();

		if (!snap.exists) return null;

		return snap.data() as UmkmDetail;
	},
	[],
	{ tags: ["umkm"] }
);
