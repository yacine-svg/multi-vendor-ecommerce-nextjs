"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
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
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8, // Added 8px spacing
        left: rect.left + window.scrollX
      });
    }
  };

  const onMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (category.subcategories && category.subcategories.length > 0) {
      updatePosition();
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      timeoutRef.current = null;
    }, 200);
  };

  // Update position on resize and scroll
  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [isOpen]);

  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  return (
    <>
      <div
        className="relative py-2" // Added vertical padding here
        ref={dropdownRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "relative rounded-full px-4 py-4 font-medium transition-all duration-200", // Increased vertical padding from py-3 to py-4
            "border-2 border-transparent text-slate-700",
            "hover:bg-white/90 hover:border-slate-200 hover:text-slate-900 hover:shadow-lg hover:scale-105 transform",
            "backdrop-blur-sm",
            isActive && "bg-white border-slate-300 text-slate-900 shadow-lg scale-105",
            isOpen && "bg-white border-slate-300 text-slate-900 shadow-xl scale-105 -translate-y-0.5",
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
      </div>

      {/* Render submenu as a portal */}
      <SubcategoryMenu 
        category={category} 
        isOpen={isOpen}
        position={position}
      />
    </>
  );
};