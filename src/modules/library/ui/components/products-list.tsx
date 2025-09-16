"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon, Sparkles } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "./product-card";

export const ProductList = () => {
    const trpc = useTRPC();
    const { 
        data, 
        hasNextPage, 
        isFetchingNextPage, 
        fetchNextPage 
    } = useSuspenseInfiniteQuery(trpc.library.getMany.infiniteQueryOptions(
        {
            limit: DEFAULT_LIMIT,
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
            }
        }
    ));

    if(data.pages?.[0]?.docs.length === 0){
        return (
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <InboxIcon className="w-10 h-10 text-indigo-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Your library is empty
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Start exploring and add some products to build your personal collection.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-indigo-600 font-medium">
                        <Sparkles className="w-4 h-4" />
                        <span>Discover amazing products</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Products grid with improved responsive design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
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
                    />
                ))}
            </div>
            
            {/* Enhanced load more button */}
            {hasNextPage && (
                <div className="flex justify-center pt-8">
                    <Button
                        disabled={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                        size="lg"
                        className="group relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        variant="default"
                    >
                        {isFetchingNextPage ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Loading more...
                            </>
                        ) : (
                            <>
                                <span>Load more products</span>
                                <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                                    →
                                </div>
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};

export const ProductListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: DEFAULT_LIMIT}).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
};