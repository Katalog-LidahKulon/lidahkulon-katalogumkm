import Image from "next/image";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { getUmkmDetail } from "@/lib/data/umkm";

export default async function UmkmDetail({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const data = await getUmkmDetail(id);

	return (
		<>
			<Header />

			<main>
				<section>
					<div>
						<p>{data?.id}</p>
						<p>{data?.crated_at && new Date(data.crated_at).toDateString()}</p>

						<p>{data?.owner}</p>
						<h1>{data?.name}</h1>
						<p>{data?.tag}</p>
						<p>{data?.description}</p>
						<p>{data?.address}</p>

						<div>
							<p>{data?.contacts?.email}</p>
							<p>{data?.contacts?.phone}</p>
						</div>

						<div>
							<p>{data?.links?.instagram}</p>
							<p>{data?.links?.tiktok}</p>
							<p>{data?.links?.facebook}</p>
							<p>{data?.links?.youtube}</p>
							<p>{data?.links?.website}</p>
						</div>

						<div>
							<Image
								src={data?.images?.thumbnail || ""}
								alt={`${data?.name} Thumbnail`}
								width={400}
								height={400}
								priority
								className="w-2xs object-cover object-center"
							/>
							<Image
								src={data?.images?.background || ""}
								alt={`${data?.name} Background`}
								width={1000}
								height={600}
								priority
								className="w-full object-cover object-center"
							/>

							<div>
								{Object.entries(data?.images?.products || {}).map(([key, value], i) => (
									<Image
										key={i}
										src={value || ""}
										alt={`${data?.name} Product ${key}`}
										width={600}
										height={600}
										className="w-xs object-cover object-center"
									/>
								))}
							</div>
						</div>
					</div>

					<div>Similar / Prev-Next</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
