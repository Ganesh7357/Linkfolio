import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ transparent = false, showAuth = true }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent ? "bg-transparent" : "bg-white/80 backdrop-blur-xl border-b border-gray-100"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to={createPageUrl("Landing")} className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-transparent">
                            Linkfolio
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to={createPageUrl("Templates")} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            Templates
                        </Link>
                        <Link to={createPageUrl("Landing") + "?section=pricing"} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            Pricing
                        </Link>
                        <Link to={createPageUrl("Landing") + "?section=features"} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            Features
                        </Link>
                    </div>

                    {showAuth && (
                        <div className="hidden md:flex items-center gap-3">
                            <Link to={createPageUrl("Auth")}>
                                <Button variant="ghost" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Log in
                                </Button>
                            </Link>
                            <Link to={createPageUrl("Auth") + "?mode=signup"}>
                                <Button className="bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white rounded-full px-6 text-sm font-medium shadow-lg shadow-violet-500/25">
                                    Get Started Free
                                </Button>
                            </Link>
                        </div>
                    )}

                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-3">
                            <Link to={createPageUrl("Templates")} className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                                Templates
                            </Link>
                            <Link to={createPageUrl("Landing") + "?section=pricing"} className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                                Pricing
                            </Link>
                            <Link to={createPageUrl("Landing") + "?section=features"} className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                                Features
                            </Link>
                            <hr className="border-gray-100" />
                            <Link to={createPageUrl("Auth")} className="block">
                                <Button variant="outline" className="w-full rounded-full">Log in</Button>
                            </Link>
                            <Link to={createPageUrl("Auth") + "?mode=signup"} className="block">
                                <Button className="w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-full">
                                    Get Started Free
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}