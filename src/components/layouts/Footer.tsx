import Link from "next/link";

export default function Footer() {
	return (
		<footer>
			<nav>
				<ul>
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/admin">Admin</Link>
					</li>
				</ul>
			</nav>
		</footer>
	);
}
