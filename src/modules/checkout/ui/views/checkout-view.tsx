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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-200"></div>
                    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-400"></div>
                </div>
                
                <div className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
                    {/* Enhanced Header */}
                    <div className="mb-12 text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="relative">
                                <ShoppingCartIcon className="w-10 h-10 text-indigo-600" />
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                                Checkout
                            </h1>
                        </div>
                        <p className="text-lg text-gray-600 font-medium">Review your items and complete your purchase</p>
                    </div>

                    {/* Enhanced Loading State */}
                    <div className="backdrop-blur-xl bg-white/80 border-2 border-white/30 shadow-2xl rounded-3xl overflow-hidden">
                        <div className="flex items-center justify-center p-20 flex-col gap-y-8">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin"></div>
                                <div className="absolute inset-2 bg-white rounded-full"></div>
                                <LoaderIcon className="w-8 h-8 text-indigo-600 animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <div className="text-center space-y-3">
                                <h3 className="text-xl font-bold text-gray-900">Loading your cart</h3>
                                <p className="text-gray-600">Please wait while we fetch your items...</p>
                                <div className="flex justify-center space-x-1 mt-4">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce animation-delay-100"></div>
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce animation-delay-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (data?.totalDocs === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-200"></div>
                </div>

                <div className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <ShoppingCartIcon className="w-10 h-10 text-indigo-600" />
                            <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                                Checkout
                            </h1>
                        </div>
                        <p className="text-lg text-gray-600 font-medium">Review your items and complete your purchase</p>
                    </div>

                    {/* Enhanced Empty State */}
                    <div className="backdrop-blur-xl bg-white/80 border-2 border-white/30 shadow-2xl rounded-3xl overflow-hidden">
                        <div className="flex items-center justify-center p-20 flex-col gap-y-8">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center shadow-inner group-hover:shadow-lg transition-all duration-300">
                                    <InboxIcon className="w-16 h-16 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-sm font-black text-white">0</span>
                                </div>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 animate-pulse"></div>
                            </div>
                            <div className="text-center space-y-4">
                                <h3 className="text-2xl font-bold text-gray-900">Your cart is empty</h3>
                                <p className="text-gray-600 text-lg">Looks like you haven&apos;t added any products yet.</p>
                                <button
                                    onClick={() => router.back()}
                                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
                                    <span className="relative">Continue Shopping</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-200"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-400"></div>
            </div>
            
            <div className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
                {/* Enhanced Header */}
                <div className="mb-12 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                        <div className="relative">
                            <ShoppingCartIcon className="w-10 h-10 text-indigo-600" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <span className="text-xs font-black text-white">{data?.totalDocs || 0}</span>
                            </div>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                            Checkout
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 font-medium">Review your items and complete your purchase</p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="backdrop-blur-xl bg-white/80 border-2 border-white/30 shadow-2xl rounded-3xl overflow-hidden">
                            <div className="p-8 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white/50">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Order Summary ({data?.totalDocs} {data?.totalDocs === 1 ? 'item' : 'items'})
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-200/50">
                                {data?.docs.map((product, index) => (
                                    <div key={product.id} className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-300">
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

                        {/* Enhanced Trust Indicators */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="group flex items-center gap-4 p-6 bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-white/30 shadow-xl hover:shadow-2xl hover:bg-white/80 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-lg">Secure Payment</p>
                                    <p className="text-gray-600 font-medium">SSL encrypted</p>
                                </div>
                            </div>
                            <div className="group flex items-center gap-4 p-6 bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-white/30 shadow-xl hover:shadow-2xl hover:bg-white/80 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-sky-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-lg">Instant Access</p>
                                    <p className="text-gray-600 font-medium">Download immediately</p>
                                </div>
                            </div>
                            <div className="group flex items-center gap-4 p-6 bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-white/30 shadow-xl hover:shadow-2xl hover:bg-white/80 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-lg">24/7 Support</p>
                                    <p className="text-gray-600 font-medium">Always here to help</p>
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