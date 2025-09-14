"use client";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCart } from "../../hooks/use-cart";
import { useEffect } from "react";
import { generateTenantUrl } from "@/lib/utils";
import { CheckoutItem } from "../components/checkout-item";
import { CheckoutSidebar } from "../components/checkout-sidebar";
import { InboxIcon, LoaderIcon, ShoppingCartIcon } from "lucide-react";
import { useCheckoutStates } from "../../hooks/use-checkout-states";
import { useRouter } from "next/navigation";

interface CheckoutViewProps {
    tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
    const router = useRouter();

    const [states, setStates] = useCheckoutStates();
    const { productIds, removeProduct, clearCart } = useCart(tenantSlug);

    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery(trpc.checkout.getProducts.queryOptions({
        ids: productIds,
    }))

    const purchase = useMutation(trpc.checkout.purchase.mutationOptions({
        onMutate: () => {
            setStates({ success: false, cancel: false })
        },
        onSuccess: (data) => {
            window.location.href = data.url;
        },
        onError: (error) => {
            if (error.data?.code === "UNAUTHORIZED") {
                router.push("/sign-in")
            }
            toast.error(error.message);
        },
    }));

    useEffect(() => {
        if (states.success) {
            setStates({ success: false, cancel: false });
            clearCart();
            queryClient.invalidateQueries(trpc.library.getMany.infiniteQueryFilter())
            router.push("/library")
        }
    }, [states.success, clearCart, router, setStates, queryClient, trpc.library.getMany])

    useEffect(() => {
        if (error?.data?.code === "NOT_FOUND") {
            clearCart();
            toast.warning("Invalid products found, cart cleared")
        }
    }, [error, clearCart]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8 lg:py-16">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <ShoppingCartIcon className="w-8 h-8 text-indigo-600" />
                            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                Checkout
                            </h1>
                        </div>
                        <p className="text-gray-600">Review your items and complete your purchase</p>
                    </div>

                    {/* Loading State */}
                    <div className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-xl rounded-2xl">
                        <div className="flex items-center justify-center p-16 flex-col gap-y-6">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse"></div>
                                <LoaderIcon className="w-8 h-8 text-white animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading your cart</h3>
                                <p className="text-gray-500">Please wait while we fetch your items...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (data?.totalDocs === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8 lg:py-16">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <ShoppingCartIcon className="w-8 h-8 text-indigo-600" />
                            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                Checkout
                            </h1>
                        </div>
                        <p className="text-gray-600">Review your items and complete your purchase</p>
                    </div>

                    {/* Empty State */}
                    <div className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-xl rounded-2xl">
                        <div className="flex items-center justify-center p-16 flex-col gap-y-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                    <InboxIcon className="w-12 h-12 text-gray-400" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">0</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                                <p className="text-gray-500 mb-6">Looks like you haven&apos;t added any products yet.</p>
                                <button
                                    onClick={() => router.back()}
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8 lg:py-16">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="relative">
                            <ShoppingCartIcon className="w-8 h-8 text-indigo-600" />
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">{data?.totalDocs || 0}</span>
                            </div>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Checkout
                        </h1>
                    </div>
                    <p className="text-gray-600">Review your items and complete your purchase</p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-8">
                        <div className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Order Summary ({data?.totalDocs} {data?.totalDocs === 1 ? 'item' : 'items'})
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {data?.docs.map((product, index) => (
                                    <div key={product.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                                        <CheckoutItem
                                            isLast={index === data.docs.length - 1}
                                            imageUrl={product.image?.url}
                                            name={product.name}
                                            productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                                            tenantUrl={generateTenantUrl(product.tenant.slug)}
                                            tenantName={product.tenant.name}
                                            price={product.price}
                                            onRemove={() => removeProduct(product.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Secure Payment</p>
                                    <p className="text-sm text-gray-500">SSL encrypted</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Instant Access</p>
                                    <p className="text-sm text-gray-500">Download immediately</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">24/7 Support</p>
                                    <p className="text-sm text-gray-500">Always here to help</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-8">
                            <CheckoutSidebar
                                total={data?.totalPrice || 0}
                                onPurchase={() => purchase.mutate({ tenantSlug, productIds })}
                                isCanceled={states.cancel}
                                disabled={purchase.isPending}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}