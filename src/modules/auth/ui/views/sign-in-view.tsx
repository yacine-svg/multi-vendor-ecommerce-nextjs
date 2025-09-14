"use client";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Poppins } from 'next/font/google';
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "../../schemas";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const SignInView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const login = useMutation(trpc.auth.login.mutationOptions({
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
            toast.success("Signed in to account successfully");
            router.push("/");
        },
    }));
    
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        mode: "all",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        login.mutateAsync(values);
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5 relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200/30 rounded-full blur-lg animate-bounce" style={{ animationDuration: '3s' }} />
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Left Panel - Form */}
            <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100/80 lg:col-span-3 flex items-center justify-center p-4 lg:p-8 relative z-10 backdrop-blur-sm">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <Link href="/" className="group">
                            <span className={cn(
                                "text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 drop-shadow-sm", 
                                poppins.className
                            )}>
                                funroad
                            </span>
                        </Link>
                        <Button 
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900 hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-md transition-all duration-300 rounded-full px-5 py-2 border border-transparent hover:border-gray-200/50"
                        >
                            <Link prefetch href="/sign-up">
                                Sign up
                            </Link>
                        </Button>
                    </div>

                    {/* Welcome Section */}
                    <div className="text-center lg:text-left space-y-3">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                            Welcome back
                        </h1>
                        <p className="text-lg text-gray-600 font-medium">
                            Sign in to continue your creative journey
                        </p>
                        {/* Trust indicators */}
                        <div className="flex items-center justify-center lg:justify-start gap-6 pt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span>Secure login</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                                <span>1000+ creators</span>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                name="email"
                                render={({field}) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-base font-semibold text-gray-700">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                className="h-12 border-2 border-gray-200/80 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl transition-all duration-300 text-base bg-white/80 backdrop-blur-sm hover:bg-white hover:border-gray-300 placeholder:text-gray-400"
                                                placeholder="Enter your email"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm font-medium" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                render={({field}) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-base font-semibold text-gray-700">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="password"
                                                className="h-12 border-2 border-gray-200/80 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl transition-all duration-300 text-base bg-white/80 backdrop-blur-sm hover:bg-white hover:border-gray-300 placeholder:text-gray-400"
                                                placeholder="Enter your password"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm font-medium" />
                                    </FormItem>
                                )}
                            />
                            
                            <Button
                                disabled={login.isPending}
                                type="submit"
                                size="lg"
                                className="w-full h-12 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed active:scale-[0.98] border border-purple-500/20"
                            >
                                {login.isPending ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Sign in
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                )}
                            </Button>

                            {/* Additional Links */}
                            <div className="text-center pt-4 space-y-3">
                                <Link 
                                    href="/forgot-password" 
                                    className="text-purple-600 hover:text-purple-700 text-sm font-medium hover:underline transition-all duration-200 inline-flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Forgot your password?
                                </Link>
                                
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                                    <span className="text-xs text-gray-500 font-medium">Quick & Secure</span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

            {/* Right Panel - Background Image */}
            <div className="hidden lg:block lg:col-span-2 relative overflow-hidden">
                {/* Gradient overlay with glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-pink-900/30 z-10 backdrop-blur-[1px]" />
                
                {/* Background image */}
                <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-700 hover:scale-110"
                    style={{
                        backgroundImage: "url('/auth-bg.png')",
                        filter: "brightness(0.9) contrast(1.1)"
                    }}
                />
                
                {/* Floating elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl z-20 animate-float" />
                <div className="absolute bottom-32 right-16 w-16 h-16 bg-pink-500/20 backdrop-blur-sm rounded-xl z-20 animate-float" style={{ animationDelay: '2s' }} />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 z-30 flex items-end p-8 lg:p-12">
                    <div className="text-white space-y-6 max-w-md">
                        <div className="space-y-4">
                            <h2 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight">
                                Start your creative journey
                            </h2>
                            <p className="text-lg xl:text-xl opacity-90 leading-relaxed font-medium">
                                Join thousands of creators who are already building their success story with Funroad.
                            </p>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-6 pt-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">1000+</div>
                                <div className="text-sm opacity-80">Creators</div>
                            </div>
                            <div className="w-px h-12 bg-white/20" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">$2M+</div>
                                <div className="text-sm opacity-80">Earned</div>
                            </div>
                            <div className="w-px h-12 bg-white/20" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">99%</div>
                                <div className="text-sm opacity-80">Uptime</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};