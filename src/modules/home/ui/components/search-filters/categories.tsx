"use client";

import { CategoryDropdown } from "./category-dropdown";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Grid3X3 } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useParams } from "next/navigation";

interface Props {
  data: CategoriesGetManyOutput;
}

export const Categories = ({ data }: Props) => {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categoryParams = params.category as string | undefined;
  const activeCategory = categoryParams || "all";
  const activeCategoryIndex = data.findIndex((category) => category.slug === activeCategory);
  const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth - 32; // Add some padding
      const items = Array.from(measureRef.current.children);
      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width + 8; // Add gap
        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visible++;
      }
      setVisibleCount(Math.max(1, visible)); // Ensure at least one item is visible
    };

    const resizeObserver = new ResizeObserver(calculateVisible);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [data.length]);

  return (
    <div className="relative w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      {/* Measurement div */}
      <div
        ref={measureRef}
        className="fixed opacity-0 pointer-events-none flex gap-2"
        style={{ top: -9999, left: -9999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>

      {/* Visible categories */}
      <div
        ref={containerRef}
        className="flex items-center gap-2 overflow-hidden"
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {data.slice(0, visibleCount).map((category) => (
            <div key={category.id} className="flex-shrink-0">
              <CategoryDropdown
                category={category}
                isActive={activeCategory === category.slug}
                isNavigationHovered={isAnyHovered}
              />
            </div>
          ))}
        </div>

        <div ref={viewAllRef} className="flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "gap-2 rounded-full border-2 transition-all duration-200 hover:shadow-md",
              "bg-white/80 backdrop-blur-sm border-slate-200 text-slate-700",
              "hover:bg-white hover:border-slate-300 hover:text-slate-900",
              "hover:scale-105 transform",
              isActiveCategoryHidden && "border-blue-300 bg-blue-50 text-blue-700 scale-105 shadow-md"
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            <Grid3X3 className="w-4 h-4" />
            View All
          </Button>
        </div>
      </div>
    </div>
  );
};