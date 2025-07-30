"use client";

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { useState } from "react";
import SvgShow from "@/assets/svgs/Show";
import SvgHide from "@/assets/svgs/Hide";

export default function AdminAuth() {
	const [pass, setPass] = useState("");
	const [show, setShow] = useState(false);
	const [resState, setResState] = useState<{ loading: boolean; error: string | null }>({
		loading: false,
		error: null
	});

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setResState((p) => ({ ...p, loading: true }));

		try {
			const res = await fetch("/api/auth", {
				method: "POST",
				body: JSON.stringify({ password: pass })
			});

			const data = (await res.json()) as { success: boolean };

			if (!data.success) {
				throw new Error("Password salah, silahkan coba lagi!");
			}

			window.location.href = "/admin/dashboard";
		} catch (error) {
			if (error instanceof Error) {
				setResState((p) => ({ ...p, error: error.message }));
			}
			console.error(error);
		} finally {
			setResState((p) => ({ ...p, loading: false }));
		}
	};

	return (
		<>
			<Header />

			<main>
				<section className="w-full min-h-screen flex justify-center items-center">
					<div className="max-w-lg px-12 py-18 flex flex-col gap-12 shadow-xl">
						<div>
							<h1 className="font-playfair text-3xl md:text-4xl text-neutral-800">Admin Login</h1>
							<p className="">Masuk untuk mengelola konten dan data UMKM.</p>
						</div>

						<form action="">
							<div className="relative w-full">
								<label htmlFor="pass" className="text-sm text-neutral-700">
									Password
								</label>

								<input
									id="pass"
									value={pass}
									onChange={(e) => setPass(e.target.value)}
									type={show ? "text" : "password"}
									placeholder="Masukkan Password"
									className="w-full py-2 px-1 border-b-2 border-neutral-500"
								/>

								{show ? (
									<SvgHide
										className="absolute top-2/3 right-1 -translate-y-1/2 cursor-pointer"
										onClick={() => setShow(false)}
									/>
								) : (
									<SvgShow
										className="absolute top-2/3 right-1 -translate-y-1/2 cursor-pointer"
										onClick={() => setShow(true)}
									/>
								)}

								{resState.error && (
									<p className="absolute bottom-0 translate-y-full mt-2 text-red-400">{resState?.error}</p>
								)}
							</div>

							<button
								disabled={resState.loading}
								onClick={(e) => handleLogin(e)}
								type="submit"
								className="cursor-pointer w-full mt-16 py-2 px-4 rounded-full bg-primary font-regular tracking-wide text-lg text-neutral-50 flex items-center justify-center hover:bg-primary/90 active:bg-primary disabled:opacity-60"
							>
								{resState.loading ? "Loading..." : "Login"}
							</button>
						</form>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
