import Link from "next/link";

export default function NotFound() {
	return (
		<main className="w-full min-h-screen flex items-center justify-center">
			<div className="w-fit flex flex-col gap-4">
				<h1 className="block">404 // Not Found</h1>
				<p className="block">
					Maaf, halaman yang anda cari tidak ditemukan. Kembali ke{" "}
					<Link href="/" className="underline underline-offset-2">
						Halaman Utama
					</Link>
				</p>
			</div>
		</main>
	);
}
