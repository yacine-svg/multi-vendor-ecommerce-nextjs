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
  weight: ['700'],
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
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5">
            {/* Left Panel - Form */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 lg:col-span-3 flex items-center justify-center p-6 lg:p-8">
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
                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 rounded-full px-4 py-2"
                        >
                            <Link prefetch href="/sign-in">
                                Sign in
                            </Link>
                        </Button>
                    </div>

                    {/* Welcome Section */}
                    <div className="text-center lg:text-left space-y-3 mb-6">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                            Join over <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">1000 creators</span> earning money on Funroad
                        </h1>
                        <p className="text-base text-gray-600">
                            Build your store and start selling in minutes
                        </p>
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
                                    <FormItem>
                                        <FormLabel className="text-base font-semibold text-gray-700">
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl transition-all duration-200 text-base"
                                                placeholder="Choose your username"
                                            />
                                        </FormControl>
                                        <FormDescription className={cn(
                                            "opacity-0 transform -translate-y-2 transition-all duration-300",
                                            showPreview && "opacity-100 translate-y-0"
                                        )}>
                                            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200/50 mt-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <span className="text-sm text-gray-700">
                                                    Your store will be available at{" "}
                                                    <span className="font-semibold text-purple-600">
                                                        {username}.shop.com
                                                    </span>
                                                </span>
                                            </div>
                                        </FormDescription>
                                        <FormMessage className="text-red-500 text-sm mt-1" />
                                    </FormItem>
                                )}
                            />

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
                                                type="email"
                                                className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl transition-all duration-200 text-base"
                                                placeholder="Enter your email"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm mt-1" />
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
                                                className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl transition-all duration-200 text-base"
                                                placeholder="Create a strong password"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm mt-1" />
                                    </FormItem>
                                )}
                            />
                            
                            <Button
                                disabled={register.isPending}
                                type="submit"
                                size="lg"
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                            >
                                {register.isPending ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Creating account...
                                    </div>
                                ) : (
                                    "Create account"
                                )}
                            </Button>

                            {/* Terms and Privacy */}
                            <p className="text-xs text-gray-500 text-center leading-relaxed pt-2">
                                By creating an account, you agree to our{" "}
                                <Link href="/terms" className="text-purple-600 hover:underline font-medium">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-purple-600 hover:underline font-medium">
                                    Privacy Policy
                                </Link>
                            </p>
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
                    <div className="text-white space-y-6">
                        <h2 className="text-3xl font-bold">
                            Your creative empire starts here
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                                <span className="text-lg opacity-90">Set up your store in minutes</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                <span className="text-lg opacity-90">Start earning immediately</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                                <span className="text-lg opacity-90">Join a community of creators</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};