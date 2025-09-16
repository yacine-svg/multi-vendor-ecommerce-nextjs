import { Button } from "@/components/ui/button";
import { useCart } from "../../hooks/use-cart";
import { cn, generateTenantUrl } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

interface CheckoutButtonProps {
    className?: string;
    hideIfEmpty?: boolean;
    tenantSlug: string;
}

export const CheckoutButton = ({
    className,
    hideIfEmpty,
    tenantSlug,
}: CheckoutButtonProps) => {
    const { totalItems } = useCart(tenantSlug);
    if (hideIfEmpty && totalItems === 0) return null;

    return (
        <Button
            variant="elevated"
            asChild
            className={cn(
                "group relative bg-white/90 backdrop-blur-lg border-2 border-white/30 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 hover:scale-105 overflow-hidden",
                className
            )}
        >
            <Link href={`${generateTenantUrl(tenantSlug)}/checkout`}>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <div className="relative flex items-center gap-2">
                    <ShoppingCartIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    {totalItems > 0 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full animate-pulse">
                            {totalItems}
                        </span>
                    )}
                </div>
            </Link>
        </Button>
    )
}