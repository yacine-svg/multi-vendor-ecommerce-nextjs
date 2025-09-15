import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { Category } from "@/payload-types";
import Link from "next/link";

interface Props {
  category: CategoriesGetManyOutput[1];
  isOpen: boolean;
  position: { top: number; left: number };
}

export const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";
  
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      {/* Positioning container - adjusted to align better with category button */}
      <div 
        className="absolute pointer-events-auto transition-all duration-200"
        style={{
          top: `${position.top + 12}px`, // Added 12px spacing
          left: `${position.left + 30}px`, // Moved 30px to the right for better alignment
        }}
      >
        <div 
          style={{ backgroundColor }}
          className="w-64 text-black rounded-xl overflow-hidden border-2 border-gray-800 shadow-2xl"
        >
          <div className="space-y-1 p-2">
            {category.subcategories?.map((subcategory: Category) => (
              <Link 
                key={subcategory.slug} 
                href={`/${category.slug}/${subcategory.slug}`} 
                className="w-full text-left p-3 hover:bg-black hover:text-white flex justify-between items-center rounded-md transition-all duration-200 font-medium hover:scale-105 transform group"
              >
                {subcategory.name}
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>    
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};