import { formatCurrency, generateTenantUrl } from "@/lib/utils";
import { StarIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
    id: string;
    name: string;
    imageUrl?: string | null;
    tenantSlug: string;
    tenantImageUrl?: string | null;
    reviewRating: number;
    reviewCount: number;
    price: number;
};

export const ProductCard = ({
    id,
    name,
    imageUrl,
    tenantSlug,
    tenantImageUrl,
    reviewRating,
    reviewCount,
    price,
}:ProductCardProps) =>{
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    
    const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(generateTenantUrl(tenantSlug));
    };
    
    return(
        <Link href={`${generateTenantUrl(tenantSlug)}/products/${id}`}>
            <div 
                className="group cursor-pointer bg-white rounded-xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl border border-gray-200 hover:border-pink-300 transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image 
                        alt={name}
                        fill
                        src={imageUrl || "/placeholder.png"}
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                        <HeartIcon className="size-4 text-gray-600 hover:text-pink-500" />
                    </button>
                </div>
                
                <div className="p-5 flex flex-col gap-3 flex-1">
                    <h2 className="text-lg font-bold line-clamp-2 text-gray-900 group-hover:text-pink-600 transition-colors">
                        {name}
                    </h2>
                    
                    <div className="flex items-center gap-2 group/tenant" onClick={handleUserClick}>
                        {tenantImageUrl && (
                            <div className="relative">
                                <Image
                                    alt={tenantSlug}
                                    src={tenantImageUrl}
                                    width={20}
                                    height={20}
                                    className="rounded-full border-2 border-gray-200 shrink-0 size-[20px] group-hover/tenant:border-pink-400 transition-colors"
                                />
                            </div>
                        )}
                        <p className="text-sm font-semibold text-gray-600 group-hover/tenant:text-pink-600 transition-colors underline decoration-2 underline-offset-2">
                            {tenantSlug}
                        </p>
                    </div>
                    
                    {reviewCount > 0 && (
                        <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg w-fit">
                            <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
                            <p className="text-sm font-bold text-gray-900">
                                {reviewRating}
                            </p>
                            <p className="text-xs text-gray-600">
                                ({reviewCount})
                            </p>
                        </div>
                    )}
                </div>
                
                <div className="p-5 pt-0">
                    <div className={`relative px-4 py-2 rounded-lg font-bold text-white shadow-lg transition-all duration-300 ${
                        isHovered 
                            ? 'bg-gradient-to-r from-pink-600 to-purple-600 transform scale-105' 
                            : 'bg-gradient-to-r from-pink-500 to-pink-600'
                    }`}>
                        <p className="text-base">
                            {formatCurrency(price)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
};

export const ProductCardSkeleton = () => {
    return (
        <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-3/4" />
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-1/2" />
            </div>
        </div>
    )
}
