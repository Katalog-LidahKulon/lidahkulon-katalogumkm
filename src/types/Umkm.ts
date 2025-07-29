export type UmkmBase = {
	id: string;
	created_at: Date;

	owner: string;
	name: string;
	category: string;
	description: string;
	address: string;

	images: {
		thumbnail: string;
	};
};

export type UmkmDetail = UmkmBase & {
	address_embed: string;

	contacts: {
		email: string;
		phone: string;
	};

	links: {
		instagram: string;
		tiktok: string;
		facebook: string;
		youtube: string;
		website: string;
	};

	images: {
		products: {
			[key: string]: string;
		};
	};
};
