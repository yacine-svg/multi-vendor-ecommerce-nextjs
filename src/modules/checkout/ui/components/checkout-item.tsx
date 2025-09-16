import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { TrashIcon } from "lucide-react";

interface CheckoutItemProps {
    isLast?: boolean;
    imageUrl?: string | null;
    name: string;
    productUrl: string;
    tenantUrl: string;
    tenantName: string;
    price: number;
    onRemove: () => void;      
};

export const CheckoutItem = ({
    isLast,
    imageUrl,
    name,
    productUrl,
    tenantUrl,
    tenantName,
    price,
    onRemove,  
}: CheckoutItemProps) => {
    return (
        <div className={cn(
            "grid grid-cols-[10rem_1fr_auto] gap-6 p-6 border-b border-gray-200/50",
            isLast && "border-b-0"
        )}>
            <div className="overflow-hidden rounded-2xl border-2 border-white/30 shadow-lg">
                <div className="relative aspect-square h-full group">
                    <Image
                        src={imageUrl || "/placeholder.png"}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
            </div>
            <div className="flex flex-col justify-between py-2">
                <div className="space-y-3">
                    <Link href={productUrl} className="group">
                        <h4 className="font-bold text-lg text-gray-900 hover:text-indigo-600 transition-colors duration-200 group-hover:underline decoration-2 underline-offset-2">
                            {name}
                        </h4>
                    </Link>
                    <Link href={tenantUrl} className="group">
                        <p className="font-semibold text-gray-600 hover:text-purple-600 transition-colors duration-200 group-hover:underline decoration-2 underline-offset-2">
                            by {tenantName}
                        </p>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end py-2 min-w-[120px]">
                <p className="font-bold text-xl text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {formatCurrency(price)}
                </p>
                <button 
                    className="group flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                    onClick={onRemove} 
                    type="button"
                >
                    <TrashIcon className="w-4 h-4 group-hover:animate-pulse" />
                    <span className="group-hover:underline decoration-2 underline-offset-2">Remove</span>
                </button>
            </div>
        </div>
    )
}