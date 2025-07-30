"use client";

import type { UmkmBase } from "@/types/Umkm";
import Link from "next/link";
import Image from "next/image";
import ImgUrbnr from "@/assets/imgs/logo_urbanara.png";
import SvgSearch from "@/assets/svgs/search-normal";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const fadeInVar = {
	init: {
		opacity: 0,
		y: -50
	},
	show: {
		opacity: 1,
		y: 0
	}
};

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		const handleResize = () => setIsOpen(false);
		document.addEventListener("resize", handleResize);
		return () => document.removeEventListener("resize", handleResize);
	});

	const [result, setResult] = useState<UmkmBase[]>([]);
	const [isSearching, setIsSearching] = useState(true);
	const [search, setSearch] = useState("");
	useEffect(() => {
		const handleSearch = async () => {
			if (search === "") return;

			const res = await fetch(`/api/umkm?search=${search}`);
			const data = await res.json();
			setResult(data.data);
		};
		handleSearch();
	}, [search]);

	const ref1 = useRef<HTMLFormElement>(null);
	const ref2 = useRef<HTMLFormElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!ref1.current || !ref2.current) return;

			if (ref1.current.contains(event.target as Node)) {
				setIsSearching(true);
			} else if (ref2.current.contains(event.target as Node)) {
				setIsSearching(true);
			} else {
				setIsSearching(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className="overflow-visible fixed z-50 w-full px-4 sm:px-8 py-2 backdrop-blur-sm bg-neutral-50/50 flex flex-col md:flex-row justify-between gap-x-16">
			<div className="flex justify-between items-center">
				{/* Logo */}
				<div className="w-full flex items-center">
					<Image src={ImgUrbnr} alt="Logo Urbanara" width="20" height="20" className="h-12 w-fit" />
					<span className="mt-2 font-playfair tracking-tight text-2xl text-neutral-700">LokaKulon</span>
				</div>

				{/* Menu Toggle */}
				<button
					onClick={() => setIsOpen((p) => !p)}
					type="button"
					aria-label="Menu Toggle"
					className="visible md:invisible cursor-pointer w-8 flex flex-col items-end gap-2"
				>
					<div className={`w-full border transition-all duration-500 ${isOpen ? "translate-x-1/3" : ""}`} />
					<div className={`w-8/12 border transition-all duration-500 ${isOpen ? "-translate-x-1/3" : ""}`} />
					<div className={`w-full border transition-all duration-500 ${isOpen ? "-translate-x-1/3" : ""}`} />
				</button>
			</div>

			{/* Desktop Menu */}
			<div className="hidden md:flex flex-col md:flex-row items-start md:items-center gap-y-4 gap-x-12">
				{/* Navigation */}
				<nav>
					<ul className="font-normal tracking-wider text-base flex gap-8">
						<li>
							<Link href="/" className="hover:underline hover:underline-offset-2 hover:text-primary">
								Beranda
							</Link>
						</li>
						<li>
							<Link href="/umkm" className="hover:underline hover:underline-offset-2 hover:text-primary">
								Katalog
							</Link>
						</li>
						<li>
							<Link href="/admin/dashboard" className="hover:underline hover:underline-offset-2 hover:text-primary">
								Admin
							</Link>
						</li>
					</ul>
				</nav>

				{/* Search */}
				<form
					ref={ref1}
					action=""
					className="relative w-full px-2 border border-neutral-800 rounded-full flex items-center gap-2"
				>
					<SvgSearch />
					<input
						type="search"
						placeholder="Cari UMKM"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full max-w-sm py-2 md:py-1 text-sm sm:text-base text-neutral-800 placeholder:text-neutral-500 active:border-0 active:outline-none focus:border-0 focus:outline-none"
					/>
					{isSearching && result.length > 0 && (
						<div className="absolute top-full translate-y-1 right-0 p-2 rounded-xs border border-neutral-300 bg-neutral-100 flex flex-col divide-y divide-neutral-400">
							{Array.isArray(result) &&
								result.map((item, i) => (
									<Link href={`/umkm/${item.id}`} key={i} className="py-1 px-4 rounded-xs hover:bg-neutral-200">
										<p className="font-normal leading-tight text-neutral-800">{item.name}</p>
										<p className="text-sm leading-tight">{item.owner}</p>
									</Link>
								))}
						</div>
					)}
				</form>
			</div>

			{/* Mobile Menu */}
			<div className="md:hidden flex-col md:flex-row items-start md:items-center">
				{/* Navigation */}
				{isOpen && (
					<motion.nav variants={fadeInVar} initial="init" animate={isOpen ? "show" : "init"} className="my-2">
						<ul className="font-normal tracking-wider text-base flex gap-8">
							<li>
								<Link href="/">Beranda</Link>
							</li>
							<li>
								<Link href="/umkm">Katalog</Link>
							</li>
							<li>
								<Link href="/admin/dashboard">Admin</Link>
							</li>
						</ul>
					</motion.nav>
				)}

				{/* Search */}
				{isOpen && (
					<motion.form
						variants={fadeInVar}
						initial="init"
						animate={isOpen ? "show" : "init"}
						transition={{ delay: 0.2 }}
						ref={ref2}
						action=""
						className="relative w-full mb-2 px-2 border border-neutral-800 rounded-full flex items-center gap-2"
					>
						<SvgSearch />
						<input
							type="search"
							placeholder="Cari UMKM"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full py-2 md:py-1 text-sm sm:text-base text-neutral-800 placeholder:text-neutral-700 active:border-0 active:outline-none focus:border-0 focus:outline-none"
						/>
						{isSearching && result.length > 0 && (
							<div className="absolute top-full translate-y-1 left-0 p-2 rounded-xs border border-neutral-300 bg-neutral-100 flex flex-col divide-y divide-neutral-400">
								{Array.isArray(result) &&
									result.map((item, i) => (
										<Link href={`/umkm/${item.id}`} key={i} className="py-1 px-4 rounded-xs hover:bg-neutral-200">
											<p className="font-normal leading-tight text-neutral-800">{item.name}</p>
											<p className="text-sm leading-tight">{item.owner}</p>
										</Link>
									))}
							</div>
						)}
					</motion.form>
				)}
			</div>
		</header>
	);
}
