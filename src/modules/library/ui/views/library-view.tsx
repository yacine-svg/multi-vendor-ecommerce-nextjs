import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { ProductList, ProductListSkeleton } from "../components/products-list"
import { Suspense } from "react"

export const LibraryView = () => {
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Navigation with enhanced styling */}
            <nav className="sticky top-0 z-50 p-4 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <Link 
                        prefetch 
                        href="/" 
                        className="group flex items-center gap-3 w-fit px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-out"
                    >
                        <ArrowLeftIcon className="size-4 text-gray-600 group-hover:text-gray-900 group-hover:-translate-x-0.5 transition-all duration-200"/>
                        <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                            Continue shopping
                        </span>
                    </Link>
                </div>
            </nav>

            {/* Header with modern gradient and improved typography */}
            <header className="relative bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 py-16 border-b border-gray-200">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                            Your Library
                        </h1>
                        <p className="text-xl font-medium text-gray-600 leading-relaxed">
                            Discover your purchases and share your thoughts through reviews
                        </p>
                    </div>
                </div>
            </header>

            {/* Main content with improved spacing */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <Suspense fallback={<ProductListSkeleton />}>
                    <ProductList />
                </Suspense>
            </section>
        </div>
    )
}