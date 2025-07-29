export const formatDate = (date: Date | string | number | undefined) => {
	if (!date) throw new Error("Date is required");

	const dateObj = new Date(date);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric"
	};
	return dateObj.toLocaleDateString("id-ID", options);
};

export const extractGoogleMapsSrc = (str: string) => {
	const regex = /<iframe[^>]*src="([^"]*)"[^>]*>/;
	const match = str.match(regex);
	return match ? match[1] : null;
};
