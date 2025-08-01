"use client";

import { UmkmBase } from "@/types/Umkm";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { TrashIcon, PlusIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { formatDate } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import CreateUmkmForm from "@/components/CreateUmkmForm";

export default function AdminDashboard() {
	const [refetched, setRefetched] = useState(1);
	const [data, setData] = useState<UmkmBase[]>([]);
	const [filters, setFilters] = useState({ category: "", search: "" });
	const categories = useMemo(
		() => data.map((item) => item.category).filter((value, index, self) => self.indexOf(value) === index),
		[data]
	);
	useEffect(() => {
		const getData = async () => {
			const res = await fetch("/api/umkm");
			const data = await res.json();

			setData(data.data as UmkmBase[]);
		};
		getData();
	}, [refetched]);
	const filteredData = useMemo(() => {
		let tempData = data;

		if (filters.search !== "") {
			tempData = tempData.filter((item) => item.name.toLowerCase().includes(filters.search.toLowerCase()));
		}
		if (filters.category !== "") {
			tempData = tempData.filter((item) => item.category === filters.category);
		}

		return tempData;
	}, [data, filters.category, filters.search]);
	const handleDelete = async (id: string) => {
		await fetch(`/api/umkm/${id}`, { method: "DELETE" });

		const newData = data.filter((item) => item.id !== id);
		setData(newData);
	};

	const [showModal, setShowModal] = useState(false);

	const handleRefetch = () => setRefetched((p) => p + 1);

	return (
		<>
			<Header />

			<main className="min-h-screen bg-neutral-100 pt-32 pb-16">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
						<div>
							<h1 className="font-playfair text-3xl md:text-4xl text-neutral-800">Admin Dashboard</h1>
							<p className="text-neutral-600 mt-2">Kelola data UMKM yang terdaftar dalam sistem.</p>
						</div>
						<div className="mt-4 md:mt-0 flex gap-3">
							<button
								onClick={() => setShowModal(true)}
								type="button"
								className="cursor-pointer flex items-center gap-2 bg-primary hover:bg-primary/80 text-neutral-50 font-normal py-2 px-4 rounded-xs transition-colors"
							>
								<PlusIcon className="size-5" /> Tambah UMKM
							</button>
						</div>
					</div>

					<div className="bg-neutral-50 rounded-sm shadow-md overflow-hidden">
						{/* Filters */}
						<div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row gap-4">
							{/* Search */}
							<form action="" className="relative flex-grow">
								<input
									onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
									value={filters.search}
									type="text"
									placeholder="Cari UMKM..."
									className="w-full pl-10 pr-4 py-2 border-2 border-neutral-300 rounded-xs focus:ring-0 focus:outline-0 focus:border-primary"
								/>
								<MagnifyingGlassIcon className="absolute left-3 top-3 size-5 text-neutral-400" />
							</form>

							{/* Category */}
							<div className="flex gap-3">
								<select
									value={filters.category}
									onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))}
									className="bg-neutral-100 border-2 border-neutral-300 rounded-lg px-3 py-2 focus:outline-0 focus:border-primary"
								>
									<option value="">Semua Kategori</option>
									{categories.map((category, i) => (
										<option key={i} value={category} className="capitalize">
											{category}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-neutral-200">
								<thead className="bg-neutral-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
										>
											Nama UMKM
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
										>
											Pemilik
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
										>
											Kategori
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
										>
											Alamat
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
										>
											Tanggal Daftar
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider"
										>
											Aksi
										</th>
									</tr>
								</thead>

								<tbody className="bg-neutral-50 divide-y divide-neutral-200">
									{filteredData.map((umkm, i) => (
										<tr key={i} className="hover:bg-neutral-50 transition-colors">
											<td className="px-6 py-4 whitespace-nowrap">
												<Link
													href={`/admin/dashboard/${umkm.id}`}
													className="font-medium text-primary hover:text-primary/80 underline underline-offset-2"
												>
													{umkm.name}
												</Link>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<p className="text-neutral-900">{umkm.owner}</p>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<p className="px-3 py-0.5 inline-flex text-xs tracking-wider font-medium rounded-full bg-neutral-200 text-neutral-700">
													{umkm.category}
												</p>
											</td>
											<td className="px-6 py-4 max-w-xs">
												<p className="text-neutral-500 truncate" style={{ maxWidth: "200px" }}>
													{umkm.address}
												</p>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-neutral-500">{formatDate(umkm.created_at)}</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
												<button
													onClick={() => handleDelete(umkm.id)}
													type="button"
													className="cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-800"
												>
													<TrashIcon className="size-5" /> Hapus
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<CreateUmkmForm show={showModal} setShow={setShowModal} refetch={handleRefetch} />
			</main>

			<Footer />
		</>
	);
}
