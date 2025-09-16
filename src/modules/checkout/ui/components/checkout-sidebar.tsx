import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CircleXIcon, CreditCardIcon } from "lucide-react";

interface CheckoutSidebarProps {
    total: number;
    onPurchase: () => void;
    isCanceled?: boolean;
    disabled?: boolean;
}

export const CheckoutSidebar = ({
    total,
    onPurchase,
    isCanceled,
    disabled,
}: CheckoutSidebarProps) => {
    return (
        <div className="backdrop-blur-xl bg-white/80 border-2 border-white/30 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-gray-50/50 to-white/50 p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xl text-gray-900">Order Total</h4>
                    <p className="font-black text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {formatCurrency(total)}
                    </p>
                </div>
            </div>
            <div className="p-6">
                <Button 
                    variant="elevated"
                    disabled={disabled}
                    onClick={onPurchase}
                    size="lg"
                    className="group relative w-full text-lg font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden rounded-2xl py-4"
                >
                    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
                    <div className="relative flex items-center justify-center gap-3">
                        <CreditCardIcon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Complete Purchase</span>
                    </div>
                </Button>
            </div>
            {isCanceled && (
                <div className="p-6 border-t border-gray-200/50">
                    <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                                <CircleXIcon className="w-6 h-6 text-red-500" />
                            </div>
                            <div>
                                <p className="font-bold text-red-800">Payment Failed</p>
                                <p className="text-sm text-red-600">Please try again or contact support.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}