import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ReviewForm } from "./review-form";
import { ReviewFormSkeleton } from "./review-form";
import { MessageSquare } from "lucide-react";

interface Props {
    productId: string;
}

export const ReviewSidebar = ({ productId }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.reviews.getOne.queryOptions({
        productId,
    }))

    return(
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            {/* Header with icon and title */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="font-semibold text-gray-900 text-lg">Your Review</h2>
                    <p className="text-sm text-gray-500">Share your experience with this product</p>
                </div>
            </div>
            
            <ReviewForm 
                productId={productId}
                initialData={data}
            />
        </div>
    )
}

export const ReviewSidebarSkeleton = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            {/* Skeleton header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
            </div>
            
            <ReviewFormSkeleton />
        </div>
    )
}