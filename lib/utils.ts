import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function convertToMoney(value: number){
    return new Intl.NumberFormat('en-NZ',
        { style: 'currency', currency: 'NZD' }
    ).format(value)
};

export const distance_options = [
  { label: "1,000 km", value: 1000 },
  { label: "2,000 km", value: 2000 },
  { label: "5,000 km", value: 5000 },
  { label: "10,000 km", value: 10000 }
];
