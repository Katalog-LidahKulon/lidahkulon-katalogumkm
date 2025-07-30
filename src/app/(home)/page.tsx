"use client";

import Link from "next/link";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import ImgBg from "@/assets/imgs/home/hero_bg.png";
import { motion, circInOut, useScroll, useSpring, useTransform, easeInOut } from "motion/react";
import Image from "next/image";
import ImgKatalog1 from "@/assets/imgs/home/katalog_1.png";
import ImgKatalog4 from "@/assets/imgs/home/katalog_4.png";
import ImgKatalog6 from "@/assets/imgs/home/katalog_6.png";
import { useRef } from "react";

const fadeInVars = {
	init: {
		opacity: 0,
		y: 50
	},
	show: {
		opacity: 1,
		y: 0
	}
};

export default function PageHome() {
	const scrollRef = useRef(null);
	const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end end"] });
	const smoothY = useSpring(scrollYProgress, {
		stiffness: 60,
		damping: 20
	});
	const trans1 = useTransform(smoothY, [0, 0.33, 0.66, 1], [0, 1, 1, 1]);
	const trans2 = useTransform(smoothY, [0, 0.33, 0.66, 1], [0, 0, 1, 1]);
	const trans3 = useTransform(smoothY, [0, 0.33, 0.66, 1], [0, 0, 0, 1]);
	const y1 = useTransform(trans1, [0, 1], ["100%", "0%"]);
	const y2 = useTransform(trans2, [0, 1], ["100%", "0%"]);
	const y3 = useTransform(trans3, [0, 1], ["100%", "0%"]);

	return (
		<>
			<Header />

			<main className="w-full min-h-screen">
				{/* Hero */}
				<section
					style={{
						backgroundImage: `linear-gradient(to top, #f5f5f4, #f5f5f400, #f5f5f400), url(${ImgBg.src})`,
						backgroundSize: "cover",
						backgroundPosition: "center"
					}}
					className="w-full min-h-screen pt-32 pb-16 px-4 flex items-center justify-center"
				>
					<div className="w-fit flex flex-col gap-2 items-center">
						<motion.h1
							variants={fadeInVars}
							initial="init"
							animate="show"
							transition={{ duration: 1.5, ease: circInOut }}
							className="mb-2 font-playfair text-center text-neutral-800 text-3xl sm:text-4xl lg:text-5xl"
						>
							Temukan UMKM di Sekitarmu
						</motion.h1>
						<motion.div
							variants={fadeInVars}
							initial="init"
							animate="show"
							transition={{ duration: 1.5, ease: circInOut, delay: 0.2 }}
							className="w-6/12 border border-t border-neutral-400"
						/>
						<motion.p
							variants={fadeInVars}
							initial="init"
							animate="show"
							transition={{ duration: 1.5, ease: circInOut, delay: 0.4 }}
							className="w-9/12 text-center text-base sm:text-lg"
						>
							Jelajahi produk lokal Dan Dukung ekonomi berkualitas dari pelaku UMKM terpercaya di Lidah Kulon.
						</motion.p>

						<motion.div
							variants={fadeInVars}
							initial="init"
							animate="show"
							transition={{ duration: 1.5, ease: easeInOut, delay: 1 }}
							className="mt-12 "
						>
							<Link
								href="/umkm"
								className="px-8 py-2 border border-primary/60 rounded-full backdrop-blur-sm bg-neutral-50/40 font-normal text-base sm:text-lg text-primary hover:bg-primary/60 hover:text-neutral-50 transition-all duration-800 ease-in-out"
							>
								Jelajahi UMKM
							</Link>
						</motion.div>
					</div>
				</section>

				{/* About */}
				<section ref={scrollRef} className="overflow-y-visible relative w-full min-h-screen px-6 sm:px-12 lg:px-24">
					{/* Bg */}
					<div>
						<motion.div
							style={{ y: y1, opacity: trans1 }}
							className="border-4 absolute -z-10 top-0 left-1/2 -translate-x-full opacity-80"
						>
							<Image
								alt=""
								src={ImgKatalog1}
								width={400}
								height={400}
								className="w-xs p-6 border-2 border-neutral-300 bg-white object-cover object-center"
							/>
						</motion.div>
						<motion.div style={{ y: y2, opacity: trans2 }} className="absolute -z-10 top-[33%] left-1/2 opacity-80">
							<Image
								alt=""
								src={ImgKatalog4}
								width={400}
								height={400}
								className="w-xs p-6 border-2 border-neutral-300 bg-white object-cover object-center"
							/>
						</motion.div>
						<motion.div
							style={{ y: y3, opacity: trans3 }}
							className="absolute -z-10 top-[66%] left-1/2 -translate-x-1/2 opacity-80"
						>
							<Image
								alt=""
								src={ImgKatalog6}
								width={400}
								height={400}
								className="w-xs p-6 border-2 border-neutral-300 bg-white object-cover object-center"
							/>
						</motion.div>
					</div>

					<div className="w-full min-h-screen flex gap-8 flex-wrap justify-between items-center content-center">
						<h2 className="w-fit font-playfair leading-[1.1] text-5xl sm:text-6xl lg:text-7xl flex flex-col bg-clip-text text-transparent bg-gradient-to-r from-primary to-neutral-800">
							<span>
								<span className="italic">Tumbuh</span> dari
							</span>
							<span>
								Akar <span className="italic">Lokal</span>
							</span>
						</h2>

						<p className="w-sm text-justify text-sm md:text-base flex flex-col gap-4">
							<motion.span
								variants={fadeInVars}
								initial="init"
								whileInView="show"
								transition={{ duration: 1.5, ease: circInOut }}
							>
								Di barat Kota Surabaya, Kelurahan Lidah Kulon menjadi rumah bagi banyak pelaku UMKM yang penuh semangat.
								Di sini, usaha kecil tumbuh dalam berbagai bentuk.
							</motion.span>
							<motion.span
								variants={fadeInVars}
								initial="init"
								whileInView="show"
								transition={{ duration: 1.5, ease: circInOut, delay: 0.3 }}
							>
								mulai dari kripik tempe, kue basah, hingga sambal kemasan khas Surabaya. Tak hanya kuliner, warga juga
								menekuni kerajinan tangan, fashion lokal, hingga jasa percetakan digital.
							</motion.span>
						</p>
					</div>

					<div className="w-full min-h-screen flex flex-row-reverse gap-8 flex-wrap justify-between items-center content-center">
						<h2 className="w-fit font-playfair leading-[1.1] text-5xl sm:text-6xl lg:text-7xl flex flex-col bg-clip-text text-transparent bg-gradient-to-l from-secondary to-neutral-800">
							<span>
								<span className="italic">Kekuatan</span> Warga
							</span>
							<span>
								<span className="italic">Semangat</span> Usaha
							</span>
						</h2>

						<motion.p
							variants={fadeInVars}
							initial="init"
							whileInView="show"
							transition={{ duration: 1.5, ease: circInOut }}
							className="max-w-sm text-justify text-sm md:text-base"
						>
							Di balik setiap produk lokal, ada cerita perjuangan dan semangat membangun ekonomi keluarga. Warga Lidah
							Kulon membuktikan bahwa dengan tekad dan kreativitas, usaha kecil bisa menjadi motor penggerak perubahan
							yang nyata.
						</motion.p>
					</div>

					<div className="w-full min-h-screen pt-32 pb-16 flex gap-10 flex-col justify-center items-center">
						<motion.p
							variants={fadeInVars}
							initial="init"
							whileInView="show"
							transition={{ duration: 1.5, ease: easeInOut }}
							className="max-w-4xl font-playfair text-center text-lg sm:text-xl"
						>
							Perjalanan UMKM di Lidah Kulon tak sendiri. Pemerintah Juga terus hadir memberi dukungan melalui
							pelatihan, pendampingan, dan berbagai program pemberdayaan. Kolaborasi antara warga dan pemerintah menjadi
							pondasi kuat bagi pertumbuhan yang berkelanjutan.
						</motion.p>

						<motion.p
							variants={fadeInVars}
							initial="init"
							whileInView="show"
							transition={{ duration: 1.5, ease: easeInOut, delay: 0.3 }}
							className="w-fit bg-clip-text text-transparent bg-gradient-to-l from-secondary to-primary font-playfair text-2xl md:text-3xl italic"
						>
							( Bersama Lebih Kuat )
						</motion.p>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
