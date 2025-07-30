import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Katalog UMKM Lidah Kulon",
	description:
		"Daftar lengkap usaha kecil dan menengah (UMKM) di Kelurahan Lidah Kulon, Kecamatan Lakarsantri, Kota Surabaya, Jawa Timur. Cari dan temukan UMKM yang sesuai dengan kebutuhan Anda."
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
