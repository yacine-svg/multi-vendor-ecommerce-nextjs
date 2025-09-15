"use client";

import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "../../../constants";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";
import { Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  const [filters, setFilters] = useProductFilters();

  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";
  const activeCategoryData = data.find((category) => category.slug === activeCategory);
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubcategory = params.subcategory as string | undefined;
  const activeSubcategoryName = 
    activeCategoryData?.subcategories?.find(
      (subcategory) => subcategory.slug === activeSubcategory
    )?.name || null;

  return (
    <div
      className="relative overflow-hidden border-b-2 border-slate-200/50"
      style={{
        background: `linear-gradient(135deg, ${activeCategoryColor} 0%, ${activeCategoryColor}d0 70%, ${activeCategoryColor}b0 100%)`,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating decorative icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-8 right-8 w-6 h-6 text-white/30 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <Star className="absolute bottom-8 left-8 w-4 h-4 text-white/30 animate-bounce" style={{ animationDelay: '1.5s' }} />
        <Sparkles className="absolute top-20 left-20 w-4 h-4 text-white/20 animate-bounce" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Main content */}
      <div className="relative px-4 lg:px-12 py-8 space-y-6">
        {/* Search input section */}
        <div className="space-y-2">
          <SearchInput
            defaultValue={filters.search}
            onChange={(value) => setFilters({ search: value })}
          />
          
          {/* Search tips for empty state */}
          {!filters.search && (
            <div className="flex items-center gap-4 text-sm text-slate-600/80 ml-2">
              <span className="hidden sm:inline">💡 Try searching for brands, products, or categories</span>
              <div className="flex items-center gap-2 text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <Sparkles className="w-3 h-3" />
                <span>Smart search enabled</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Categories section - desktop only */}
        <div className="hidden lg:block">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-700/90">Browse Categories</h3>
              <div className="text-xs text-slate-600/70 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                {data.length} categories
              </div>
            </div>
            <Categories data={data} />
          </div>
        </div>
        
        {/* Breadcrumb navigation */}
        <div className="pt-2">
          <BreadcrumbNavigation
            activeCategory={activeCategory}
            activeCategoryName={activeCategoryName}
            activeSubcategoryName={activeSubcategoryName}
          />
        </div>

        {/* Category info panel */}
        {activeCategoryData && activeCategory !== "all" && (
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <div className="flex items-center gap-3">
              <div 
                className={cn(
                    "w-3 h-3 rounded-full shadow-sm",
                    !activeCategoryData.color && "bg-slate-300" // Tailwind fallback
                )} 
                style={{ 
                    backgroundColor: activeCategoryData.color || undefined 
                }} 
                />
              <div>
                <h4 className="font-semibold text-slate-800">{activeCategoryData.name}</h4>
                {activeCategoryData.subcategories && (
                  <p className="text-sm text-slate-600">
                    {activeCategoryData.subcategories.length} subcategories available
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-white/20" />
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="relative overflow-hidden border-b-2 border-slate-200/50"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 70%, #e2e8f0 100%)" }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-2xl translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative px-4 lg:px-12 py-8 space-y-6">
        {/* Search input skeleton */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-16 bg-white/60 rounded-2xl animate-pulse shadow-lg" />
            <div className="lg:hidden w-16 h-16 bg-white/60 rounded-2xl animate-pulse" />
            <div className="w-24 h-16 bg-white/60 rounded-2xl animate-pulse hidden sm:block" />
          </div>
          <div className="flex items-center gap-4 ml-2">
            <div className="hidden sm:block h-4 w-64 bg-white/40 rounded-full animate-pulse" />
            <div className="h-6 w-32 bg-white/40 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Categories skeleton */}
        <div className="hidden lg:block space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 bg-white/40 rounded animate-pulse" />
            <div className="h-6 w-20 bg-white/40 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="h-10 w-24 bg-white/50 rounded-full animate-pulse shadow-sm" 
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
            <div className="h-10 w-20 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Breadcrumb skeleton */}
        <div className="pt-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-white/40 rounded animate-pulse" />
            <div className="h-3 w-3 bg-white/30 rounded animate-pulse" />
            <div className="h-4 w-20 bg-white/40 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};