import { z } from "zod";

export const AuthSchema = z
	.object({
		password: z.string().min(1, "Password cannot be empty").max(200, "Password is too long").trim()
	})
	.strict();
