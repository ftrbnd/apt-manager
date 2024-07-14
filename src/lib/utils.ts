import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Apartment } from './drizzle/schema';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sum(nums: number[]) {
	return nums.reduce((a, b) => a + b, 0).toFixed(2);
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
