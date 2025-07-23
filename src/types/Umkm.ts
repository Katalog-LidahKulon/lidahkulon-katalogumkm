export type UmkmBase = {
	id: string;
	crated_at: Date;

	owner: string;
	name: string;
	tag: string;
	description: string;
	address: string;

	images: {
		thumbnail: string;
	};
};

export type UmkmDetail = UmkmBase & {
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
		background: string;
		products: {
			[key: string]: string;
		};
	};
};
