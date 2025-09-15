"use client";

import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "../../../constants";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";

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
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{
        backgroundColor: activeCategoryColor
    }}>
        <SearchInput defaultValue={filters.search} onChange={ (value) => setFilters({
            search: value
        })}/>
        
        {/* BREADCRUMB FIRST */}
        <BreadcrumbNavigation 
          activeCategory={activeCategory}
          activeCategoryName={activeCategoryName}
          activeSubcategoryName={activeSubcategoryName}
        />

        {/* CATEGORY INFO PANEL - MOVED BEFORE CATEGORIES */}
        {activeCategoryData && activeCategory !== "all" && (
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full shadow-sm" style={{ 
                  backgroundColor: activeCategoryData.color || undefined 
              }} />
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

        {/* CATEGORIES LAST - SO SUBMENUS APPEAR ON TOP */}
        <div className="hidden lg:block">
          <Categories data={data}/>
        </div>
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