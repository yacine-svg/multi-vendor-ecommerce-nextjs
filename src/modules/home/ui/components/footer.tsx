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
        <footer className="relative bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 border-t border-gray-200/50">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    funroad
                                </h3>
                                <SparklesIcon className="absolute -top-1 -right-3 w-4 h-4 text-yellow-400 animate-pulse" />
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Empowering creators and entrepreneurs to build, sell, and scale their digital products with ease.
                        </p>
                        <div className="flex items-center gap-4">
                            <SocialLink href="#" icon={<TwitterIcon className="w-4 h-4" />} />
                            <SocialLink href="#" icon={<GithubIcon className="w-4 h-4" />} />
                            <SocialLink href="#" icon={<LinkedinIcon className="w-4 h-4" />} />
                            <SocialLink href="#" icon={<MailIcon className="w-4 h-4" />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-900">Product</h4>
                        <nav className="space-y-3">
                            <FooterLink href="/features">Features</FooterLink>
                            <FooterLink href="/pricing">Pricing</FooterLink>
                            <FooterLink href="/integrations">Integrations</FooterLink>
                            <FooterLink href="/api">API</FooterLink>
                        </nav>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-900">Company</h4>
                        <nav className="space-y-3">
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/careers">Careers</FooterLink>
                            <FooterLink href="/press">Press</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                        </nav>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-900">Support</h4>
                        <nav className="space-y-3">
                            <FooterLink href="/help">Help Center</FooterLink>
                            <FooterLink href="/docs">Documentation</FooterLink>
                            <FooterLink href="/status">Status</FooterLink>
                            <FooterLink href="/security">Security</FooterLink>
                        </nav>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-16 p-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-200/50">
                    <div className="text-center max-w-2xl mx-auto">
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">Stay in the loop</h4>
                        <p className="text-gray-600 mb-6">Get the latest updates, tips, and exclusive content delivered to your inbox.</p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                            />
                            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <span>© 2024 funroad, Inc. Made with</span>
                            <HeartIcon className="w-4 h-4 text-red-500 animate-pulse" />
                            <span>in San Francisco</span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                            <FooterLink href="/privacy" className="hover:text-indigo-600">Privacy Policy</FooterLink>
                            <FooterLink href="/terms" className="hover:text-indigo-600">Terms of Service</FooterLink>
                            <FooterLink href="/cookies" className="hover:text-indigo-600">Cookie Policy</FooterLink>
                        </div>

                        {/* Scroll to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                            aria-label="Scroll to top"
                        >
                            <ArrowUpIcon className="w-4 h-4 group-hover:animate-bounce" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Helper Components
const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
    <Link
        href={href}
        className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-indigo-500 hover:to-purple-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
    >
        <div className="group-hover:animate-pulse">
            {icon}
        </div>
    </Link>
);

const FooterLink = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
    <Link
        href={href}
        className={`text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium ${className}`}
    >
        {children}
    </Link>
);

export default Footer;