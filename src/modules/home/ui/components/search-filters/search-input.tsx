import { Input } from "@/components/ui/input";
import { BookmarkCheck, Search, Grid3X3, X, Sparkles } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  disabled?: boolean;
  defaultValue?: string | undefined;
  onChange?: (value: string) => void;
}

export const SearchInput = ({ disabled, defaultValue, onChange }: Props) => {
  const [searchValue, setSearchValue] = useState(defaultValue || "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange?.(searchValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchValue, onChange]);

  const clearSearch = () => {
    setSearchValue("");
    onChange?.("");
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (searchValue) setShowSuggestions(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      
      <div className="relative flex-1">
        {/* Main search input */}
        <div
          className={cn(
            "relative rounded-2xl border-2 transition-all duration-300",
            "bg-white/90 backdrop-blur-md shadow-lg",
            isFocused
              ? "border-blue-400 shadow-xl shadow-blue-100/50 bg-white"
              : "border-slate-200 hover:border-slate-300",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {/* Search icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Search 
              className={cn(
                "w-5 h-5 transition-colors duration-200",
                isFocused ? "text-blue-500" : "text-slate-400"
              )} 
            />
          </div>

          {/* Input field */}
          <Input
            className={cn(
              "pl-12 pr-12 py-4 bg-transparent border-none shadow-none text-lg",
              "placeholder:text-slate-400 text-slate-700",
              "focus-visible:ring-0 focus-visible:ring-offset-0"
            )}
            placeholder="Search products, brands, categories..."
            disabled={disabled}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {/* Clear button */}
          {searchValue && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}

          {/* Decorative elements */}
          {isFocused && (
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-8 h-8 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-6 h-6 bg-purple-100 rounded-full blur-lg opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          )}
        </div>
        
        {/* Search suggestions */}
        {showSuggestions && searchValue && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Search suggestions</span>
            </div>
            <div className="space-y-2">
              <div className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                <span className="text-slate-800">Search for  &quot;{searchValue}&quot; in all categories</span>
              </div>
              <div className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                <span className="text-slate-800">Find similar products</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile categories button */}
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "lg:hidden rounded-2xl px-3 py-3 border-2 transition-all duration-200",
          "border-slate-200 bg-white/90 backdrop-blur-md shadow-lg",
          "hover:bg-white hover:border-slate-300 hover:shadow-xl hover:scale-105 transform"
        )}
        onClick={() => setIsSidebarOpen(true)}
      >
        <Grid3X3 className="w-5 h-5" />
      </Button>

      {/* Library button */}
      {session.data?.user && (
        <Button
          asChild
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 rounded-2xl border-2 transition-all duration-200",
            "border-slate-200 bg-white/90 backdrop-blur-md shadow-lg",
            "hover:bg-white hover:border-slate-300 hover:shadow-xl hover:scale-105 transform"
          )}
        >
          <Link prefetch href="/library">
            <BookmarkCheck className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Library</span>
          </Link>
        </Button>
      )}
    </div>
  );
};