import { z } from "zod";

export const CreateUmkmSchema = z.object({
	// ID, Created At
	id: z.string(),
	created_at: z.date(),

	// Name, Owner, Description, Address
	name: z.string().min(1, "Name is required").max(200, "Name must be at most 200 characters"),
	owner: z.string().min(1, "Owner is required").max(200, "Owner must be at most 200 characters"),
	description: z.string().min(1, "Description is required").max(2000, "Description must be at most 2000 characters"),
	address: z.string().min(1, "Address is required").max(500, "Address must be at most 500 characters"),

	// Contacts
	contacts: z
		.object({
			whatsapp: z.string().max(20, "WhatsApp Number must be at most 20 characters").optional(),
			email: z.string().max(200, "Email must be at most 200 characters").optional(),
			instagram: z.string().max(400, "Instagram url must be at most 400 characters").optional(),
			tiktok: z.string().max(400, "Tiktok url must be at most 400 characters").optional(),
			youtube: z.string().max(400, "Youtube url must be at most 400 characters").optional(),
			website: z.string().max(400, "Website url must be at most 400 characters").optional()
		})
		.optional()
});
