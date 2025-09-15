import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Grid3X3, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());

  const router = useRouter();

  const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoriesGetManyOutput[1] | null>(null);

  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setSelectedCategory(null);
        setParentCategories(null);
      }, 300); // Wait for animation to complete
    }
    onOpenChange(open);
  };

  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  const backgroundColor = selectedCategory?.color || "#ffffff";

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 w-80 sm:w-96 border-r-2 border-slate-200"
        style={{ 
          background: `linear-gradient(135deg, ${backgroundColor}f0 0%, ${backgroundColor}d0 100%)` 
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-4 opacity-5">
            <Sparkles className="w-32 h-32 text-slate-600" />
          </div>
        </div>

        <SheetHeader className="relative p-6 border-b border-white/20 bg-white/10 backdrop-blur-sm">
          <SheetTitle className="flex items-center gap-2 text-slate-800 text-lg font-semibold">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Grid3X3 className="w-5 h-5" />
            </div>
            Browse Categories
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-full">
          <div className="relative p-4 space-y-2">
            {parentCategories && (
              <Button
                onClick={handleBackClick}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 mb-4 rounded-xl p-4",
                  "text-slate-700 hover:bg-white/20 hover:text-slate-900",
                  "transition-all duration-200 hover:scale-105 transform",
                  "border border-white/20 bg-white/10 backdrop-blur-sm"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-xs text-slate-500">Back to</div>
                  <div className="font-medium">{selectedCategory?.name}</div>
                </div>
              </Button>
            )}

            <div className="space-y-1">
              {currentCategories.map((category, index) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryClick(category)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl transition-all duration-200",
                    "text-slate-700 hover:bg-white/20 hover:text-slate-900",
                    "flex justify-between items-center group",
                    "focus:outline-none focus:bg-white/20 focus:text-slate-900",
                    "border border-transparent hover:border-white/20",
                    "hover:scale-105 transform hover:shadow-lg",
                    "backdrop-blur-sm"
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: open ? `slideIn 0.3s ease-out ${index * 50}ms both` : 'none'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-slate-400 rounded-full group-hover:bg-slate-600 transition-colors" />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span>{category.subcategories.length}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>

        <style jsx>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </SheetContent>
    </Sheet>
  );
};