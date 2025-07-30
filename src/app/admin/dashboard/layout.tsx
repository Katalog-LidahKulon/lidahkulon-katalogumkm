import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Admin - Katalog UMKM Lidah Kulon",
	description:
		"Halaman dashboard admin untuk mengelola katalog UMKM di Kelurahan Lidah Kulon, Kecamatan Lakarsantri, Kota Surabaya, Jawa Timur."
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
