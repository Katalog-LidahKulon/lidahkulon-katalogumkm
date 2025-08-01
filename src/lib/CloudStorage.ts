import type { Bucket } from "@google-cloud/storage";
import { bucket } from "@/lib/gcp";

class CloudStorage {
	#bucket: Bucket;

	constructor(bucket: Bucket) {
		this.#bucket = bucket;
	}

	save = async (file: File | null | undefined, path: string): Promise<string | null> => {
		if (!file || !path) return null;

		const destination = `${path}${file.name}`;
		const blob = this.#bucket.file(destination);

		try {
			const buffer = Buffer.from(await file.arrayBuffer());

			await blob.save(buffer, {
				metadata: { contentType: file.type, cacheControl: "no-cache, max-age=0" },
				resumable: true,
				preconditionOpts: { ifGenerationMatch: 0 }
			});
			return `https://storage.googleapis.com/${this.#bucket.name}/${destination}`;
		} catch (error) {
			console.error("__CloudStorage.save__:", error);
			throw error;
		}
	};

	delete = async (url: string): Promise<boolean | null> => {
		if (!url) return null;

		const match = url.match(/^https:\/\/storage\.googleapis\.com\/[^/]+\/(.+)$/);
		if (!match) throw new Error("Invalid GCS public URL");

		const objectName = decodeURIComponent(match[1]);
		const file = this.#bucket.file(objectName);

		try {
			const [metadata] = await file.getMetadata();
			const generation = metadata.generation;

			await file.delete({ ifGenerationMatch: Number(generation) });
			return true;
		} catch (error) {
			console.error("__CloudStorage.delete__:", error);
			throw error;
		}
	};

	replace = async (
		file: File | null | undefined,
		savePath: string,
		deleteUrl: string | null | undefined,
		maxRetries = 2
	): Promise<string | null> => {
		if (!file || !savePath) return null;

		for (let attempt = 0; attempt <= maxRetries; attempt++) {
			try {
				if (deleteUrl) {
					try {
						await this.delete(deleteUrl);
					} catch (e) {
						console.warn("__CloudStorage.replace__: Delete failed:", e);
					}
				}

				const result = await this.save(file, savePath);
				return result;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				if (error.code === 412 && attempt < maxRetries) {
					console.warn(`__CloudStorage.replace__: Conflict (412). Retry attempt ${attempt + 1}`);
					continue;
				}
				console.error("__CloudStorage.replace__:", error);
				throw error;
			}
		}

		return null;
	};
}

export const cloudStorage = new CloudStorage(bucket);
