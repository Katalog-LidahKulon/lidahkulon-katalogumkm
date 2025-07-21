import { z } from "zod";

export const CreateUmkmSchema = z.object({
	// ID, Created At
	id: z.string(),
	created_at: z.date(),

	// Required Fields
	name: z.string().min(1, "Name is required").max(200, "Name must be at most 200 characters"),
	owner: z.string().min(1, "Owner is required").max(200, "Owner must be at most 200 characters"),
	description: z.string().min(1, "Description is required").max(2000, "Description must be at most 2000 characters"),
	address: z.string().min(1, "Address is required").max(500, "Address must be at most 500 characters"),

	// Optional Contacts
	contacts: z
		.object({
			phone: z.string().max(20, "Phone Number must be at most 20 characters").optional(),
			email: z.string().max(200, "Email must be at most 200 characters").optional()
		})
		.optional(),

	// Optional Links
	links: z
		.object({
			instagram: z.string().max(400, "Instagram url must be at most 400 characters").optional(),
			tiktok: z.string().max(400, "Tiktok url must be at most 400 characters").optional(),
			facebook: z.string().max(400, "Facebook url must be at most 400 characters").optional(),
			youtube: z.string().max(400, "Youtube url must be at most 400 characters").optional(),
			website: z.string().max(400, "Website url must be at most 400 characters").optional()
		})
		.optional()
});

export const UpdateUmkmSchema = z.object({
	name: z.string().max(200, "Name must be at most 200 characters").optional(),
	owner: z.string().max(200, "Owner must be at most 200 characters").optional(),
	description: z.string().max(2000, "Description must be at most 2000 characters").optional(),
	address: z.string().max(500, "Address must be at most 500 characters").optional(),

	contacts: z
		.object({
			phone: z.string().max(20, "Phone Number must be at most 20 characters").optional(),
			email: z.string().max(200, "Email must be at most 200 characters").optional()
		})
		.optional(),

	links: z
		.object({
			instagram: z.string().max(400, "Instagram url must be at most 400 characters").optional(),
			tiktok: z.string().max(400, "Tiktok url must be at most 400 characters").optional(),
			facebook: z.string().max(400, "Facebook url must be at most 400 characters").optional(),
			youtube: z.string().max(400, "Youtube url must be at most 400 characters").optional(),
			website: z.string().max(400, "Website url must be at most 400 characters").optional()
		})
		.optional()
});
