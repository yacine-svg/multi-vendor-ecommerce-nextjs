"use client";

import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ReviewSidebar } from "../components/review-sidebar";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Suspense } from "react";
import { ReviewFormSkeleton } from "../components/review-form";

interface Props {
    productId: string;
}

export const ProductView = ({productId}: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.library.getOne.queryOptions({productId}));
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Enhanced navigation */}
            <nav className="sticky top-0 z-50 p-4 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <Link 
                        prefetch 
                        href="/library" 
                        className="group flex items-center gap-3 w-fit px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-out"
                    >
                        <ArrowLeftIcon className="size-4 text-gray-600 group-hover:text-gray-900 group-hover:-translate-x-0.5 transition-all duration-200"/>
                        <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                            Back to Library
                        </span>
                    </Link>
                </div>
            </nav>

            {/* Product header with enhanced styling */}
            <header className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-16 border-b border-gray-200">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.1),transparent_50%)]"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
                        {data.name}
                    </h1>
                </div>
            </header>

            {/* Main content with improved grid layout */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Review sidebar with enhanced card design */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
                                <Suspense fallback={<ReviewFormSkeleton />}>
                                    <ReviewSidebar productId={productId} />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                    
                    {/* Main content with improved typography */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
                            {data.content ? (
                                <div className="prose prose-gray prose-lg max-w-none">
                                    <RichText data={data.content} />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center py-16">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No content available</h3>
                                        <p className="text-gray-500">
                                            This product doesn&apos;t have any special content to display.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export const ProductViewSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <nav className="sticky top-0 z-50 p-4 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 w-fit px-3 py-2">
                        <ArrowLeftIcon className="size-4 text-gray-400"/>
                        <span className="font-medium text-gray-400">Back to Library</span>
                    </div>
                </div>
            </nav>
            
            <header className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-16 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="h-12 bg-gray-300 rounded-lg animate-pulse max-w-2xl"></div>
                </div>
            </header>
            
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-8 bg-gray-300 rounded"></div>
                                <div className="h-20 bg-gray-300 rounded"></div>
                                <div className="h-10 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 bg-gray-300 rounded"></div>
                                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}