import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { getUmkmList } from "@/lib/data/umkm";

export default async function AdminDashboard() {
	const data = await getUmkmList();

	return (
		<>
			<Header />

			<main>
				<section className="w-full min-h-screen">
					<h1>Admin Dashboard</h1>

					<table>
						<thead>
							<tr>
								<th>Nama</th>
								<th>Owner</th>
								<th>Kategori</th>
								<th>Alamat</th>
								<th>Dibuat</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody>
							{data.map((umkm, i) => (
								<tr key={i}>
									<td>
										<Link href={`/admin/dashboard/${umkm.id}`}>{umkm.name}</Link>
									</td>
									<td>{umkm.owner}</td>
									<td>{umkm.tag}</td>
									<td>{umkm.address}</td>
									<td>{new Date(umkm.crated_at).toString()}</td>
									<td>
										<button type="button">Edit</button>
										<button type="button">Hapus</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
			</main>

			<Footer />
		</>
	);
}
