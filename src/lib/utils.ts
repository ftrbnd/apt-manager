import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Apartment } from './drizzle/schema/apartments';

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

const ones = [
	'',
	'One',
	'Two',
	'Three',
	'Four',
	'Five',
	'Six',
	'Seven',
	'Eight',
	'Nine',
];
const tens = [
	'',
	'',
	'Twenty',
	'Thirty',
	'Forty',
	'Fifty',
	'Sixty',
	'Seventy',
	'Eighty',
	'Ninety',
];
const teens = [
	'Ten',
	'Eleven',
	'Twelve',
	'Thirteen',
	'Fourteen',
	'Fifteen',
	'Sixteen',
	'Seventeen',
	'Eighteen',
	'Nineteen',
];

function convert_millions(num: number): string {
	if (num >= 1000000) {
		return (
			convert_millions(Math.floor(num / 1000000)) +
			' Million ' +
			convert_thousands(num % 1000000)
		);
	} else {
		return convert_thousands(num);
	}
}

function convert_thousands(num: number) {
	if (num >= 1000) {
		return (
			convert_hundreds(Math.floor(num / 1000)) +
			' Thousand ' +
			convert_hundreds(num % 1000)
		);
	} else {
		return convert_hundreds(num);
	}
}

function convert_hundreds(num: number) {
	if (num > 99) {
		return ones[Math.floor(num / 100)] + ' Hundred ' + convert_tens(num % 100);
	} else {
		return convert_tens(num);
	}
}

function convert_tens(num: number) {
	if (num < 10) return ones[num];
	else if (num >= 10 && num < 20) return teens[num - 10];
	else {
		return tens[Math.floor(num / 10)] + ' ' + ones[num % 10];
	}
}

export function spellOutRent(rent?: number[]) {
	if (!rent) return { dollars: 'Zero', cents: 0 };

	const s = sum(rent);
	const dollars = Math.floor(s);
	const cents = Math.round((s % 1) * 100);

	if (s == 0) return { dollars: 'Zero', cents: 0 };
	else {
		return {
			dollars: convert_millions(dollars),
			cents,
		};
	}
}

export function displayMonthYear(date: Date) {
	return `${date.toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	})}`;
}

export const monthNames = new Map([
	['0', 'January'],
	['1', 'February'],
	['2', 'March'],
	['3', 'April'],
	['4', 'May'],
	['5', 'June'],
	['6', 'July'],
	['7', 'August'],
	['8', 'September'],
	['9', 'October'],
	['10', 'November'],
	['11', 'December'],
]);
