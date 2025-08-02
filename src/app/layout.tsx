import type { Metadata } from "next";
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
	title: "LokaKulon",
	description:
		"Katalog UMKM Kelurahan Lidah Kulon, informasi tentang usaha kecil dan menengah yang berada di Kelurahan Lidah Kulon, Kecamatan Lakarsantri, Kota Surabaya, Jawa Timur.",
	verification: {
		google: "K3se7__XI3jEmXrbJBsOQ6UnzrKkSBNxdAZBKvgtpts"
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="id">
			<body className="antialiased">
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
