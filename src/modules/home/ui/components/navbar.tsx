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
                "relative bg-transparent hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-full px-6 py-2 text-base font-medium transition-all duration-300 group overflow-hidden",
                isActive ? "text-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50" : "text-gray-700 hover:text-indigo-600"
            )}
        >
            <Link href={href} className="relative z-10">
                <span className="relative">
                    {children}
                    {isActive && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-pulse" />
                    )}
                </span>
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
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            "h-20 flex bg-white/80 backdrop-blur-md font-medium justify-between items-center sticky top-0 z-50 transition-all duration-300 border-b",
            isScrolled ? "shadow-lg border-gray-200/50" : "border-transparent"
        )}>  
            {/* Logo */}
            <Link href="/" className="pl-6 flex items-center group">
                <div className="relative">
                    <span className={cn(
                        "text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105",
                        poppins.className
                    )}>
                        funroad
                    </span>
                    <SparklesIcon className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400 animate-pulse opacity-80" />
                </div>
            </Link>  

            {/* Mobile Sidebar */}
            <NavbarSidebar
                items={navbarItems}
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
            />

            {/* Desktop Navigation */}
            <div className="items-center gap-2 hidden lg:flex">
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

            {/* User Actions */}
            {session.data?.user ? (
                <div className="hidden lg:flex items-center">
                    <Button
                        asChild
                        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 px-8 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    >
                        <Link href="/admin" className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4" />
                            Dashboard
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="hidden lg:flex items-center gap-3 pr-6">
                    <Button
                        asChild
                        variant="ghost"
                        className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-full px-6 py-2 font-medium transition-all duration-300"
                    >
                        <Link href="/sign-in" className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4" />
                            Log In
                        </Link>
                    </Button>
                    <Button
                        asChild
                        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    >
                        <Link href="/sign-up" className="flex items-center gap-2">
                            <ShoppingBagIcon className="w-4 h-4" />
                            Start Selling
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </Link>
                    </Button>
                </div>
            )}

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center justify-center pr-4">
                <Button
                    variant="ghost"
                    className="size-10 rounded-full bg-gray-100/50 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <MenuIcon className="w-5 h-5" />
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;