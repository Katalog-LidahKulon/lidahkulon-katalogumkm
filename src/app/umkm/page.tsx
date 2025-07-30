"use client";

import type { UmkmBase } from "@/types/Umkm";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Image from "next/image";
import ImgObj1 from "@/assets/imgs/catalog/obj1.png";
import ImgObj2 from "@/assets/imgs/catalog/obj2.png";
import ImgObj3 from "@/assets/imgs/catalog/obj3.png";
import ImgObj4 from "@/assets/imgs/catalog/obj4.png";
import ImgObj5 from "@/assets/imgs/catalog/obj5.png";
import SvgSearch from "@/assets/svgs/search-normal";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useSpring, useTransform } from "motion/react";
import { motion } from "motion/react";

type SortOption = "newest" | "oldest" | "a-z" | "z-a";
const sorts = [
	{
		label: "Terbaru",
		value: "newest"
	},
	{
		label: "Terlama",
		value: "oldest"
	},
	{
		label: "A-Z",
		value: "a-z"
	},
	{
		label: "Z-A",
		value: "z-a"
	}
];

export default function PageUmkm() {
	const [umkmList, setUmkmList] = useState<UmkmBase[]>([]);
	const categories = useMemo(
		() => umkmList.map((item) => item.category).filter((value, index, self) => self.indexOf(value) === index),
		[umkmList]
	);
	const [filteredData, setFilteredData] = useState<UmkmBase[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOption, setSortOption] = useState<SortOption>("newest");
	useEffect(() => {
		const fetchUmkmList = async () => {
			const res = await fetch("/api/umkm");
			const data = await res.json();
			setUmkmList(data.data);
			setFilteredData(data.data);
		};
		fetchUmkmList();
	}, []);
	const groupedData = useMemo(() => {
		return filteredData.reduce((acc: Record<string, UmkmBase[]>, umkm) => {
			(acc[umkm.category] ||= []).push(umkm);
			return acc;
		}, {});
	}, [filteredData]);
	useEffect(() => {
		let result = [...umkmList];

		if (searchTerm) {
			result = result.filter(
				(item) =>
					item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.category.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		switch (sortOption) {
			case "newest":
				result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
				break;
			case "oldest":
				result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
				break;
			case "a-z":
				result.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "z-a":
				result.sort((a, b) => b.name.localeCompare(a.name));
				break;
		}

		setFilteredData(result);
	}, [umkmList, searchTerm, sortOption]);

	const scrollToCategory = (category: string) => {
		const element = document.getElementById(`category-${category}`);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const scrollRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: scrollRef,
		offset: ["start start", "end start"]
	});
	const smoothY = useSpring(scrollYProgress, {
		stiffness: 30,
		damping: 20
	});
	const y1 = useTransform(smoothY, [0, 1], [0, -100]);
	const x1 = useTransform(smoothY, [0, 1], [0, -1000]);
	const y2 = useTransform(smoothY, [0, 1], [0, -200]);
	const x2 = useTransform(smoothY, [0, 1], [0, 50]);
	const y3 = useTransform(smoothY, [0, 1], [0, 400]);
	const x3 = useTransform(smoothY, [0, 1], [0, 100]);
	const y4 = useTransform(smoothY, [0, 1], [0, -400]);
	const x4 = useTransform(smoothY, [0, 1], [0, 100]);
	const y5 = useTransform(smoothY, [0, 1], [0, 50]);
	const x5 = useTransform(smoothY, [0, 1], [0, 150]);

	return (
		<>
			<Header />

			<main>
				<section ref={scrollRef} className="w-full min-h-screen pt-32 pb-16 flex items-center justify-center">
					{/* Bg */}
					<div className="fixed -z-10 top-0 left-0 w-full min-h-screen opacity-80">
						<motion.div
							style={{
								x: x1,
								y: y1
							}}
							className="absolute top-1/3 left-0 -rotate-6"
						>
							<motion.div
								animate={{
									y: ["0%", "-10%", "0%", "6%", "0%"],
									x: ["0%", "5%", "0%", "-8%", "0%"],
									rotate: [0, 360]
								}}
								transition={{
									duration: 40,
									repeat: Infinity,
									repeatType: "loop",
									ease: "easeInOut"
								}}
							>
								<Image
									src={ImgObj5}
									alt="UMKM Background"
									width={400}
									height={400}
									priority
									className="w-[8rem] sm:w-[10rem] lg:w-[12rem] object-cover object-center"
								/>
							</motion.div>
						</motion.div>
						<motion.div style={{ x: x2, y: y2 }} className="absolute top-0 left-1/4 -translate-y-1/4">
							<motion.div
								animate={{
									y: ["0%", "8%", "0%", "-6%", "0%"],
									x: ["0%", "-10%", "0%", "2%", "0%"],
									rotate: [0, -360]
								}}
								transition={{
									duration: 40,
									repeat: Infinity,
									repeatType: "loop",
									ease: "easeInOut"
								}}
							>
								<Image
									src={ImgObj1}
									alt="UMKM Background"
									width={400}
									height={400}
									priority
									className="rotate-6 w-[8rem] sm:w-[10rem] lg:w-[12rem] object-cover object-center"
								/>
							</motion.div>
						</motion.div>
						<motion.div
							style={{ x: x3, y: y3 }}
							className="absolute bottom-0 left-1/2 translate-y-1/3 -translate-x-2/3"
						>
							<motion.div
								animate={{
									y: ["0%", "-6%", "0%", "4%", "0%"],
									x: ["0%", "4%", "0%", "-2%", "0%"],
									rotate: [0, -360]
								}}
								transition={{
									duration: 40,
									repeat: Infinity,
									repeatType: "loop",
									ease: "easeInOut"
								}}
							>
								<Image
									src={ImgObj3}
									alt="UMKM Background"
									width={400}
									height={400}
									priority
									className="-rotate-12 w-[8rem] sm:w-[10rem] lg:w-[12rem] object-cover object-center"
								/>
							</motion.div>
						</motion.div>
						<motion.div
							style={{
								x: x4,
								y: y4
							}}
							className="absolute top-1/4 right-0 -translate-y-1/2 translate-x-1/3"
						>
							<motion.div
								animate={{
									y: ["0%", "10%", "0%", "-7%", "0%"],
									x: ["0%", "-5%", "0%", "8%", "0%"],
									rotate: [0, 360]
								}}
								transition={{
									duration: 45,
									repeat: Infinity,
									repeatType: "loop",
									ease: "easeInOut"
								}}
							>
								<Image
									src={ImgObj2}
									alt="UMKM Background"
									width={400}
									height={400}
									priority
									className="-rotate-12 w-[8rem] sm:w-[10rem] lg:w-[12rem] object-cover object-center"
								/>
							</motion.div>
						</motion.div>
						<motion.div
							style={{ x: x5, y: y5 }}
							className="absolute bottom-1/4 right-0 translate-x-1/4 translate-y-3/4"
						>
							<motion.div
								animate={{
									y: ["0%", "-5%", "0%", "10%", "0%"],
									x: ["0%", "7%", "0%", "-5%", "0%"],
									rotate: [0, -360]
								}}
								transition={{
									duration: 40,
									repeat: Infinity,
									repeatType: "loop",
									ease: "easeInOut"
								}}
							>
								<Image
									src={ImgObj4}
									alt="UMKM Background"
									width={400}
									height={400}
									priority
									className="rotate-6 w-[8rem] sm:w-[10rem] lg:w-[12rem] object-cover object-center"
								/>
							</motion.div>
						</motion.div>
					</div>

					<div className="w-full max-w-2xl flex flex-col gap-3 items-center">
						<h1 className="mb-2 font-playfair text-center text-neutral-800 text-3xl sm:text-4xl lg:text-5xl">
							Katalog UMKM Lidah Kulon
						</h1>
						<div className="w-6/12 border border-t border-neutral-400" />
						<p className="text-center text-lg text-neutral-600">
							Satu tempat untuk mengenal dan mendukung UMKM Lidah Kulon. Cek produk, hubungi langsung, dan bantu
							tumbuhkan ekonomi lokal!
						</p>
					</div>
				</section>

				<section className="relative w-full min-h-screen md:grid md:grid-cols-4">
					{/* Filters */}
					<aside className="col-span-1 relative md:sticky z-10 top-0 md:top-24 left-0 h-fit px-8 py-4 bg-neutral-100/70 backdrop-blur flex flex-col gap-4">
						{/* Categories */}
						<div className="font-playfair text-xl text-neutral-700 flex flex-wrap md:flex-nowrap md:flex-col gap-y-2 gap-x-8 items-start">
							{categories.map((category, i) => (
								<button
									key={i}
									type="button"
									onClick={() => scrollToCategory(category)}
									className="cursor-pointer underline underline-offset-2 hover:text-primary"
								>
									{category}
								</button>
							))}
						</div>

						{/* Search */}
						<form action="" className="w-full px-2 border  rounded-full flex items-center gap-2">
							<SvgSearch />
							<input
								type="search"
								placeholder="Cari UMKM"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full max-w-sm py-1 text-sm sm:text-base text-neutral-800 placeholder:text-neutral-600 active:border-0 active:outline-none focus:border-0 focus:outline-none"
							/>
						</form>

						{/* Sort */}
						<div className="text-sm">
							<p>Urutkan Berdasarkan</p>
							<div className="mt-2 flex flex-wrap gap-2 text-neutral-700">
								{sorts.map((sort, i) => (
									<button
										key={i}
										className={`cursor-pointer px-4 py-0.5 rounded-full ${
											sortOption === sort.value
												? "bg-primary/80 text-neutral-50"
												: "bg-neutral-200  hover:bg-primary/20"
										}`}
										onClick={() => setSortOption(sort.value as SortOption)}
									>
										{sort.label}
									</button>
								))}
							</div>
						</div>
					</aside>

					<div className="mt-8 col-span-3 w-full px-8">
						{/* Umkm Lists */}
						{Object.entries(groupedData).map(([category, value], i) => (
							<div key={i} id={`category-${category}`} className="w-full mb-12">
								<h2 className="mb-6 font-playfair text-2xl md:text-3xl text-neutral-700">{category}</h2>

								<div className="w-full overflow-auto flex gap-4 items-start">
									{/* Item Cards */}
									{value.map((data, j) => (
										<Link
											href={`/umkm/${data.id}`}
											key={j}
											className="overflow-clip grow-0 shrink-0 cursor-pointer relative w-3xs aspect-[7/12] group"
										>
											<p className="absolute top-2 right-2 w-fit px-4 py-0.5 rounded-full bg-neutral-200 font-medium text-xs group-hover:opacity-50 group-hover:-translate-y-5 transition-all duration-500">
												{data?.category}
											</p>

											<div className="absolute bottom-0 left-0 w-full p-2 group-hover:opacity-50 group-hover:translate-y-2/3 transition-all duration-1500">
												<h1 className="font-normal text-neutral-100">{data?.name}</h1>
												<p className="text-sm text-neutral-200">{data?.owner}</p>
												<div className="w-8/12 my-1 border-t border-neutral-400" />
												<p className="min-h-8 text-truncate text-xs text-neutral-300">{data?.address}</p>
											</div>

											<Image
												src={data?.images.thumbnail || ""}
												alt={`${data?.name} Profile Image`}
												width={400}
												height={600}
												className="absolute -z-10 size-full object-cover object-center brightness-80 group-hover:brightness-100 transition-all duration-700"
											/>
											<div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-t from-neutral-900 via-transparent to-transparent group-hover:translate-y-1/4 transition-all duration-1000" />
										</Link>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
