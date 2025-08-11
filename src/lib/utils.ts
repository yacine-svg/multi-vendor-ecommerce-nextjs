import { clsx, type ClassValue } from "clsx"
import { Poppins } from "next/font/google";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTenantUrl(tenantSlug: string) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isSubdomainRoutingEnabled = process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true";
  // in development or subdomain disabled mode use normal routing
  if(isDevelopment || !isSubdomainRoutingEnabled) {
   return `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/tenants/${tenantSlug}`;
  }

  

  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;

  /*if (process.env.NODE_ENV === "development") {
    protocol = "http";
  }*/

    //in production use subdomain routing

  return `${protocol}://${tenantSlug}.${domain}`;
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
