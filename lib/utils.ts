import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}


export const formatCurrency = (value: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format(value);
};

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) {
		throw new Error(`Invalid date string: ${dateString}`);
	}
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
};

export const formatDateTime = (dateString: string) => {
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) {
		throw new Error(`Invalid date string: ${dateString}`);
	}
	return date.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
};