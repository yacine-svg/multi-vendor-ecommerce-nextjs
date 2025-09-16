"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import dynamic from "next/dynamic";
import { formatCurrency, generateTenantUrl } from "@/lib/utils";
import Link from "next/link";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { CheckIcon, LinkIcon, StarIcon, ShieldCheckIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { RichText } from "@payloadcms/richtext-lexical/react";

const CartButton = dynamic(
    () => import("../components/cart-button").then(
        (mod) => mod.CartButton,
    ),
    {
        ssr: false,
        loading: () => <Button className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg">Add to cart</Button>
    }
)

interface Props {
    productId: string;
    tenantSlug: string;
}

export const ProductView = ({productId, tenantSlug}: Props) =>{
    const trpc =useTRPC();
    const { data }= useSuspenseQuery(trpc.products.getOne.queryOptions({id: productId}))
    
    const [isCopied, setIsCopied] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 lg:px-12 py-10">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    <div className="relative aspect-[3.9] bg-gradient-to-br from-gray-100 to-gray-200">
                        <Image 
                            src={data.image?.url || "/placeholder.png"}
                            alt={data.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-6">
                        <div className="col-span-4">
                            <div className="p-8">
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    {data.name}
                                </h1>
                            </div>
                        
                            <div className="border-y bg-gray-50/50 flex flex-wrap">
                                <div className="px-8 py-6 flex items-center justify-center border-r border-gray-200 flex-1 min-w-0">
                                    <div className="relative">
                                        <div className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                                            <p className="text-lg font-bold">{formatCurrency(data.price)}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="px-8 py-6 flex items-center justify-center lg:border-r border-gray-200 flex-1 min-w-0">
                                    <Link href={generateTenantUrl(tenantSlug)} className="flex items-center gap-3 group">
                                        {data.tenant.image?.url && (
                                            <div className="relative">
                                                <Image
                                                    src={data.tenant.image.url}
                                                    alt={data.tenant.name}
                                                    width={24}
                                                    height={24}
                                                    className="rounded-full border-2 border-gray-200 shrink-0 size-[24px] group-hover:border-pink-400 transition-colors"
                                                />
                                            </div>
                                        )}
                                        <p className="text-base font-semibold text-gray-700 group-hover:text-pink-600 transition-colors underline decoration-2 underline-offset-4">
                                            {data.tenant.name}
                                        </p>
                                    </Link>
                                </div>
                                
                                <div className="hidden lg:flex px-8 py-6 items-center justify-center flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <StarRating 
                                            rating={data.reviewRating}
                                            iconClassName="size-5"
                                        />
                                        <p className="text-base font-semibold text-gray-700">
                                            {data.reviewCount} ratings
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="block lg:hidden px-8 py-6 bg-gray-50/50 border-b">
                                <div className="flex items-center gap-2">
                                    <StarRating 
                                        rating={data.reviewRating}
                                        iconClassName="size-5"
                                    />
                                    <p className="text-base font-semibold text-gray-700">
                                        {data.reviewCount} ratings
                                    </p>
                                </div>
                            </div>
                            
                            <div className="p-8">
                                <div className="prose prose-gray max-w-none">
                                    {data.description ? (
                                        <RichText data={data.description} />
                                    ) : (
                                        <p className="font-medium text-gray-500 italic bg-gray-50 p-4 rounded-lg">
                                            No description provided
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-span-2 bg-gray-50/30">
                            <div className="border-t lg:border-t-0 lg:border-l border-gray-200 h-full">
                                <div className="flex flex-col gap-6 p-8 border-b border-gray-200">
                                    <div className="flex flex-row items-center gap-3">
                                        <CartButton 
                                            isPurchased={data.isPurchased}
                                            productId={productId}
                                            tenantSlug={tenantSlug}
                                        />
                                        <Button
                                            className="size-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                            variant="elevated"
                                            onClick={() => {
                                                setIsCopied(true);
                                                navigator.clipboard.writeText(window.location.href);
                                                toast.success("URL copied to clipboard")
                                                setTimeout(() => {
                                                    setIsCopied(false);
                                                }, 1000)
                                            }}
                                            disabled={isCopied}
                                        >
                                           {isCopied ? <CheckIcon className="text-green-600" /> : <LinkIcon />}
                                        </Button>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-center justify-center">
                                        <ShieldCheckIcon className="size-5 text-green-600" />
                                        <p className="font-semibold text-gray-700">
                                            {data.refundPolicy === "no-refunds"
                                                ? "No refunds" 
                                                : `${data.refundPolicy} money back guarantee`
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">Ratings</h3>
                                        <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg">
                                            <StarIcon className="size-5 fill-yellow-400 text-yellow-400" />
                                            <p className="font-bold text-gray-900">({data.reviewRating})</p>
                                            <p className="text-sm text-gray-600">{data.reviewCount} ratings</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-[auto_1fr_auto] gap-4">
                                        {[5, 4, 3, 2, 1].map((stars) => (
                                            <Fragment key={stars}>
                                                <div className="font-semibold text-gray-700 text-sm">
                                                    {stars} {stars === 1 ? "star" : "stars"}
                                                </div>
                                                <Progress 
                                                    value={data.ratingDistribution[stars]}
                                                    className="h-3 bg-gray-200"
                                                />
                                                <div className="font-bold text-gray-900 text-sm min-w-[3rem] text-right">
                                                    {data.ratingDistribution[stars]}%
                                                </div>
                                            </Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}