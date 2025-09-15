// breadcrumb-navigation.tsx
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home } from "lucide-react";

interface Props {
  activeCategoryName?: string | null;
  activeCategory?: string | null;
  activeSubcategoryName?: string | null;
}

export const BreadcrumbNavigation = ({
  activeCategoryName,
  activeCategory,
  activeSubcategoryName,
}: Props) => {
  if (!activeCategoryName && activeCategory === "all") return null;
  
  return (
    <div className="flex items-center space-x-2 text-sm">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center space-x-2">
          {/* Home link */}
          <BreadcrumbItem>
            <BreadcrumbLink 
              asChild 
              className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors duration-200"
            >
              <Link href="/">
                <Home className="w-3 h-3" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {activeCategoryName && (
            <>
              <BreadcrumbSeparator>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {activeSubcategoryName ? (
                  <BreadcrumbLink 
                    asChild 
                    className="text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium"
                  >
                    <Link href={`/${activeCategory}`}>
                      {activeCategoryName}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-slate-900 font-medium">
                    {activeCategoryName}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </>
          )}
          
          {activeSubcategoryName && (
            <>
              <BreadcrumbSeparator>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-slate-900 font-medium">
                  {activeSubcategoryName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};