import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { Category } from "@/payload-types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Tag } from "lucide-react";

interface Props {
  category: CategoriesGetManyOutput[1];
  isOpen: boolean;
}

export const SubcategoryMenu = ({ category, isOpen }: Props) => {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0) {
    return null;
  }

  const backgroundColor = category.color || "#ffffff";
  const subcategoriesCount = category.subcategories.length;

  return (
    <div
      className={cn(
        "absolute z-50 mt-3 w-72 transition-all duration-300",
        "transform origin-top",
        isOpen 
          ? "opacity-100 scale-100 translate-y-0" 
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      )}
      style={{
        left: "50%",
        transform: isOpen 
          ? "translateX(-50%) translateY(0)" 
          : "translateX(-50%) translateY(-8px) scale(0.95)",
      }}
    >
      {/* Arrow pointer */}
      <div className="relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[12px] border-l-transparent border-r-transparent border-b-white" />
        </div>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="w-0 h-0 border-l-[11px] border-r-[11px] border-b-[13px] border-l-transparent border-r-transparent border-b-slate-200" />
        </div>
      </div>

      {/* Menu content */}
      <div
        className="rounded-2xl border-2 border-slate-200 shadow-2xl backdrop-blur-md overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${backgroundColor}f8 0%, ${backgroundColor}e0 100%)` 
        }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200/50 bg-white/20 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-600" />
              <span className="font-semibold text-slate-800">{category.name}</span>
            </div>
            <span className="text-xs text-slate-500 bg-white/50 px-2 py-1 rounded-full">
              {subcategoriesCount} {subcategoriesCount === 1 ? 'category' : 'categories'}
            </span>
          </div>
        </div>

        {/* Subcategories list */}
        <div className="py-2 max-h-80 overflow-y-auto">
          {category.subcategories?.map((subcategory: Category, index: number) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className={cn(
                "group block px-4 py-3 transition-all duration-200",
                "text-slate-700 hover:bg-white/30 hover:text-slate-900",
                "border-b border-slate-100/50 last:border-b-0",
                "focus:outline-none focus:bg-white/40",
                "hover:shadow-sm"
              )}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: isOpen ? `slideInSubmenu 0.3s ease-out ${index * 50}ms both` : 'none'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full group-hover:bg-slate-600 transition-colors" />
                  <span className="font-medium">{subcategory.name}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </Link>
          ))}
        </div>

        {/* Footer with category count */}
        <div className="px-4 py-2 border-t border-slate-200/50 bg-white/10 backdrop-blur-sm">
          <div className="text-xs text-slate-600 text-center">
            Browse all {subcategoriesCount} subcategories in {category.name}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInSubmenu {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};