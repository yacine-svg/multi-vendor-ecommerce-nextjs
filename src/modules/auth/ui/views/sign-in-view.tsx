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
  weight: ['700'],
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
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5">
            {/* Left Panel - Form */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 lg:col-span-3 flex items-center justify-center p-4 lg:p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <Link href="/" className="group">
                            <span className={cn(
                                "text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent transition-all group-hover:scale-105", 
                                poppins.className
                            )}>
                                funroad
                            </span>
                        </Link>
                        <Button 
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 rounded-full px-4"
                        >
                            <Link prefetch href="/sign-up">
                                Sign up
                            </Link>
                        </Button>
                    </div>

                    {/* Welcome Section */}
                    <div className="text-center lg:text-left space-y-2">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Welcome back
                        </h1>
                        <p className="text-lg text-gray-600">
                            Sign in to continue your creative journey
                        </p>
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
                                    <FormItem>
                                        <FormLabel className="text-base font-semibold text-gray-700">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl transition-all duration-200 text-base"
                                                placeholder="Enter your email"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-semibold text-gray-700">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="password"
                                                className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl transition-all duration-200 text-base"
                                                placeholder="Enter your password"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            
                            <Button
                                disabled={login.isPending}
                                type="submit"
                                size="lg"
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {login.isPending ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>

                            {/* Additional Links */}
                            <div className="text-center pt-4">
                                <Link 
                                    href="/forgot-password" 
                                    className="text-purple-600 hover:text-purple-700 text-sm font-medium hover:underline transition-colors"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

            {/* Right Panel - Background Image */}
            <div className="hidden lg:block lg:col-span-2 relative overflow-hidden">
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 z-10"
                />
                <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/auth-bg.png')",
                    }}
                />
                {/* Overlay Content */}
                <div className="absolute inset-0 z-20 flex items-end p-8 lg:p-12">
                    <div className="text-white space-y-4">
                        <h2 className="text-3xl font-bold">
                            Start your creative journey
                        </h2>
                        <p className="text-lg opacity-90 max-w-md">
                            Join thousands of creators who are already building their success story with Funroad.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};