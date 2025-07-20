import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Katalog UMKM Kelurahan Lidah Kulon",
	description:
		"Katalog UMKM Kelurahan Lidah Kulon, informasi tentang usaha kecil dan menengah yang berada di Kelurahan Lidah Kulon, Kecamatan Lakarsantri, Kota Surabaya, Jawa Timur."
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
