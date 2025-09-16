"use client";
import { generateTenantUrl } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface Props {
    slug: string;
}

export const Navbar = ({ slug }: Props) => {
    return (
        <nav className="h-20 bg-white/80 backdrop-blur-xl border-b-2 border-white/30 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-4 lg:px-12">             
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-lg">C</span>
                    </div>
                    <p className="text-2xl font-black bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
                        Checkout
                    </p>
                </div>
                <Button 
                    variant="elevated"
                    asChild
                    className="group bg-white/90 backdrop-blur-lg border-2 border-white/30 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden"
                >
                    <Link href={generateTenantUrl(slug)}>
                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                        <div className="relative flex items-center gap-2">
                            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                            <span className="font-semibold">Continue Shopping</span>
                        </div>
                    </Link>
                </Button>
            </div>
        </nav>
    )
}