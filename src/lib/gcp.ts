import { Firestore } from "@google-cloud/firestore";
import { Storage } from "@google-cloud/storage";

const rawKey = process.env.GOOGLE_PRIVATE_KEY!;
const privateKey = rawKey.replace(/\\n/g, "\n");
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!;

const firestore = new Firestore({
	projectId: process.env.GCP_PROJECT_ID,
	credentials: {
		private_key: privateKey,
		client_email: clientEmail
	}
});

const storage = new Storage({
	projectId: process.env.GCP_PROJECT_ID,
	credentials: {
		private_key: privateKey,
		client_email: clientEmail
	}
});

const bucket = storage.bucket(process.env.GCP_STORAGE_BUCKET!);

export { firestore, bucket };
