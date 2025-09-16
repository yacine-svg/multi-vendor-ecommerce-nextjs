import { Suspense } from "react"
import { ProductFilters } from "../components/product-filters"
import { ProductSort } from "../components/product-sort"
import { ProductList, ProductListSkeleton } from "../components/products-list"

interface Props {
    category?: string;
    tenantSlug?: string;
    narrowView?: boolean;
}

export const ProductListView = ({category, tenantSlug, narrowView}: Props) => {
    return (
         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="px-4 lg:px-12 py-8 flex flex-col gap-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-y-4 lg:gap-y-0 justify-between bg-white rounded-xl p-6 shadow-sm border">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                            Curated for you
                        </h1>
                        <p className="text-gray-600">Discover amazing products handpicked just for you</p>
                    </div>
                    <ProductSort />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                    <div className="lg:col-span-2 xl:col-span-2">
                        <ProductFilters />
                    </div>  
                    <div className="lg:col-span-4 xl:col-span-6">
                        <Suspense fallback={<ProductListSkeleton narrowView={narrowView}/>}>
                            <ProductList category={category} tenantSlug={tenantSlug} narrowView={narrowView}/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>    
    )
}