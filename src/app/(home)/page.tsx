import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { getUmkmList } from "@/lib/data/umkm";

export default async function Home() {
	const data = await getUmkmList();

	return (
		<>
			<Header />

			<main>
				<section className="w-full min-h-screen">Beranda</section>

				<section className="w-full min-h-screen">Tentang</section>

				<section className="w-full min-h-screen">
					<h1>Katalog</h1>

					<div className="flex flex-wrap">
						{data.map((umkm) => (
							<Link href={`/umkm/${umkm.id}`} key={umkm.id} className="relative flex flex-col">
								<p>{new Date(umkm.crated_at).toDateString()}</p>

								<p>{umkm.owner}</p>
								<h3>{umkm.name}</h3>
								<p>{umkm.tag}</p>
								<p>{umkm.description}</p>
								<p>{umkm.address}</p>

								<Image
									src={umkm.images.thumbnail}
									alt={`${umkm.name} Thumbnail`}
									width={400}
									height={400}
									className="absolute -z-10 size-full object-cover object-center"
								/>
							</Link>
						))}
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
