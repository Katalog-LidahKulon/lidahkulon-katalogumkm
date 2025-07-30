"use client";

import Link from "next/link";
import Image from "next/image";
import ImgLogo1 from "@/assets/imgs/logo_surabaya.png";
import ImgLogo2 from "@/assets/imgs/logo_UPNVJT.png";
import ImgLogo3 from "@/assets/imgs/logo_urbanara.png";
import SvgPhone from "@/assets/svgs/Phone";
import SvgSms from "@/assets/svgs/sms";
import SvgMap from "@/assets/svgs/Map_Pin";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export default function Footer() {
	return (
		<footer className="relative w-full px-4 sm:px-8 lg:px-16 pt-16 pb-20 border-t-2 border-neutral-300 flex flex-col md:flex-row items-start gap-8 md:gap-16">
			{/* Logo & Title */}
			<div className="w-full">
				<div className="flex gap-3 items-center">
					<div className="w-10 border-t-2 border-neutral-400" />
					<Image
						src={ImgLogo1}
						alt="Logo"
						width="30"
						height="30"
						className="h-10 w-fit mx-1.5 object-cover object-center"
					/>
					<Image src={ImgLogo2} alt="Logo" width="30" height="30" className="h-10 w-fit object-cover object-center" />
					<Image src={ImgLogo3} alt="Logo" width="30" height="30" className="h-12 w-fit object-cover object-center" />
					<div className="w-10 border-t-2 border-neutral-400" />
				</div>
				<div className="mt-4">
					<span className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-neutral-800">
						Katalog UMKM Lidah Kulon
					</span>
					<p>
						Copyright © 2025 Urbanara | Powered By{" "}
						<Link
							target="_blank"
							href="https://linkedin.com/in/adefathoniprastya"
							className="relative hover:py-1 hover:px-4 text-primary font-normal underline underline-offset-2 hover:text-neutral-50 transition-all duration-500 group"
						>
							<span>Urbanara Dev</span>
							<span className="absolute -z-10 top-0 left-0 size-full bg-transparent translate-x-full translate-y-full skew-x-12 transition-all duration-500 group-hover:skew-0 group-hover:translate-0 group-hover:bg-primary/80" />
						</Link>
					</p>
				</div>
			</div>

			{/* Navigation */}
			<nav className="w-fit">
				<ul className="flex flex-col gap-4 underline underline-offset-2 text-neutral-800">
					<li>
						<Link href="/" className="hover:text-primary">
							Beranda
						</Link>
					</li>
					<li>
						<Link href="/umkm" className="hover:text-primary">
							Katalog
						</Link>
					</li>
					<li>
						<Link href="/admin/dashboard" className="hover:text-primary">
							Admin
						</Link>
					</li>
				</ul>
			</nav>

			{/* Contacts */}
			<ul className="w-fit flex flex-col gap-4 text-neutral-800">
				<li className="underline underline-offset-2 break-words">
					<Link href="tel:+62317532044" className="hover:text-primary">
						<SvgPhone className="inline me-2" />
						(031) 7532044
					</Link>
				</li>
				<li className="underline underline-offset-2 break-words">
					<Link href="mailto:kelurahanlidahkulon@gmail.com" className="hover:text-primary">
						<SvgSms className="inline me-2" />
						kelurahanlidahkulon@gmail.com
					</Link>
				</li>
				<li className="break-words">
					<SvgMap className="inline me-2" />
					Raya Menganti Lidah Kulon No. 5, Surabaya, Jawa Timur, Indonesia.
				</li>
			</ul>

			{/* Back To Top */}
			<button
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				type="button"
				className="cursor-pointer absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center animate-pulse hover:text-primary"
			>
				<ArrowUpIcon className="size-4 animate-bounce" />
				<span className="font-normal">Kembali</span>
			</button>
		</footer>
	);
}
