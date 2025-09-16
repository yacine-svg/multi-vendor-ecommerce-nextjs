"use client";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { UserIcon, ShoppingBagIcon, HomeIcon, InfoIcon, Sparkles as FeaturesIcon, DollarSignIcon, MailIcon, XIcon } from "lucide-react";

interface NavbarItem {
    href: string;
    children: React.ReactNode; 
};

interface Props {
    items: NavbarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const getIconForHref = (href: string) => {
    switch (href) {
        case '/': return <HomeIcon className="w-5 h-5" />;
        case '/about': return <InfoIcon className="w-5 h-5" />;
        case '/features': return <FeaturesIcon className="w-5 h-5" />;
        case '/pricing': return <DollarSignIcon className="w-5 h-5" />;
        case '/contact': return <MailIcon className="w-5 h-5" />;
        default: return null;
    }
};

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="p-0 w-80 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 backdrop-blur-2xl border-r border-white/10 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                {/* Header */}
                <SheetHeader className="relative p-8 border-b border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <SheetTitle className="text-left text-3xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                                Navigation
                            </SheetTitle>
                            <p className="text-sm text-slate-400 text-left mt-2">Explore funroad</p>
                        </div>
                        <button 
                            onClick={() => onOpenChange(false)}
                            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-white/20 backdrop-blur-sm"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>
                </SheetHeader>

                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-8">
                    {/* Main Navigation */}
                    <div className="relative px-4 py-6 space-y-2">
                        {items.map((item, index) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group relative flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-300 hover:bg-gradient-to-r hover:from-indigo-500/90 hover:via-purple-600/90 hover:to-pink-600/90 hover:text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20 font-semibold text-lg overflow-hidden border border-white/5 hover:border-white/20 backdrop-blur-sm"
                                onClick={() => onOpenChange(false)}
                                style={{ transitionDelay: `${index * 75}ms` }}
                            >
                                {/* Icon Container */}
                                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/20 group-hover:to-white/10 flex items-center justify-center transition-all duration-500 border border-white/10 group-hover:border-white/30">
                                    <div className="group-hover:scale-110 transition-transform duration-300">
                                        {getIconForHref(item.href)}
                                    </div>
                                    {/* Icon glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                </div>

                                <span className="flex-1 relative z-10">{item.children}</span>
                                
                                {/* Active indicator */}
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse" />

                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                
                                {/* Subtle border glow */}
                                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/10 transition-all duration-500" />
                            </Link>
                        ))}
                    </div>

                    {/* Glowing Divider */}
                    <div className="mx-8 my-8 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent blur-sm opacity-50" />
                    </div>

                    {/* Enhanced Auth Actions */}
                    <div className="relative px-4 space-y-4">
                        {/* Log In Button */}
                        <Link 
                            href="/sign-in" 
                            className="group flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-300 hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-800/30 transition-all duration-500 hover:scale-[1.02] font-semibold text-lg overflow-hidden border border-white/5 hover:border-white/20 backdrop-blur-sm"
                            onClick={() => onOpenChange(false)}
                        >
                            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/20 group-hover:to-white/10 flex items-center justify-center transition-all duration-500 border border-white/10 group-hover:border-white/30">
                                <UserIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                {/* Icon glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 to-slate-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                            </div>
                            <span className="flex-1">Log In</span>
                            <div className="w-2 h-2 rounded-full bg-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse" />
                        </Link>

                        {/* Start Selling Button */}
                        <Link 
                            href="/sign-up" 
                            className="group flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/30 font-semibold text-lg relative overflow-hidden border border-indigo-500/30 hover:border-white/30"
                            onClick={() => onOpenChange(false)}
                        >
                            <div className="relative w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-500">
                                <ShoppingBagIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                {/* Icon glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                            </div>
                            <span className="flex-1 relative z-10">Start Selling</span>
                            <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse" />
                            
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            
                            {/* Subtle border glow */}
                            <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-all duration-500" />
                        </Link>
                    </div>

                    {/* Bottom Decoration */}
                    <div className="px-6 pt-12 pb-6">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl text-sm text-slate-400 backdrop-blur-sm border border-white/5">
                                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse" />
                                Made with ❤️ by funroad
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}