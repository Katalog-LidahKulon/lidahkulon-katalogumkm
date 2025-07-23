import Link from "next/link";

export default function Header() {
	return (
		<header className="fixed flex gap-4">
			{/* Logo */}
			<div></div>

			<nav>
				<ul className="flex gap-4">
					<li>
						<Link href="/">Beranda</Link>
					</li>
					<li>
						<Link href="/#katalog">Katalog</Link>
					</li>
					<li>
						<Link href="/admin/dashboard">Admin</Link>
					</li>
				</ul>
			</nav>

			{/* Search Field */}
			<input type="search" />
		</header>
	);
}
