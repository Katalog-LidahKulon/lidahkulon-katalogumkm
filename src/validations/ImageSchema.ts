import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const ImageFileSchema = z
	.instanceof(File, { message: "Image file is required" })
	.refine((file) => file.size <= MAX_FILE_SIZE, {
		message: `Image must be less than ${MAX_FILE_SIZE / (1024 * 1024)} MB`
	})
	.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
		message: "Only JPG, JPEG, PNG, or WebP images are allowed"
	});
