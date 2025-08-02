"use client";

import ImageInputField from "./shared/ImageInputField";
import InputField from "./shared/InputField";
import TextareaField from "./shared/TextareaField";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

const categories = [
	"kuliner",
	"kerajinan",
	"fashion",
	"jasa",
	"furniture",
	"ritel",
	"pertanian",
	"peternakan",
	"kesehatan"
];

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ImgSchema = Yup.mixed<File>()
	.notRequired()
	.test("fileFormat", "Format file tidak didukung (hanya jpg, jpeg, png, webp)", (value) => {
		if (!value) return true;
		return SUPPORTED_FORMATS.includes(value.type);
	})
	.test("fileSize", "Ukuran file maksimal 10MB", (value) => {
		if (!value) return true;
		return value.size <= MAX_FILE_SIZE;
	});

const initValue = {
	name: "",
	owner: "",
	category: "",
	description: "",
	address: "",
	address_embed: "",
	phone: "",
	email: "",
	instagram: "",
	tiktok: "",
	facebook: "",
	youtube: "",
	website: "",
	img_tn: null,
	img_pd_1: null,
	img_pd_2: null,
	img_pd_3: null,
	img_pd_4: null,
	img_pd_5: null
};
const valueSchema = Yup.object().shape({
	name: Yup.string().max(200, "Nama UMKM tidak boleh lebih dari 200 karakter").required("Nama UMKM wajib diisi"),
	owner: Yup.string().max(200, "Nama pemilik tidak boleh lebih dari 200 karakter").required("Nama pemilik wajib diisi"),
	category: Yup.string().max(100, "Kategori tidak boleh lebih dari 100 karakter").required("Kategori wajib diisi"),
	description: Yup.string()
		.max(2000, "Deskripsi tidak boleh lebih dari 2000 karakter")
		.required("Deskripsi wajib diisi"),
	address: Yup.string().max(500, "Alamat tidak boleh lebih dari 500 karakter").required("Alamat wajib diisi"),
	address_embed: Yup.string()
		.max(1000, "Hasil salinan Embed Google Map tidak boleh lebih dari 1000 karakter")
		.notRequired(),

	phone: Yup.string().max(24, "Nomor Telepon tidak boleh lebih dari 20 karakter").notRequired(),
	email: Yup.string().max(200, "Email tidak boleh lebih dari 200 karakter").notRequired(),

	instagram: Yup.string().max(400, "Instagram url tidak boleh lebih dari 400 karakter").notRequired(),
	tiktok: Yup.string().max(400, "Tiktok url tidak boleh lebih dari 400 karakter").notRequired(),
	facebook: Yup.string().max(400, "Facebook url tidak boleh lebih dari 400 karakter").notRequired(),
	youtube: Yup.string().max(400, "Youtube url tidak boleh lebih dari 400 karakter").notRequired(),
	website: Yup.string().max(400, "Website url tidak boleh lebih dari 400 karakter").notRequired(),

	img_tn: ImgSchema,
	img_pd_1: ImgSchema,
	img_pd_2: ImgSchema,
	img_pd_3: ImgSchema,
	img_pd_4: ImgSchema,
	img_pd_5: ImgSchema
});

export default function CreateUmkmForm({
	show,
	setShow,
	refetch
}: {
	show: boolean;
	setShow: (v: boolean) => void;
	refetch: () => void;
}) {
	const [state, setState] = useState<{ loading: boolean; error: string | null }>({ loading: false, error: null });
	const handleHide = () => setShow(false);

	if (!show) return null;

	return (
		<Formik
			initialValues={initValue}
			validationSchema={valueSchema}
			onSubmit={async (values) => {
				setState({ loading: true, error: null });
				const loading = toast.loading("Mengirim data...");

				const formData = new FormData();
				Object.entries(values).forEach(([key, val]: [string, unknown]) => {
					if (val instanceof File || typeof val === "string") {
						formData.append(key, val);
					}
				});

				try {
					const res = await fetch("/api/umkm", {
						method: "POST",
						body: formData
					});

					if (!res.ok) {
						const errData = await res.json();
						toast.error(errData.message || "Gagal mengirim data.");
						return;
					}

					refetch();
					setState({ loading: false, error: null });
					toast.success("Data berhasil dikirim!");
				} catch (error) {
					console.error("Gagal mengirim:", error);
					setState({ loading: false, error: "Gagal mengirim data" });
					toast.error("Terjadi kesalahan, silahkan coba lagi!");
				} finally {
					toast.dismiss(loading);
				}
			}}
		>
			{({ handleSubmit, errors }) => (
				<form
					onSubmit={handleSubmit}
					className="overflow-y-auto max-h-screen fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 m-4 p-4 sm:p-8 lg:p-16 rounded border border-neutral-300 bg-neutral-50"
				>
					{/* Close */}
					<button
						onClick={handleHide}
						type="button"
						className="cursor-pointer absolute top-4 right-4 p-1 rounded border border-neutral-500 hover:bg-red-100"
					>
						<Cross1Icon className="size-4 md:size-6" />
					</button>

					<div className="mb-8">
						<h3 className="font-playfair tracking-wide text-2xl sm:text-3xl lg:text-4xl text-neutral-800">
							Tambah UMKM
						</h3>
						<p>Isi informasi berikut untuk menambahkan profil UMKM Baru.</p>
					</div>

					<div className="w-full flex flex-col md:flex-row items-start justify-between gap-8">
						<div className="basis-1/2 flex flex-col gap-6">
							<InputField label="Nama UMKM" name="name" type="text" placeholder="Nama UMKM" required />

							<InputField label="Nama Pemilik" name="owner" type="text" placeholder="Nama Pemilik UMKM" required />

							<div>
								<p className="mb-1 text-sm text-neutral-800">Kategori *</p>
								<Field
									as="select"
									name="category"
									className="w-full p-1 border border-neutral-400 rounded font-normal capitalize"
								>
									<option value="" disabled>
										Pilih Kategori
									</option>
									{categories.map((c, i) => (
										<option key={i} value={c} className="capitalize">
											{c}
										</option>
									))}
								</Field>
							</div>

							{/* Rest of your form fields */}
							<TextareaField label="Deskripsi" name="description" rows={5} placeholder="Deskripsi UMKM" required />

							<InputField label="Alamat" name="address" type="text" placeholder="Jalan, Kecamatan, Kota" required />

							<InputField
								label="Sematan Peta Google Maps"
								name="address_embed"
								placeholder="<iframe src='..."
								type="text"
							/>

							<div>
								<h4>Kontak</h4>
								<div className="mt-2 grid grid-cols-2 gap-4">
									<InputField label="No. Telp" name="phone" placeholder="+6289999999" type="text" />
									<InputField label="Email" name="email" placeholder="email@example.com" type="text" />
								</div>
							</div>

							<div>
								<h4>Tautan & Sosial Media</h4>
								<div className="mt-2 grid grid-cols-2 gap-4">
									<InputField label="Url Instagram" name="instagram" placeholder="https://instagram.com" type="text" />
									<InputField label="Url Tiktok" name="tiktok" placeholder="https://tiktok.com" type="text" />
									<InputField label="Url Facebook" name="facebook" placeholder="https://facebook.com" type="text" />
									<InputField label="Url Youtube" name="youtube" placeholder="https://youtube.com" type="text" />
									<InputField label="Url Website" name="website" placeholder="https://website.com" type="text" />
								</div>
							</div>
						</div>

						<ImageInputField
							name="img_tn"
							label="Gambar Profil *"
							className="w-full max-w-xs"
							dropZoneClass="w-full max-w-xs aspect-[2/3]"
						/>
					</div>

					<div>
						<div className="w-full mt-8 h-fit grid grid-flow-row md:grid-cols-2 gap-6">
							<div className="flex flex-col gap-6">
								<ImageInputField
									name="img_pd_1"
									label="Gambar Produk 1"
									className="w-full"
									dropZoneClass="w-full aspect-[2/1] object-cover object-center"
								/>
								<ImageInputField
									name="img_pd_2"
									label="Gambar Produk 2"
									className="w-full"
									dropZoneClass="w-full aspect-[2/1] object-cover object-center"
								/>
							</div>
							<div className="flex flex-col gap-6">
								<div className="grid grid-cols-2 gap-6">
									<ImageInputField
										name="img_pd_3"
										label="Gambar Produk 3"
										className="w-full"
										dropZoneClass="w-full aspect-[1/1] object-cover object-center"
									/>
									<ImageInputField
										name="img_pd_4"
										label="Gambar Produk 4"
										className="w-full"
										dropZoneClass="w-full aspect-[1/1] object-cover object-center"
									/>
								</div>
								<ImageInputField
									name="img_pd_5"
									label="Gambar Produk 5"
									className="w-full"
									dropZoneClass="w-full aspect-[2/1] object-cover object-center"
								/>
							</div>
						</div>
					</div>

					{Object.entries(errors).length > 0 && (
						<div className="mt-6 text-red-600 px-4 py-3 rounded" role="alert">
							{Object.entries(errors).map(([key, value], i) => (
								<p key={i}>{`${key}: ${value}`}</p>
							))}
						</div>
					)}
					{state.error && (
						<div className="mt-6 text-red-600 px-4 py-3 rounded" role="alert">
							{state.error}
						</div>
					)}

					<button
						disabled={state.loading}
						type="submit"
						className="cursor-pointer mt-20 px-4 py-1 rounded bg-primary hover:bg-primary/80 font-normal tracking-wider text-lg text-neutral-50 flex items-center gap-2 disabled:opacity-60"
					>
						<CheckIcon className="size-6" />
						<span>{state.loading ? "Menyimpan..." : "Simpan"}</span>
					</button>
				</form>
			)}
		</Formik>
	);
}
