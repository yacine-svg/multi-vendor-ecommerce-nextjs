"use client";
import { Button } from "@/components/ui/button";
import { useProductFilters } from "../../hooks/use-product-filters"
import { cn } from "@/lib/utils";
import { Sparkles, TrendingUp, Zap } from "lucide-react";

export const ProductSort = () => {
    const [filters, setFilters] = useProductFilters();
    
    const sortOptions = [
        { key: "curated", label: "Curated", icon: Sparkles },
        { key: "trending", label: "Trending", icon: TrendingUp },
        { key: "hot_and_new", label: "Hot & New", icon: Zap }
    ];

    return (
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 border border-gray-200 shadow-sm">
            {sortOptions.map((option) => {
                const Icon = option.icon;
                const isActive = filters.sort === option.key;
                
                return (
                    <Button
                        key={option.key}
                        size="sm"
                        className={cn(
                            "rounded-full transition-all duration-200 font-medium text-sm",
                            isActive
                                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                                : "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-transparent"
                        )}
                        variant="ghost"
                        onClick={() => setFilters({ sort: option.key })}
                    >
                        <Icon className="w-4 h-4 mr-1.5" />
                        {option.label}
                    </Button>
                );
            })}
        </div>
    );
};