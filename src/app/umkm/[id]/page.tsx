import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { getUmkmDetail } from "@/lib/data/umkm";
import SvgPhone from "@/assets/svgs/Phone";
import SvgSms from "@/assets/svgs/sms";
import SvgSocial1 from "@/assets/svgs/SocialIcons-1";
import SvgSocial2 from "@/assets/svgs/SocialIcons-2";
import SvgSocial3 from "@/assets/svgs/SocialIcons-3";
import SvgSocial4 from "@/assets/svgs/SocialIcons-4";
import SvgGlobe from "@/assets/svgs/Globe";
import SvgMap from "@/assets/svgs/Map_Pin";
import { formatDate, extractGoogleMapsSrc } from "@/lib/utils";

export default async function PageUmkmDetail({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const data = await getUmkmDetail(id);

	return (
		<>
			<Header />

			<main>
				<section className="w-full min-h-screen pt-32 pb-16">
					<div className="w-full h-fit grid grid-flow-row md:grid-cols-2 gap-x-4 gap-y-8 md:gap-8 px-4 sm:px-8 lg:px-16">
						<div>
							{/* Main Info */}
							<div>
								<h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-neutral-800">{data?.name}</h1>

								<div className="flex flex-wrap gap-x-2 items-baseline">
									<p className="font-normal text-lg text-neutral-800">{data?.owner}</p>
									<div className="h-1 aspect-square rounded-full bg-neutral-500" />
									<p className="text-sm">{data?.category}</p>
									<div className="h-1 aspect-square rounded-full bg-neutral-500" />
									<p className="text-sm">{formatDate(data?.created_at)}</p>
								</div>
							</div>

							{data?.description && (
								<p className="w-10/12 mt-10 text-justify text-sm text-neutral-700">{data?.description}</p>
							)}

							{/* Contact */}
							<h6 className="mt-10 font-medium text-lg text-neutral-800">Kontak</h6>
							<div className="mt-1 text-sm sm:text-base grid grid-cols-1 sm:grid-cols-2 gap-2">
								{data?.contacts?.phone && (
									<Link href={"tel:" + data.contacts.phone} className="underline underline-offset-2 hover:text-primary">
										<SvgPhone className="inline me-2" />
										{data.contacts.phone}
									</Link>
								)}
								{data?.contacts?.email && (
									<Link
										href={"mailto:" + data.contacts.email}
										className="underline underline-offset-2 hover:text-primary"
									>
										<SvgSms className="inline me-2" />
										{data.contacts.email}
									</Link>
								)}
							</div>

							{/* Links */}
							<h6 className="mt-10 font-medium text-lg text-neutral-800">Tautan & Media Sosial</h6>
							<div className="mt-1 text-sm sm:text-base grid grid-cols-1 sm:grid-cols-2 gap-2">
								{data?.links?.instagram && (
									<Link href={data.links.instagram} className="underline underline-offset-2 hover:text-primary">
										<SvgSocial4 className="inline me-2" />
										{data.links.instagram}
									</Link>
								)}
								{data?.links?.tiktok && (
									<Link href={data.links.tiktok} className="underline underline-offset-2 hover:text-primary">
										<SvgSocial1 className="inline me-2" />
										{data.links.tiktok}
									</Link>
								)}
								{data?.links?.facebook && (
									<Link href={data.links.facebook} className="underline underline-offset-2 hover:text-primary">
										<SvgSocial2 className="inline me-2" />
										{data.links.facebook}
									</Link>
								)}
								{data?.links?.youtube && (
									<Link href={data.links.youtube} className="underline underline-offset-2 hover:text-primary">
										<SvgSocial3 className="inline me-2" />
										{data.links.youtube}
									</Link>
								)}
								{data?.links?.website && (
									<Link href={data.links.website} className="underline underline-offset-2 hover:text-primary">
										<SvgGlobe className="inline me-2" />
										{data.links.website}
									</Link>
								)}
							</div>

							{/* Address */}
							<h6 className="mt-10 font-medium text-lg text-neutral-800">Alamat</h6>
							<div className="mt-1">
								{data?.address && (
									<p>
										<SvgMap className="inline me-2" />
										{data.address}
									</p>
								)}
								{/* Embed Google Maps */}
								{data?.address_embed && (
									<iframe
										src={extractGoogleMapsSrc(data.address_embed) || ""}
										className="mt-2 w-10/12 max-w-sm aspect-video border-2 border-neutral-500 rounded-lg "
									/>
								)}
							</div>
						</div>

						{/* Thumbnail */}
						<div className="size-full flex items-center justify-center">
							<Image
								src={data?.images?.thumbnail || ""}
								alt={`${data?.name} Thumbnail`}
								width={400}
								height={400}
								priority
								className="w-full max-w-sm aspect-[2/3] object-cover object-center"
							/>
						</div>
					</div>

					{/* Product Images */}
					<div className="w-full mt-8 h-fit grid grid-flow-row md:grid-cols-2 gap-2 px-2 md:px-8">
						<div className="flex flex-col gap-2">
							<Image
								src={data?.images?.products?.["1"] || ""}
								alt="Product 1"
								width={400}
								height={400}
								className="w-full aspect-[2/1] object-cover object-center"
							/>
							<Image
								src={data?.images?.products?.["2"] || ""}
								alt="Product 2"
								width={400}
								height={400}
								className="w-full aspect-[2/1] object-cover object-center"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<div className="grid grid-cols-2 gap-2">
								<Image
									src={data?.images?.products?.["3"] || ""}
									alt="Product 3"
									width={400}
									height={400}
									className="w-full aspect-[1/1] object-cover object-center"
								/>
								<Image
									src={data?.images?.products?.["4"] || ""}
									alt="Product 4"
									width={400}
									height={400}
									className="w-full aspect-[1/1] object-cover object-center"
								/>
							</div>
							<Image
								src={data?.images?.products?.["5"] || ""}
								alt="Product 5"
								width={400}
								height={400}
								className="w-full aspect-[2/1] object-cover object-center"
							/>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
