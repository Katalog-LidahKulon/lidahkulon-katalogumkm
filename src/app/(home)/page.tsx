import Link from "next/link";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import ImgBg from "@/assets/imgs/home/hero_bg.png";
// import Image from "next/image";
// import ImgKatalog1 from "@/assets/imgs/home/katalog_1.png";
// import ImgKatalog2 from "@/assets/imgs/home/katalog_2.png";
// import ImgKatalog3 from "@/assets/imgs/home/katalog_3.png";
// import ImgKatalog4 from "@/assets/imgs/home/katalog_4.png";
// import ImgKatalog5 from "@/assets/imgs/home/katalog_5.png";
// import ImgKatalog6 from "@/assets/imgs/home/katalog_6.png";

export default async function PageHome() {
	return (
		<>
			<Header />

			<main className="w-full min-h-screen">
				<section
					style={{
						backgroundImage: `linear-gradient(to top, #f5f5f4, #f5f5f400, #f5f5f400), url(${ImgBg.src})`,
						backgroundSize: "cover",
						backgroundPosition: "center"
					}}
					className="w-full min-h-screen pt-32 pb-16 px-4 flex items-center justify-center"
				>
					<div className="w-fit flex flex-col gap-2 items-center">
						<h1 className="mb-2 font-playfair text-center text-neutral-800 text-3xl sm:text-4xl lg:text-5xl">
							Temukan UMKM di Sekitarmu
						</h1>
						<div className="w-6/12 border border-t border-neutral-400" />
						<p className="w-9/12 text-center text-base sm:text-lg">
							Jelajahi produk lokal Dan Dukung ekonomi berkualitas dari pelaku UMKM terpercaya di Lidah Kulon.
						</p>
						<Link
							href="/umkm"
							className="mt-12 px-8 py-2 border border-primary/60 rounded-full backdrop-blur-sm bg-neutral-50/40 font-normal	 text-base sm:text-lg text-primary hover:bg-primary/60 hover:text-neutral-50 transition-all duration-800 ease-in-out"
						>
							Jelajahi UMKM
						</Link>
					</div>
				</section>

				{/* <section className="w-full">
					<div className="w-full grid grid-cols-3">
						<div className="grid grid-cols-2">
							<div className="flex flex-col border-2 border-red-600">
								<Image
									alt=""
									src={ImgKatalog1}
									width={400}
									height={400}
									className="size-full object-cover object-center"
								/>
								<Image
									alt=""
									src={ImgKatalog2}
									width={400}
									height={400}
									className="size-full object-cover object-center"
								/>
							</div>

							<Image
								alt=""
								src={ImgKatalog3}
								width={400}
								height={400}
								className="size-full object-cover object-center"
							/>
						</div>

						<Image
							alt=""
							src={ImgKatalog4}
							width={400}
							height={400}
							className="aspect-square size-full object-cover object-center"
						/>

						<div className="aspect-square flex flex-col">
							<Image
								alt=""
								src={ImgKatalog5}
								width={400}
								height={400}
								className="size-full object-cover object-center"
							/>
							<Image
								alt=""
								src={ImgKatalog6}
								width={400}
								height={400}
								className="size-full object-cover object-center"
							/>
						</div>
					</div>
				</section> */}

				<section className="w-full min-h-screen px-6 sm:px-12 lg:px-24">
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
							<span>
								Di barat Kota Surabaya, Kelurahan Lidah Kulon menjadi rumah bagi banyak pelaku UMKM yang penuh semangat.
								Di sini, usaha kecil tumbuh dalam berbagai bentuk.
							</span>
							<span>
								mulai dari kripik tempe, kue basah, hingga sambal kemasan khas Surabaya. Tak hanya kuliner, warga juga
								menekuni kerajinan tangan, fashion lokal, hingga jasa percetakan digital.
							</span>
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

						<p className="max-w-sm text-justify text-sm md:text-base">
							Di balik setiap produk lokal, ada cerita perjuangan dan semangat membangun ekonomi keluarga. Warga Lidah
							Kulon membuktikan bahwa dengan tekad dan kreativitas, usaha kecil bisa menjadi motor penggerak perubahan
							yang nyata.
						</p>
					</div>

					<div className="w-full min-h-screen pt-32 pb-16 flex gap-10 flex-col justify-center items-center">
						<p className="max-w-4xl font-playfair text-center text-lg sm:text-xl">
							Perjalanan UMKM di Lidah Kulon tak sendiri. Pemerintah Juga terus hadir memberi dukungan melalui
							pelatihan, pendampingan, dan berbagai program pemberdayaan. Kolaborasi antara warga dan pemerintah menjadi
							pondasi kuat bagi pertumbuhan yang berkelanjutan.
						</p>

						<p className="w-fit bg-clip-text text-transparent bg-gradient-to-l from-secondary to-primary font-playfair text-2xl md:text-3xl italic">
							( Bersama Lebih Kuat )
						</p>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
