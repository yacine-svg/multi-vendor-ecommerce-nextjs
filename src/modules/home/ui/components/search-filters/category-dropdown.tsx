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
        top: rect.bottom + window.scrollY + 12,
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

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleUpdate = () => updatePosition();
      window.addEventListener('resize', handleUpdate);
      window.addEventListener('scroll', handleUpdate, true);
      
      return () => {
        window.removeEventListener('resize', handleUpdate);
        window.removeEventListener('scroll', handleUpdate, true);
      };
    }
  }, [isOpen]);

  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  return (
    <>
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
            "relative rounded-full px-4 py-3 font-medium transition-all duration-300 ease-out",
            "border-2 border-transparent text-slate-700",
            "hover:bg-white/90 hover:border-slate-200 hover:text-slate-900 hover:shadow-lg",
            "hover:scale-[1.02] transform will-change-transform",
            "backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20",
            isActive && [
              "bg-white border-slate-300 text-slate-900 shadow-lg scale-[1.02]",
              "ring-2 ring-blue-500/10"
            ],
            isOpen && [
              "bg-white border-slate-300 text-slate-900 shadow-xl scale-[1.02]",
              "ring-2 ring-blue-500/20 -translate-y-0.5"
            ],
            !isActive && !isOpen && isNavigationHovered && "bg-white/60 border-slate-100"
          )}
          asChild
        >
          <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
            <span className="flex items-center gap-1.5">
              {isActive && (
                <Dot className="w-4 h-4 text-blue-500 -ml-1 animate-pulse" />
              )}
              <span className="relative">
                {category.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500/30 rounded-full" />
                )}
              </span>
              {hasSubcategories && (
                <ChevronDown 
                  className={cn(
                    "w-3 h-3 transition-all duration-300 ease-out",
                    isOpen && "rotate-180 scale-110"
                  )} 
                />
              )}
            </span>
          </Link>
        </Button>
      </div>

      <SubcategoryMenu 
        category={category} 
        isOpen={isOpen}
        position={position}
      />
    </>
  );
};