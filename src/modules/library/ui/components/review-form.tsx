import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarPicker } from "@/components/star-picker"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"

import { ReviewsGetOneOutput } from "@/modules/reviews/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle, Edit3, MessageCircle } from "lucide-react";

interface Props{
    productId: string;
    initialData?: ReviewsGetOneOutput;
}

const formSchema = z.object({
    rating: z.number().min(1, { message: "Rating is required"}).max(5),
    description: z.string().min(1, { message: "Description is required"}),
});

export const ReviewForm =({productId, initialData}: Props) => {
    const [isPreview, setIsPreview] = useState(!!initialData);

    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const createReview = useMutation(trpc.reviews.create.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.reviews.getOne.queryOptions({
                productId,
            }))
            setIsPreview(true);
            toast.success("Review posted successfully!");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    }))
    const updateReview = useMutation(trpc.reviews.update.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.reviews.getOne.queryOptions({
                productId,
            }))
            setIsPreview(true);
            toast.success("Review updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    }))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: initialData?.rating ?? 0,
            description: initialData?.description ?? "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if(initialData) {
            updateReview.mutate({
                reviewId: initialData.id,
                rating: values.rating,
                description: values.description,
            })
        } else {
            createReview.mutate({
                productId,
                rating: values.rating,
                description: values.description,
            })
        }
    }

    return(
        <div className="space-y-6">
            {/* Header with icon and title */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    {isPreview ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                        <MessageCircle className="w-4 h-4 text-white" />
                    )}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">
                        {isPreview ? "Your Review" : "Share Your Experience"}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {isPreview ? "Thank you for your feedback!" : "Help others by sharing your thoughts"}
                    </p>
                </div>
            </div>

            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {/* Rating section */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                            {isPreview ? "Your rating:" : "Rate this product"}
                        </label>
                        <FormField 
                            control={form.control}
                            name="rating"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <StarPicker
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={isPreview}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-sm" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Description section */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                            {isPreview ? "Your review:" : "Write your review"}
                        </label>
                        <FormField 
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Share your thoughts about this product..."
                                            disabled={isPreview}
                                            className="min-h-[120px] resize-none border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-sm" />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    {/* Action buttons */}
                    <div className="pt-4 border-t border-gray-200">
                        {!isPreview ? (
                            <Button 
                                disabled={createReview.isPending || updateReview.isPending}
                                type="submit"
                                size="lg"
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {createReview.isPending || updateReview.isPending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        {initialData ? "Updating..." : "Posting..."}
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        {initialData ? "Update Review" : "Post Review"}
                                    </>
                                )}
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setIsPreview(false)}
                                size="lg"
                                                                type="button"
                                variant="outline"
                                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-lg transition-all duration-200"
                            >
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit Review
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
};

export const ReviewFormSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Skeleton header */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
            </div>

            {/* Skeleton form */}
            <div className="space-y-6">
                {/* Rating skeleton */}
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* Description skeleton */}
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                    <div className="h-32 bg-gray-100 rounded-lg border border-gray-200 animate-pulse"></div>
                </div>

                {/* Button skeleton */}
                <div className="pt-4 border-t border-gray-200">
                    <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};