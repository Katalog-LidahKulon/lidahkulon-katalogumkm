import type { Bucket } from "@google-cloud/storage";
import { bucket } from "@/lib/gcp";

class CloudStorage {
	#bucket: Bucket;

	constructor(bucket: Bucket) {
		this.#bucket = bucket;
	}

	save = async (file: File | null | undefined, path: string) => {
		if (!file || !path) {
			return null;
		}

		try {
			const buffer = Buffer.from(await file.arrayBuffer());
			const destination = `${path}${file.name}`;
			const blob = this.#bucket.file(destination);

			await new Promise((resolve, reject) => {
				blob
					.createWriteStream({ metadata: { contentType: file.type } })
					.on("finish", resolve)
					.on("error", reject)
					.end(buffer);
			});

			return `https://storage.googleapis.com/${this.#bucket.name}/${destination}`;
		} catch (e) {
			throw e;
		}
	};

	delete = async (url: string) => {
		if (!url) return null;

		const match = url.match(/^https:\/\/storage\.googleapis\.com\/([^/]+)\/(.+)$/);
		if (!match) throw new Error("Invalid GCS public URL");

		const [, , objectName] = match;

		try {
			await this.#bucket.file(objectName).delete();
			return true;
		} catch (e) {
			throw e;
		}
	};

	replace = async (file: File | null | undefined, savePath: string, deletePath: string) =>
		this.delete(deletePath).then(() => this.save(file, savePath));
}

export const cloudStorage = new CloudStorage(bucket);
