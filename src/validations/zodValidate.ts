import { z } from "zod";

export const createFileSchema = (maxMB: number, types: string[], optional = false) => {
	const base = z
		.instanceof(File)
		.refine((file) => file.size <= maxMB * 1024 * 1024, {
			message: `File must be less than ${maxMB} MB`
		})
		.refine((file) => types.includes(file.type), {
			message: `Only ${types.join(", ")} files are allowed`
		});

	return optional ? base.optional() : base;
};
