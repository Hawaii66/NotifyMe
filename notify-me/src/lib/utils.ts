import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function FilterUndefined<T>(a: T | undefined): a is T {
  return a !== undefined;
}
