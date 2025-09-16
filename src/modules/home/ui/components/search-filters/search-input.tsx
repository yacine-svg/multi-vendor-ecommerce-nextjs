import { Input } from "@/components/ui/input";
import { BookmarkCheck, Search, Grid3X3, X, Sparkles, Loader2 } from "lucide-react";
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
  const [isSearching, setIsSearching] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  useEffect(() => {
    if (searchValue !== defaultValue) {
      setIsSearching(true);
    }
    
    const timeoutId = setTimeout(() => {
      onChange?.(searchValue);
      setIsSearching(false);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchValue, onChange, defaultValue]);

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
        <div
          className={cn(
            "relative rounded-2xl border-2 transition-all duration-300 ease-out",
            "bg-white/90 backdrop-blur-md shadow-lg will-change-transform",
            isFocused
              ? "border-blue-400 shadow-xl shadow-blue-100/50 bg-white scale-[1.01]"
              : "border-slate-200 hover:border-slate-300 hover:shadow-xl",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {/* Search icon with loading state */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            {isSearching ? (
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            ) : (
              <Search 
                className={cn(
                  "w-5 h-5 transition-all duration-200",
                  isFocused ? "text-blue-500 scale-110" : "text-slate-400"
                )} 
              />
            )}
          </div>

          <Input
            className={cn(
              "pl-12 pr-12 py-4 bg-transparent border-none shadow-none text-lg",
              "placeholder:text-slate-400 text-slate-700",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "transition-all duration-200"
            )}
            placeholder="Search products, brands, categories..."
            disabled={disabled}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {/* Clear button with better animation */}
          {searchValue && (
            <button
              onClick={clearSearch}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 z-10",
                "p-1.5 rounded-full hover:bg-slate-100 transition-all duration-200",
                "hover:scale-110 transform will-change-transform",
                "focus:outline-none focus:bg-slate-100 focus:ring-2 focus:ring-blue-500/20"
              )}
            >
              <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}

          {/* Enhanced decorative elements */}
          {isFocused && (
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute top-2 left-1/4 w-8 h-8 bg-blue-200/30 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-2 right-1/4 w-6 h-6 bg-purple-200/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-200/10 to-transparent" />
            </div>
          )}
        </div>
        
        {/* Enhanced suggestions */}
        {showSuggestions && searchValue && !disabled && (
          <div className={cn(
            "absolute top-full left-0 right-0 mt-3 p-4",
            "bg-white/98 backdrop-blur-md rounded-xl border border-slate-200/50 shadow-xl z-50",
            "animate-in slide-in-from-top-2 fade-in duration-200"
          )}>
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Search suggestions</span>
            </div>
            <div className="space-y-1">
              <button className="w-full p-3 text-left hover:bg-slate-50 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.01] transform group">
                <span className="text-slate-800 group-hover:text-slate-900">
                  Search for <strong>&quot;{searchValue}&quot;</strong> in all categories
                </span>
              </button>
              <button className="w-full p-3 text-left hover:bg-slate-50 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.01] transform group">
                <span className="text-slate-800 group-hover:text-slate-900">Find similar products</span>
              </button>
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
          "hover:bg-white hover:border-slate-300 hover:shadow-xl",
          "hover:scale-105 transform will-change-transform",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
            "hover:bg-white hover:border-slate-300 hover:shadow-xl",
            "hover:scale-105 transform will-change-transform",
            "focus-within:ring-2 focus-within:ring-blue-500/20"
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