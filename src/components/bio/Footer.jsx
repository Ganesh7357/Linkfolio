import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Sparkles, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">Linkfolio</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                            The modern link-in-bio platform for creators, influencers, and brands.
                        </p>
                        <div className="flex gap-3 mt-5">
                            {[Twitter, Instagram, Github].map((Icon, i) => (
                                <a key={i} href="#" className="h-9 w-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to={createPageUrl("Templates")} className="hover:text-white transition-colors">Templates</Link></li>
                            <li><Link to={createPageUrl("Landing")} className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs">&copy; 2026 Linkfolio. All rights reserved.</p>
                    <p className="text-xs">Made with ♥ for creators everywhere</p>
                </div>
            </div>
        </footer>
    );
}