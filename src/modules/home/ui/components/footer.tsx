"use client";
import Link from 'next/link';
import { 
    TwitterIcon, 
    GithubIcon, 
    LinkedinIcon, 
    MailIcon, 
    HeartIcon, 
    ArrowUpIcon,
    SparklesIcon 
} from 'lucide-react';

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500" />
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-5" 
                 style={{
                     backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                     backgroundSize: '40px 40px'
                 }} 
            />

            {/* Main Footer Content */}
            <div className="relative container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <h3 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                                    funroad
                                </h3>
                                <SparklesIcon className="absolute -top-2 -right-4 w-5 h-5 text-yellow-400 animate-spin" />
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl rounded-lg animate-pulse" />
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            Empowering creators and entrepreneurs to build, sell, and scale their digital products with ease.
                        </p>
                        <div className="flex items-center gap-4">
                            <SocialLink href="#" icon={<TwitterIcon className="w-5 h-5" />} />
                            <SocialLink href="#" icon={<GithubIcon className="w-5 h-5" />} />
                            <SocialLink href="#" icon={<LinkedinIcon className="w-5 h-5" />} />
                            <SocialLink href="#" icon={<MailIcon className="w-5 h-5" />} />
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    <div className="space-y-8">
                        <h4 className="text-xl font-semibold text-white relative">
                            Product
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
                        </h4>
                        <nav className="space-y-4">
                            <FooterLink href="/features">Features</FooterLink>
                            <FooterLink href="/pricing">Pricing</FooterLink>
                            <FooterLink href="/integrations">Integrations</FooterLink>
                            <FooterLink href="/api">API</FooterLink>
                        </nav>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-xl font-semibold text-white relative">
                            Company
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
                        </h4>
                        <nav className="space-y-4">
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/careers">Careers</FooterLink>
                            <FooterLink href="/press">Press</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                        </nav>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-xl font-semibold text-white relative">
                            Support
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
                        </h4>
                        <nav className="space-y-4">
                            <FooterLink href="/help">Help Center</FooterLink>
                            <FooterLink href="/docs">Documentation</FooterLink>
                            <FooterLink href="/status">Status</FooterLink>
                            <FooterLink href="/security">Security</FooterLink>
                        </nav>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl" />
                    <div className="relative p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
                        <div className="text-center max-w-2xl mx-auto">
                            <h4 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                                Stay in the loop
                            </h4>
                            <p className="text-slate-300 mb-8 text-lg">
                                Get the latest updates, tips, and exclusive content delivered to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <div className="relative flex-1">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-6 py-4 rounded-full border border-white/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 outline-none transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-slate-400 text-lg"
                                    />
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>
                                <button className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    <span className="relative z-10">Subscribe</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3 text-slate-300">
                            <span className="text-lg">© 2024 funroad, Inc. Made with</span>
                            <HeartIcon className="w-5 h-5 text-red-400 animate-pulse" />
                            <span className="text-lg">in San Francisco</span>
                        </div>
                        
                        <div className="flex items-center gap-8 text-base">
                            <FooterLink href="/privacy" className="hover:text-indigo-400">Privacy Policy</FooterLink>
                            <FooterLink href="/terms" className="hover:text-indigo-400">Terms of Service</FooterLink>
                            <FooterLink href="/cookies" className="hover:text-indigo-400">Cookie Policy</FooterLink>
                        </div>

                        {/* Enhanced Scroll to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className="group relative p-3 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
                            aria-label="Scroll to top"
                        >
                            <ArrowUpIcon className="relative z-10 w-5 h-5 group-hover:animate-bounce" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Enhanced Helper Components
const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
    <Link
        href={href}
        className="group relative w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 hover:from-indigo-500 hover:to-purple-600 text-slate-300 hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-indigo-500/25 border border-white/10 hover:border-white/30 overflow-hidden"
    >
        <div className="relative z-10 group-hover:animate-pulse transition-all duration-300">
            {icon}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </Link>
);

const FooterLink = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
    <Link
        href={href}
        className={`group relative text-slate-300 hover:text-white transition-all duration-300 font-medium text-lg ${className} inline-block`}
    >
        <span className="relative z-10">{children}</span>
        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300" />
    </Link>
);

export default Footer