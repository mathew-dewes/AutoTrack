import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function convertToMoney(value: number){
    return new Intl.NumberFormat('en-NZ',
        { style: 'currency', currency: 'NZD' }
    ).format(value)
}
