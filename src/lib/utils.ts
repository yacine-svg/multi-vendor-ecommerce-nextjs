import { clsx, type ClassValue } from "clsx"
import { Poppins } from "next/font/google";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTenantUrl(tenantSlug: string) {
  return `/tenants/${tenantSlug}`;
};

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-US" , {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
              }).format(Number(value))
}

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});
