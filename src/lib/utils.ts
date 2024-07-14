import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Apartment } from './drizzle/schema';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function sum(nums: number[]) {
	return nums.reduce((a, b) => a + b, 0);
}

export function formatRentChecks(checks: number[]): string {
	const s = sum(checks);

	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(s);
}

function camelize(str: string) {
	return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
}

export function toCamelCase(method: Apartment['paymentMethod']): string {
	if (method === 'MONEY ORDER') {
		return method
			.split(' ')
			.map((v, i) => (i === 0 ? camelize(v) : v.toLowerCase()))
			.join(' ');
	} else {
		return camelize(method);
	}
}
