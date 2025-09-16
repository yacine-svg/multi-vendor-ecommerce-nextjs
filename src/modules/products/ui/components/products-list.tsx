"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useProductFilters } from "../../hooks/use-product-filters";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon, ArrowDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    category?: string;
    tenantSlug?: string;
    narrowView?: boolean;
}

export const ProductList = ({ category, tenantSlug, narrowView }: Props) => {
    const [filters] = useProductFilters();

    const trpc = useTRPC();
    const { 
        data, 
        hasNextPage, 
        isFetchingNextPage, 
        fetchNextPage 
    } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            ...filters,
            category,
            tenantSlug,
            limit: DEFAULT_LIMIT,
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
            }
        }
    ));

    if (data.pages?.[0]?.docs.length === 0) {
        return (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center p-12 flex-col gap-4 bg-white/80 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                    <InboxIcon className="w-8 h-8 text-pink-500" />
                </div>
                <p className="text-lg font-semibold text-gray-700">No products found</p>
                <p className="text-gray-500 text-center max-w-md">
                    Try adjusting your filters or search criteria to find what you&apos;re looking for.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className={cn(
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
            )}>
                {data?.pages.flatMap((page) => page.docs).map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.image?.url}
                        tenantSlug={product.tenant?.slug}
                        tenantImageUrl={product.tenant?.image?.url}
                        reviewRating={product.reviewRating}
                        reviewCount={product.reviewCount}
                        price={product.price}
                    />
                ))}
            </div>
            
            {hasNextPage && (
                <div className="flex justify-center pt-8">
                    <Button
                        disabled={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                        size="lg"
                        className="group px-8 py-3 bg-gradient-to-r from-white to-gray-50 hover:from-pink-50 hover:to-purple-50 text-gray-700 hover:text-pink-700 font-semibold rounded-xl border border-gray-300 hover:border-pink-300 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        variant="outline"
                    >
                        {isFetchingNextPage ? (
                            <>
                                <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mr-2" />
                                Loading...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 mr-2 text-pink-500 group-hover:scale-110 transition-transform" />
                                Load more products
                                <ArrowDown className="w-4 h-4 ml-2 transform group-hover:translate-y-0.5 transition-transform" />
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};

export const ProductListSkeleton = ({ narrowView }: Props) => {
    return (
        <div className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
            narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
        )}>
            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
};