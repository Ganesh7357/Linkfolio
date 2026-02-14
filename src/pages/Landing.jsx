import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Link2, Palette, BarChart3, Globe, Zap, Shield,
    ArrowRight, ChevronRight, Star
} from "lucide-react";
import Navbar from "../components/bio/Navbar";
import Footer from "../components/bio/Footer";
import PricingCard from "../components/bio/PricingCard";
import { plans } from "../components/bio/templateData";

const features = [
    { icon: Link2, title: "Unlimited Links", desc: "Add as many links as you want. No restrictions." },
    { icon: Palette, title: "Beautiful Templates", desc: "Professionally designed themes that stand out." },
    { icon: BarChart3, title: "Smart Analytics", desc: "Track every click, view, and interaction." },
    { icon: Globe, title: "Custom Domain", desc: "Use your own domain for a professional look." },
    { icon: Zap, title: "Lightning Fast", desc: "Pages load instantly for the best experience." },
    { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security for your data." },
];

export default function Landing() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar transparent />

            {/* Hero */}
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-violet-50/80 via-pink-50/40 to-white" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-violet-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
                            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-medium text-gray-700">Trusted by 50,000+ creators</span>
                        </div>

                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 leading-[0.95]">
                            One Link.
                            <br />
                            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                                All Your Content.
                            </span>
                        </h1>

                        <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Create a stunning bio page in minutes. Share everything you create,
                            curate, and sell — from a single link.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to={createPageUrl("Auth") + "?mode=signup"}>
                                <Button className="h-14 px-8 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white text-base font-medium shadow-xl shadow-violet-500/30 transition-all hover:scale-105">
                                    Get Started — It's Free
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link to={createPageUrl("Templates")}>
                                <Button variant="outline" className="h-14 px-8 rounded-full text-base font-medium border-gray-300 hover:border-violet-300 hover:bg-violet-50 transition-all">
                                    View Templates
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-16 sm:mt-20 max-w-4xl mx-auto"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-pink-500 rounded-[2rem] blur-2xl opacity-20" />
                            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                                <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                                    <div className="flex-1 text-center">
                                        <div className="inline-flex bg-gray-100 rounded-md px-3 py-0.5 text-xs text-gray-400">
                                            linkfolio.me/sarahchen
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-violet-600 via-purple-500 to-pink-500 p-8 sm:p-12">
                                    <div className="flex flex-col items-center text-center max-w-xs mx-auto">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                                            alt="Profile"
                                            className="h-20 w-20 rounded-full object-cover ring-4 ring-white/20 shadow-xl"
                                        />
                                        <h3 className="text-lg font-bold text-white mt-4">Sarah Chen</h3>
                                        <p className="text-sm text-white/70 mt-1">Designer & Creator ✨</p>
                                        <div className="w-full mt-6 space-y-3">
                                            {["My Portfolio", "YouTube Channel", "Online Store"].map((text, i) => (
                                                <div key={i} className="w-full py-3 rounded-2xl bg-white/15 backdrop-blur-sm text-white text-sm font-medium">
                                                    {text}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <p className="text-sm font-semibold text-violet-600 mb-3 tracking-wide uppercase">Features</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything you need to grow</h2>
                            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                                Powerful features to help you create, customize, and track your bio page.
                            </p>
                        </motion.div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="h-6 w-6 text-violet-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <p className="text-sm font-semibold text-violet-600 mb-3 tracking-wide uppercase">Pricing</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Simple, transparent pricing</h2>
                            <p className="mt-4 text-lg text-gray-500">Start free. Upgrade when you're ready.</p>
                        </motion.div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
                        {plans.map((plan, i) => (
                            <PricingCard key={i} plan={plan} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-500" />
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRWMGgySDB2MmgzNHYzMmgyem0wLTJIMnYtMmgzMnYyem0yLTJIMnYtMmgzNHYyem0wLTJIMnYtMmgzNHYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
                        <div className="relative text-center px-6 py-16 sm:px-12 sm:py-20">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                Ready to stand out?
                            </h2>
                            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                                Join thousands of creators who trust Linkfolio to share their world.
                            </p>
                            <Link to={createPageUrl("Auth") + "?mode=signup"}>
                                <Button className="mt-8 h-14 px-10 rounded-full bg-white text-violet-700 hover:bg-gray-100 text-base font-semibold shadow-xl transition-all hover:scale-105">
                                    Create Your Page Now
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}