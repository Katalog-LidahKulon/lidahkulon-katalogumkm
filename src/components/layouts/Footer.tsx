import Link from "next/link";

export default function Footer() {
	return (
		<footer>
			{/* Logo */}
			<div></div>

			<nav>
				<ul className="flex gap-4">
					<li>
						<Link href="/">Beranda</Link>
					</li>
					<li>
						<Link href="/">Katalog</Link>
					</li>
					<li>
						<Link href="/admin">Admin</Link>
					</li>
				</ul>
			</nav>

			{/* Contacts */}
			<ul>
				<li>Alamat</li>
				<li>No. Telepon</li>
				<li>Email</li>
				<li>Sosial Media</li>
				<li>Website</li>
			</ul>

			{/* Back To Top */}
			<button type="button">Kembali ke Atas</button>
		</footer>
	);
}
