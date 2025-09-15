"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { SubcategoryMenu } from "./subcategory-menu";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { ChevronDown, Dot } from "lucide-react";

interface Props {
  category: CategoriesGetManyOutput[1];
  isActive: boolean;
  isNavigationHovered: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (category.subcategories?.length) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "relative rounded-full px-4 py-2 font-medium transition-all duration-200",
          "border-2 border-transparent text-slate-700",
          "hover:bg-white/90 hover:border-slate-200 hover:text-slate-900 hover:shadow-lg hover:scale-105 transform",
          "backdrop-blur-sm",
          // Active state
          isActive && "bg-white border-slate-300 text-slate-900 shadow-lg scale-105",
          // Open state
          isOpen && "bg-white border-slate-300 text-slate-900 shadow-xl scale-105 -translate-y-0.5",
          // Navigation hovered state
          !isActive && !isOpen && isNavigationHovered && "bg-white/60 border-slate-100"
        )}
        asChild
      >
        <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
          <span className="flex items-center gap-1.5">
            {isActive && <Dot className="w-4 h-4 text-blue-500 -ml-1" />}
            {category.name}
            {hasSubcategories && (
              <ChevronDown 
                className={cn(
                  "w-3 h-3 transition-all duration-200",
                  isOpen && "rotate-180 scale-110"
                )} 
              />
            )}
          </span>
        </Link>
      </Button>

      <SubcategoryMenu category={category} isOpen={isOpen} />
    </div>
  );
};