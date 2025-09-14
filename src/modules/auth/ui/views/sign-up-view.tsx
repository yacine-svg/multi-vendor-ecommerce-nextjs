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
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form";
import { registreSchema } from "../../schemas";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const SignUpView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const register = useMutation(trpc.auth.register.mutationOptions({
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
            toast.success("Account created successfully");
            router.push("/");
        },
    }));
    
    const form = useForm<z.infer<typeof registreSchema>>({
        resolver: zodResolver(registreSchema),
        mode: "all",
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

    const onSubmit = (values: z.infer<typeof registreSchema>) => {
        register.mutateAsync(values);
    }

    const username = form.watch("username");
    const usernameErrors = form.formState.errors.username;
    const showPreview = username && !usernameErrors;

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5 relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-32 left-16 w-40 h-40 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute top-20 right-32 w-28 h-28 bg-blue-200/25 rounded-full blur-lg animate-bounce" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-gradient-to-br from-purple-100/15 to-blue-100/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-8 w-20 h-20 bg-pink-200/30 rounded-full blur-md animate-pulse" style={{ animationDelay: '1.5s' }} />
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
                            <Link prefetch href="/sign-in">
                                Sign in
                            </Link>
                        </Button>
                    </div>

                    {/* Welcome Section */}
                    <div className="text-center lg:text-left space-y-4">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                            Join over <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">1000 creators</span> earning money on Funroad
                        </h1>
                        <p className="text-lg text-gray-600 font-medium">
                            Build your store and start selling in minutes
                        </p>
                        
                        {/* Benefits showcase */}
                        <div className="grid grid-cols-2 gap-3 pt-3">
                            <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200/50">
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-green-700 font-medium">Free setup</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200/50">
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-blue-700 font-medium">Instant payouts</span>
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
                                name="username"
                                render={({field}) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-base font-semibold text-gray-700 flex items-center gap-2">
                                            Username
                                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                                                Your store URL
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input 
                                                    {...field}
                                                    className="h-12 border-2 border-gray-200/80 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl transition-all duration-300 text-base bg-white/80 backdrop-blur-sm hover:bg-white hover:border-gray-300 placeholder:text-gray-400 pl-4"
                                                    placeholder="Choose your username"
                                                />
                                                {username && !usernameErrors && (
                                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormDescription className={cn(
                                            "opacity-0 transform -translate-y-2 transition-all duration-300",
                                            showPreview && "opacity-100 translate-y-0"
                                        )}>
                                            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-lg border border-purple-200/50 backdrop-blur-sm">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <span className="text-sm text-gray-700 font-medium">
                                                    Your store: {" "}
                                                    <span className="font-semibold text-purple-600 bg-white/60 px-2 py-1 rounded-md">
                                                        {username}.shop.com
                                                    </span>
                                                </span>
                                            </div>
                                        </FormDescription>
                                        <FormMessage className="text-red-500 text-sm font-medium" />
                                    </FormItem>
                                )}
                            />

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
                                                type="email"
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
                                                placeholder="Create a strong password"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm font-medium" />
                                    </FormItem>
                                )}
                            />
                            
                            <Button
                                disabled={register.isPending}
                                type="submit"
                                size="lg"
                                className="w-full h-12 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed active:scale-[0.98] border border-purple-500/20"
                            >
                                {register.isPending ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Create account
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                )}
                            </Button>

                            {/* Terms and Privacy */}
                            <div className="space-y-4">
                                <p className="text-xs text-gray-500 text-center leading-relaxed">
                                    By creating an account, you agree to our{" "}
                                    <Link href="/terms" className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors">
                                        Privacy Policy
                                    </Link>
                                </p>
                                
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                                    <span className="text-xs text-gray-500 font-medium">Join the community</span>
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
                <div className="absolute top-16 right-12 w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl z-20 animate-float" />
                <div className="absolute top-32 left-8 w-16 h-16 bg-purple-500/20 backdrop-blur-sm rounded-xl z-20 animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-40 right-20 w-20 h-20 bg-pink-500/15 backdrop-blur-md rounded-2xl z-20 animate-float" style={{ animationDelay: '2.5s' }} />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 z-30 flex items-end p-8 lg:p-12">
                    <div className="backdrop-blur-md bg-black/20 border border-white/20 rounded-2xl p-8 space-y-8 max-w-md shadow-2xl">
                        <div className="space-y-4">
                            <h2 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg">
                                Your creative empire starts here
                            </h2>
                            <p className="text-lg xl:text-xl text-white/95 leading-relaxed font-medium drop-shadow-md">
                                Transform your passion into profit with our powerful creator platform.
                            </p>
                        </div>
                        
                        {/* Feature list */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                <div className="w-12 h-12 bg-green-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/40">
                                    <svg className="w-6 h-6 text-green-300 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-lg text-white drop-shadow-md">Set up in minutes</div>
                                    <div className="text-sm text-white/80 drop-shadow-sm">No technical knowledge required</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                <div className="w-12 h-12 bg-blue-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-400/40">
                                    <svg className="w-6 h-6 text-blue-300 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-lg text-white drop-shadow-md">Instant payments</div>
                                    <div className="text-sm text-white/80 drop-shadow-sm">Get paid immediately after each sale</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                <div className="w-12 h-12 bg-purple-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-purple-400/40">
                                    <svg className="w-6 h-6 text-purple-300 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM9 7a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 000-2H9z" />
                                        <path d="M7 14a5.971 5.971 0 003 1.86A5.971 5.971 0 0013 14H7z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-lg text-white drop-shadow-md">Creator community</div>
                                    <div className="text-sm text-white/80 drop-shadow-sm">Learn from successful creators</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Success metrics */}
                        <div className="pt-6 border-t border-white/30">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white drop-shadow-lg">1000+</div>
                                    <div className="text-xs text-white/80 drop-shadow-sm">Active creators</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white drop-shadow-lg">$2M+</div>
                                    <div className="text-xs text-white/80 drop-shadow-sm">Total earnings</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white drop-shadow-lg">4.9★</div>
                                    <div className="text-xs text-white/80 drop-shadow-sm">Creator rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg); 
                        opacity: 0.8;
                    }
                    33% { 
                        transform: translateY(-15px) rotate(1deg); 
                        opacity: 1;
                    }
                    66% { 
                        transform: translateY(-10px) rotate(-1deg); 
                        opacity: 0.9;
                    }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};