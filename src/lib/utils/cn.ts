import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A version of `clsx` that supports both Tailwind class names and arbitrary class names.
 * This function is a drop-in replacement for `clsx` when you want to use it with Tailwind class names.
 *
 * @param inputs - The class names to merge.
 * @returns The merged class names as a single string.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(...inputs));
}
