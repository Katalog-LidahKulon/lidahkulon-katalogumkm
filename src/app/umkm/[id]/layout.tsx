import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Detail UMKM Lidah Kulon",
	description:
		"Informasi lengkap tentang usaha kecil dan menengah (UMKM) di Kelurahan Lidah Kulon, Kecamatan Lakarsantri, Kota Surabaya, Jawa Timur. Temukan detail UMKM yang Anda cari dan pelajari lebih lanjut tentang produk dan layanan yang mereka tawarkan."
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="id">
			<body className="antialiased">{children}</body>
		</html>
	);
}
