"use client";

import { useParams } from "next/navigation";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import SvgPhone from "@/assets/svgs/Phone";
import SvgSms from "@/assets/svgs/sms";
import SvgSocial1 from "@/assets/svgs/SocialIcons-1";
import SvgSocial2 from "@/assets/svgs/SocialIcons-2";
import SvgSocial3 from "@/assets/svgs/SocialIcons-3";
import SvgSocial4 from "@/assets/svgs/SocialIcons-4";
import SvgGlobe from "@/assets/svgs/Globe";
import SvgMap from "@/assets/svgs/Map_Pin";
import { formatDate, extractGoogleMapsSrc } from "@/lib/utils";
import { useEffect, useState } from "react";
import { UmkmDetail } from "@/types/Umkm";
import { EditableText } from "@/components/shared/EditableText";
import EditableImage from "@/components/shared/EditableImage";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Toaster, toast } from "sonner";

const categories = [
	"Kuliner",
	"Kerajinan",
	"Fashion",
	"Jasa",
	"Furniture",
	"Ritel",
	"Pertanian",
	"Peternakan",
	"Kesehatan"
];

export default function AdminUmkmDetail() {
	const params = useParams();
	const umkmId = params?.umkmId as string;

	const [refetch, setRefetch] = useState(1);
	const [data, setData] = useState<UmkmDetail | null>(null);
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`/api/umkm/${umkmId}`);
			const data = await res.json();

			setData(data.data);
			setRefetch((p) => p++);
		};
		fetchData();
	}, [refetch, umkmId]);

	const handleUpdateText = async (name: string, val: string) => {
		const loading = toast.loading("Memperbarui data...");

		try {
			const form = new FormData();
			form.append(name, val);

			await fetch(`/api/umkm/${umkmId}`, {
				method: "PATCH",
				body: form
			});

			setRefetch((p) => p + 1);

			toast.success("Data berhasil diperbarui!");
		} catch (error) {
			console.error(error);

			toast.error("Terjadi kesalahan, silahkan coba lagi!");
		} finally {
			toast.dismiss(loading);
		}
	};

	const handleUpdateImage = async (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
		const files = e.target.files;
		if (files && files[0]) {
			const loading = toast.loading("Memperbarui gambar...");
			const formData = new FormData();
			formData.append(name, files[0]);

			try {
				await fetch(`/api/umkm/${umkmId}`, {
					method: "PATCH",
					body: formData
				});
				setRefetch((p) => p + 1);

				toast.success("Gambar berhasil diperbarui!");
			} catch (error) {
				console.error(error);

				toast.error("Terjadi kesalahan, silahkan coba lagi!");
			} finally {
				toast.dismiss(loading);
			}
		}
	};

	return (
		<>
			<Header />

			<main>
				<section className="w-full min-h-screen pt-24 pb-16">
					{/* Instruction */}
					<p className="pb-8 px-4 sm:px-8 lg:px-16 text-primary text-center">
						Elemenen dengan ikon <Pencil2Icon className="size-5 text-primary inline mx-1" /> dapat langsung di edit
						untuk memperbarui data.
					</p>

					<div className="w-full h-fit grid grid-flow-row md:grid-cols-2 gap-x-4 gap-y-8 md:gap-8 px-6 sm:px-8 lg:px-16">
						<div>
							{/* Main Info */}
							<div>
								<EditableText
									placeholder="Nama UMKM"
									value={data?.name || ""}
									onUpdate={(val) => handleUpdateText("name", val)}
									className="font-playfair text-3xl sm:text-4xl md:text-5xl text-neutral-800"
								/>

								<div className="flex flex-wrap gap-x-2 items-baseline">
									<EditableText
										placeholder="Pemilik UMKM"
										value={data?.owner || ""}
										onUpdate={(val) => handleUpdateText("owner", val)}
										className="font-normal text-lg text-neutral-800"
									/>
									<div className="h-1 aspect-square rounded-full bg-neutral-500" />
									<select
										value={data?.category}
										onChange={(e) => handleUpdateText("category", e.target.value)}
										className="border border-neutral-400"
									>
										{categories.map((item, i) => (
											<option key={i} value={item}>
												{item}
											</option>
										))}
									</select>
									<div className="h-1 aspect-square rounded-full bg-neutral-500" />
									<p className="text-sm">{data?.created_at && formatDate(data.created_at)}</p>
								</div>
							</div>

							<p className="w-10/12 min-w-xs max-w-lg">
								<EditableText
									placeholder="Deskripsi UMKM"
									value={data?.description || ""}
									onUpdate={(val) => handleUpdateText("description", val)}
									className="w-full min-w-xs max-w-lg mt-10 text-justify text-sm text-neutral-700 break-all"
								/>
							</p>

							{/* Contact */}
							<h6 className="mt-10 font-medium text-lg text-neutral-800">Kontak</h6>
							<div className="mt-1 text-sm sm:text-base grid grid-cols-1 sm:grid-cols-2 gap-2">
								<p className="flex gap-8">
									<SvgPhone />
									<EditableText
										placeholder="Isi No. Telp..."
										value={data?.contacts?.phone || ""}
										onUpdate={(val) => handleUpdateText("phone", val)}
									/>
								</p>
								<p className="flex gap-8">
									<SvgSms />
									<EditableText
										placeholder="Isi Email..."
										value={data?.contacts?.email || ""}
										onUpdate={(val) => handleUpdateText("email", val)}
									/>
								</p>
							</div>

							{/* Links */}
							<h6 className="mt-10 font-medium text-lg text-neutral-800">Tautan & Media Sosial</h6>
							<div className="mt-1 text-sm sm:text-base grid grid-cols-1 sm:grid-cols-2 gap-2">
								<p className="flex gap-8">
									<SvgSocial4 />
									<EditableText
										placeholder="Isi Url Instagram..."
										value={data?.links?.instagram || ""}
										onUpdate={(val) => handleUpdateText("instagram", val)}
									/>
								</p>
								<p className="flex gap-8">
									<SvgSocial1 />
									<EditableText
										placeholder="Isi Url Tiktok..."
										value={data?.links?.tiktok || ""}
										onUpdate={(val) => handleUpdateText("tiktok", val)}
									/>
								</p>
								<p className="flex gap-8">
									<SvgSocial2 />
									<EditableText
										placeholder="Isi Url Facebook..."
										value={data?.links?.facebook || ""}
										onUpdate={(val) => handleUpdateText("facebook", val)}
									/>
								</p>
								<p className="flex gap-8">
									<SvgSocial3 />
									<EditableText
										placeholder="Isi Url Youtube..."
										value={data?.links?.youtube || ""}
										onUpdate={(val) => handleUpdateText("youtube", val)}
									/>
								</p>
								<p className="flex gap-8">
									<SvgGlobe />
									<EditableText
										placeholder="Isi Url Website..."
										value={data?.links?.website || ""}
										onUpdate={(val) => handleUpdateText("website", val)}
									/>
								</p>
							</div>

							{/* Address */}
							<h6 className="mt-10 font-medium text-lg text-neutral-800">Alamat</h6>
							<div className="mt-1">
								<p className="flex gap-8">
									<SvgMap />
									<EditableText
										placeholder="Isi Alamat UMKM..."
										value={data?.address || ""}
										onUpdate={(val) => handleUpdateText("address", val)}
									/>
								</p>
								{/* Embed Google Maps */}
								<div className="mt-2 w-10/12 min-w-xs max-w-lg flex flex-col gap-2">
									<p className="font-normal text-sm text-neutral-800">Embed Google Maps</p>
									<EditableText
										placeholder="Isi salinan embed <iframe src='..."
										value={data?.address_embed || ""}
										onUpdate={(val) => handleUpdateText("address_embed", val)}
										className="w-full break-all"
									/>
								</div>
								{data?.address_embed && (
									<iframe
										src={extractGoogleMapsSrc(data.address_embed) || ""}
										className="mt-2 w-10/12 aspect-video border-2 border-neutral-500 rounded-lg "
									/>
								)}
							</div>
						</div>

						{/* Thumbnail */}
						<div className="size-full flex items-center justify-center">
							<EditableImage
								src={data?.images?.thumbnail || ""}
								onUpdate={(e) => handleUpdateImage(e, "img_tn")}
								onDropFiles={(files: FileList) =>
									handleUpdateImage({ target: { files } } as React.ChangeEvent<HTMLInputElement>, "img_tn")
								}
								className="w-full max-w-sm aspect-[2/3] object-cover object-center"
							/>
						</div>
					</div>

					{/* Product Images */}
					<div className="w-full mt-8 h-fit grid grid-flow-row md:grid-cols-2 gap-2 px-2 md:px-8">
						<div className="flex flex-col gap-2">
							<EditableImage
								src={data?.images?.products?.["1"] || ""}
								onUpdate={(e) => handleUpdateImage(e, "img_pd_1")}
								onDropFiles={(files: FileList) => {
									handleUpdateImage({ target: { files } } as React.ChangeEvent<HTMLInputElement>, "img_pd_1");
								}}
								className="w-full aspect-[2/1] object-cover object-center"
							/>
							<EditableImage
								src={data?.images?.products?.["2"] || ""}
								onUpdate={(e) => handleUpdateImage(e, "img_pd_2")}
								onDropFiles={(files: FileList) => {
									handleUpdateImage({ target: { files } } as React.ChangeEvent<HTMLInputElement>, "img_pd_2");
								}}
								className="w-full aspect-[2/1] object-cover object-center"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<div className="grid grid-cols-2 gap-2">
								<EditableImage
									src={data?.images?.products?.["3"] || ""}
									onUpdate={(e) => handleUpdateImage(e, "img_pd_3")}
									onDropFiles={(files: FileList) => {
										handleUpdateImage({ target: { files } } as React.ChangeEvent<HTMLInputElement>, "img_pd_3");
									}}
									className="w-full aspect-[1/1] object-cover object-center"
								/>
								<EditableImage
									src={data?.images?.products?.["4"] || ""}
									onUpdate={(e) => handleUpdateImage(e, "img_pd_4")}
									onDropFiles={(files: FileList) => {
										handleUpdateImage({ target: { files } } as React.ChangeEvent<HTMLInputElement>, "img_pd_4");
									}}
									className="w-full aspect-[1/1] object-cover object-center"
								/>
							</div>
							<EditableImage
								src={data?.images?.products?.["5"] || ""}
								onUpdate={(e) => handleUpdateImage(e, "img_pd_5")}
								onDropFiles={(files: FileList) => {
									handleUpdateImage({ target: { files } } as React.ChangeEvent<HTMLInputElement>, "img_pd_5");
								}}
								className="w-full aspect-[2/1] object-cover object-center"
							/>
						</div>
					</div>
				</section>
			</main>

			<Footer />

			<Toaster position="bottom-right" expand />
		</>
	);
}
