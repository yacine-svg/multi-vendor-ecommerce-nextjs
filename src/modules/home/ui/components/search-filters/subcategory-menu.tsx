import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { Category } from "@/payload-types";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  category: CategoriesGetManyOutput[1];
  isOpen: boolean;
  position: { top: number; left: number };
}

export const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0) {
    return null;
  }

  const backgroundColor = category.color || "#ffffff";
  
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 pointer-events-none",
        isOpen ? "block" : "hidden"
      )}
    >
      <div 
        className="absolute pointer-events-auto"
        style={{
          top: `${position.top}px`,
          left: `${Math.max(16, position.left)}px`, // Prevent going off-screen
          transform: 'translateX(-50%)', // Center under button
        }}
      >
        <div 
          className={cn(
            "w-72 rounded-xl overflow-hidden border-2 shadow-2xl",
            "animate-in slide-in-from-top-2 duration-200 ease-out",
            "backdrop-blur-md border-slate-200/50"
          )}
          style={{ 
            background: `linear-gradient(135deg, ${backgroundColor}f5 0%, ${backgroundColor}e8 100%)` 
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/20 bg-white/10">
            <h3 className="font-semibold text-slate-800 text-sm">
              {category.name}
            </h3>
          </div>
          
          {/* Menu items */}
          <div className="p-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {category.subcategories?.map((subcategory: Category, index) => (
              <Link 
                key={subcategory.slug} 
                href={`/${category.slug}/${subcategory.slug}`} 
                className={cn(
                  "block w-full text-left p-3 rounded-lg transition-all duration-200",
                  "text-slate-700 hover:bg-white/40 hover:text-slate-900",
                  "hover:shadow-sm hover:scale-[1.02] transform will-change-transform",
                  "focus:outline-none focus:bg-white/40 focus:ring-2 focus:ring-blue-500/20",
                  "group relative overflow-hidden"
                )}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span className="font-medium">{subcategory.name}</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0">
                    →
                  </span>
                </div>
                
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};