import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import Link from "next/link";
import { ShoppingCart, CheckCircle, Eye } from "lucide-react";

interface Props {
    tenantSlug: string,
    productId: string,
    isPurchased?: boolean,
};

export const CartButton = ({ tenantSlug, productId, isPurchased }: Props) => {
    const cart = useCart(tenantSlug);
    const isInCart = cart.isProductInCart(productId);

    if (isPurchased) {
        return (
            <Button
                variant="elevated"
                asChild
                className="flex-1 font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
                <Link href={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/library/${productId}`} className="flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View in Library
                </Link>
            </Button>
        );
    }

    return (
        <Button
            variant="elevated"
            className={cn(
                "flex-1 font-semibold transition-all duration-200 group",
                isInCart
                    ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300 hover:from-gray-200 hover:to-gray-300 hover:text-red-600 shadow-md"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
            )}
            onClick={() => cart.toggleProduct(productId)}
        >
            {isInCart ? (
                <>
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-red-600 transition-colors" />
                    Remove from cart
                </>
            ) : (
                <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to cart
                </>
            )}
        </Button>
    );
};