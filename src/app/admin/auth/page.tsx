"use client";

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminAuth() {
	const router = useRouter();
	const [pass, setPass] = useState("");
	const [resState, setResState] = useState<{ loading: boolean; error: string | null }>({
		loading: false,
		error: null
	});

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch("/api/auth", {
				method: "POST",
				body: JSON.stringify({ password: pass })
			});

			const data = (await res.json()) as { success: boolean };

			if (!data.success) {
				throw new Error("Password salah, silahkan coba lagi!");
			}

			router.replace("/admin/dashboard");
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
					Admin Login
					<form onSubmit={handleLogin} action="">
						<input
							value={pass}
							onChange={(e) => setPass(e.target.value)}
							type="text"
							placeholder="Masukkan Password"
							className="border border-neutral-300"
						/>
						{resState.error && <p>{resState?.error}</p>}

						<button type="submit" className="cursor-pointer">
							{resState.loading ? "Loading..." : "Login"}
						</button>
					</form>
				</section>
			</main>

			<Footer />
		</>
	);
}
