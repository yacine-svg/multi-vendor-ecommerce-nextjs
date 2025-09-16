"use client";
import { poppins } from '@/lib/utils'; 
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { NavbarSidebar } from './navbar-sidebar';
import { useState, useEffect } from 'react';
import { MenuIcon, UserIcon, ShoppingBagIcon, SparklesIcon } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

interface NavItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
};

const NavbarItem = ({ href, children, isActive }: NavItemProps) => {
    return (
        <Button 
            asChild
            variant="ghost"
            className={cn(
                "group relative bg-transparent hover:bg-gradient-to-br hover:from-indigo-50 hover:via-purple-50 hover:to-pink-50 rounded-2xl px-8 py-3 text-base font-semibold transition-all duration-500 overflow-hidden border border-transparent hover:border-indigo-200/50 hover:shadow-lg hover:shadow-indigo-100/50",
                isActive ? "text-indigo-600 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-indigo-200/50 shadow-lg shadow-indigo-100/50" : "text-slate-700 hover:text-indigo-600"
            )}
        >
            <Link href={href} className="relative z-10 flex items-center gap-2">
                <span className="relative">
                    {children}
                    {isActive && (
                        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full animate-pulse" />
                    )}
                </span>
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
        </Button>
    );
};

const navbarItems = [
    {
        href: '/',
        children: 'Home',
    }, {
        href: '/about',
        children: 'About'
    }, {
        href: '/features',
        children: 'Features'
    }, {
        href: '/pricing',
        children: 'Pricing'
    }, {
        href: '/contact',
        children: 'Contact'
    }
];

export const Navbar = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions()); 

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            "h-24 flex font-medium justify-between items-center sticky top-0 z-50 transition-all duration-500 px-2",
            isScrolled 
                ? "bg-white/90 backdrop-blur-2xl shadow-xl shadow-indigo-100/20 border-b border-indigo-100/50" 
                : "bg-white/80 backdrop-blur-xl border-b border-transparent"
        )}>  
            {/* Enhanced Logo */}
            <Link href="/" className="pl-6 flex items-center group">
                <div className="relative">
                    {/* Glowing background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110" />
                    
                    <span className={cn(
                        "relative text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105",
                        poppins.className
                    )}>
                        funroad
                    </span>
                    
                    {/* Enhanced sparkles */}
                    <SparklesIcon className="absolute -top-3 -right-3 w-6 h-6 text-yellow-400 animate-spin group-hover:animate-pulse transition-all duration-300" />
                    <div className="absolute -top-1 right-2 w-2 h-2 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full animate-ping" />
                </div>
            </Link>  

            {/* Mobile Sidebar */}
            <NavbarSidebar
                items={navbarItems}
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
            />

            {/* Enhanced Desktop Navigation */}
            <div className="items-center gap-1 hidden lg:flex bg-gradient-to-r from-slate-50/80 to-indigo-50/80 backdrop-blur-sm rounded-2xl p-2 border border-slate-200/50">
                {navbarItems.map((item) => (
                    <NavbarItem 
                        key={item.href}
                        href={item.href}
                        isActive={pathname === item.href}
                    >
                        {item.children} 
                    </NavbarItem>
                ))}
            </div>

            {/* Enhanced User Actions */}
            {session.data?.user ? (
                <div className="hidden lg:flex items-center">
                    <Button
                        asChild
                        className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 px-10 py-3 rounded-2xl font-bold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-200/50 border-2 border-transparent hover:border-white/20"
                    >
                        <Link href="/admin" className="relative z-10 flex items-center gap-3">
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                <UserIcon className="w-4 h-4" />
                            </div>
                            Dashboard
                            {/* Enhanced shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="hidden lg:flex items-center gap-4 pr-6">
                    <Button
                        asChild
                        variant="ghost"
                        className="group relative text-slate-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-2xl px-8 py-3 font-semibold transition-all duration-300 border border-transparent hover:border-indigo-200/50 hover:shadow-lg hover:shadow-indigo-100/50"
                    >
                        <Link href="/sign-in" className="relative z-10 flex items-center gap-2">
                            <UserIcon className="w-5 h-5" />
                            Log In
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </Link>
                    </Button>
                    
                    <Button
                        asChild
                        className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 px-8 py-3 rounded-2xl font-bold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-200/50 border-2 border-transparent hover:border-white/20"
                    >
                        <Link href="/sign-up" className="relative z-10 flex items-center gap-3">
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                                <ShoppingBagIcon className="w-4 h-4" />
                            </div>
                            Start Selling
                            {/* Enhanced shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            
                            {/* Pulsing border effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                        </Link>
                    </Button>
                </div>
            )}

            {/* Enhanced Mobile Menu Button */}
            <div className="flex lg:hidden items-center justify-center pr-4">
                <Button
                    variant="ghost"
                    className="group relative w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100/80 to-indigo-100/80 hover:from-indigo-100 hover:to-purple-100 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 border border-slate-200/50 hover:border-indigo-200/50"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <MenuIcon className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl" />
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;