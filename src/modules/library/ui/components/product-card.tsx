import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    id: string;
    name: string;
    imageUrl?: string | null;
    tenantSlug: string;
    tenantImageUrl?: string | null;
    reviewRating: number;
    reviewCount: number;
};

export const ProductCard = ({
    id,
    name,
    imageUrl,
    tenantSlug,
    tenantImageUrl,
    reviewRating,
    reviewCount,
}: ProductCardProps) => {
    
    return(
        <Link prefetch href={`/library/${id}`} className="group block">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden h-full flex flex-col transition-all duration-300 ease-out hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1">
                {/* Image container with improved aspect ratio and overlay */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image 
                        alt={name}
                        fill
                        src={imageUrl || "/placeholder.png"}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Subtle overlay for better text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Enhanced content section */}
                <div className="p-5 flex flex-col gap-4 flex-1">
                    {/* Product title with better line height */}
                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-3 leading-snug group-hover:text-indigo-700 transition-colors duration-200">
                        {name}
                    </h2>
                    
                    {/* Tenant info with improved styling */}
                    <div className="flex items-center gap-3">
                        {tenantImageUrl && (
                            <div className="relative">
                                <Image
                                    alt={tenantSlug}
                                    src={tenantImageUrl}
                                    width={20}
                                    height={20}
                                    className="rounded-full border-2 border-gray-200 shrink-0 size-5"
                                />
                            </div>
                        )}
                        <p className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                            {tenantSlug}
                        </p>
                    </div>
                    
                    {/* Rating section with enhanced design */}
                    {reviewCount > 0 && (
                        <div className="flex items-center gap-2 mt-auto">
                            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-full border border-yellow-200">
                                <StarIcon className="size-3.5 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium text-yellow-700">
                                    {reviewRating.toFixed(1)}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">
                                ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>
                    )}
                    
                    {/* No reviews state */}
                    {reviewCount === 0 && (
                        <div className="mt-auto">
                            <span className="text-sm text-gray-400 italic">No reviews yet</span>
                        </div>
                    )}
                </div>
                
                {/* Subtle bottom border accent */}
                <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        </Link>
    )
};

export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden h-full flex flex-col animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300" />
            
            {/* Content skeleton */}
            <div className="p-5 flex flex-col gap-4 flex-1">
                {/* Title skeleton */}
                <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-full" />
                    <div className="h-5 bg-gray-300 rounded w-3/4" />
                </div>
                
                {/* Tenant skeleton */}
                <div className="flex items-center gap-3">
                    <div className="size-5 bg-gray-300 rounded-full" />
                    <div className="h-4 bg-gray-300 rounded w-20" />
                </div>
                
                {/* Rating skeleton */}
                <div className="flex items-center gap-2 mt-auto">
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
                        <div className="size-3.5 bg-gray-300 rounded" />
                        <div className="h-3 bg-gray-300 rounded w-8" />
                    </div>
                    <div className="h-3 bg-gray-300 rounded w-16" />
                </div>
            </div>
        </div>
    )
}