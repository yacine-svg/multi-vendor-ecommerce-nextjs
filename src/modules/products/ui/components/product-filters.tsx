"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { PriceFilter } from "./price-filter";
import { useProductFilters } from "../../hooks/use-product-filters";
import { TagsFilter } from "./tags-filetr";

interface ProductFilterProps {
    title: string,
    className?: string,
    children: React.ReactNode
}

const ProductFilter = ({title, className, children}: ProductFilterProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;
    
    return(
        <div className={cn("border-b border-gray-200", className)}>
            <div
                onClick={() => {setIsOpen((current) => !current)}}
                className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-50 transition-colors"
            >
                <p className="font-semibold text-gray-900">{title}</p>
                <Icon className="size-5 text-gray-600 transition-transform duration-200" />
            </div>
            {isOpen && (
                <div className="p-4 pt-0 pb-6">
                    {children}
                </div>
            )}
        </div>
    );
};

export const ProductFilters = () => {
    const [filters, setFilters] = useProductFilters();

    const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
        if (key === "sort") return false;
        if (Array.isArray(value)) {
            return value.length > 0;
        }
        if (typeof value === "string") {
            return value !== "";
        }
        return value !== null;
    })

    const onClear = () => {
        setFilters({
            minPrice: "",
            maxPrice: "",
            tags: [],
        })
    }

    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters({ ...filters, [key]: value });
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
            <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-bold text-xl text-gray-900">Filters</h2>
                {hasAnyFilters && (
                    <button 
                        className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-sm font-semibold text-gray-700 hover:bg-white hover:text-pink-600 transition-colors shadow-sm" 
                        onClick={onClear} 
                        type="button"
                    >
                        <XIcon className="size-4" />
                        Clear all
                    </button>
                )}
            </div>
            
            <ProductFilter title="Price Range">
                <PriceFilter
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onMinPriceChange={(value) => onChange("minPrice", value)}
                    onMaxPriceChange={(value) => onChange("maxPrice", value)}
                />
            </ProductFilter>
            
            <ProductFilter title="Tags" className="border-b-0">
                <TagsFilter
                    value={filters.tags}
                    onChange={(value) => onChange("tags", value)}
                />
            </ProductFilter>
        </div>
    )
}