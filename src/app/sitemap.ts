import { UmkmBase } from "@/types/Umkm";

export const revalidate = 86400; // 1 day

export default async function sitemap() {
	let umkmData = [];

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/umkm`);
		const body = await res.json();
		umkmData = body.data;
	} catch (error) {
		console.error("Expected build error:", error);
	}

	// Detail UMKM Route
	const detailUmkmUrls = umkmData.map((d: UmkmBase) => ({
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/umkm/${d.id}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 0.9
	}));

	// Detail UMKM Admin Route
	const detailUmkmAdminUrls = umkmData.map((d: UmkmBase) => ({
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard/${d.id}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 0.6
	}));

	return [
		// Home
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1
		},
		// Catalog
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/umkm`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1
		},
		// Admin Auth
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/auth`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.6
		},
		// Admin Dashboard
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.6
		},
		// Detail UMKM
		...detailUmkmUrls,
		// Detail UMKM Admin
		...detailUmkmAdminUrls
	];
}
