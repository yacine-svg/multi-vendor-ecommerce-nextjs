import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { UserIcon, ShoppingBagIcon, HomeIcon, InfoIcon, Sparkles as FeaturesIcon, DollarSignIcon, MailIcon } from "lucide-react";

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
        case '/': return <HomeIcon className="w-4 h-4" />;
        case '/about': return <InfoIcon className="w-4 h-4" />;
        case '/features': return <FeaturesIcon className="w-4 h-4" />;
        case '/pricing': return <DollarSignIcon className="w-4 h-4" />;
        case '/contact': return <MailIcon className="w-4 h-4" />;
        default: return null;
    }
};

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="p-0 w-80 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-xl border-r border-white/20">
                <SheetHeader className="p-6 border-b border-white/20 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
                    <SheetTitle className="text-left text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Navigation
                    </SheetTitle>
                    <p className="text-sm text-gray-600 text-left mt-1">Explore funroad</p>
                </SheetHeader>

                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-6">
                    {/* Main Navigation */}
                    <div className="px-3 py-4 space-y-1">
                        {items.map((item, index) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg font-medium"
                                onClick={() => onOpenChange(false)}
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:from-white/20 group-hover:to-white/10 flex items-center justify-center transition-all duration-300">
                                    {getIconForHref(item.href)}
                                </div>
                                <span className="flex-1">{item.children}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="mx-6 my-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    {/* Auth Actions */}
                    <div className="px-3 space-y-3">
                        <Link 
                            href="/sign-in" 
                            className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 transition-all duration-300 hover:scale-[1.02] font-medium"
                            onClick={() => onOpenChange(false)}
                        >
                            <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-white flex items-center justify-center transition-all duration-300">
                                <UserIcon className="w-4 h-4" />
                            </div>
                            <span className="flex-1">Log In</span>
                        </Link>

                        <Link 
                            href="/sign-up" 
                            className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg font-semibold relative overflow-hidden"
                            onClick={() => onOpenChange(false)}
                        >
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                <ShoppingBagIcon className="w-4 h-4" />
                            </div>
                            <span className="flex-1">Start Selling</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </Link>
                    </div>

                    {/* Bottom Decoration */}
                    <div className="px-6 pt-8 pb-4">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full text-sm text-gray-600">
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