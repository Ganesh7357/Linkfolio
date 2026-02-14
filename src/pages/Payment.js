import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Check, CreditCard, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/bio/Navbar";
export default function Payment() {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get("plan") || "pro";
    const [processing, setProcessing] = useState(false);
    const planDetails = {
        pro: { name: "Pro Plan", price: "₹299", period: "/month", description: "Everything you need to grow" },
        lifetime: { name: "Lifetime Plan", price: "₹2,999", period: " one-time", description: "Pay once, own it forever" },
    };
    const details = planDetails[plan] || planDetails.pro;
    const handlePay = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            window.location.href = createPageUrl("Dashboard");
        }, 2000);
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "max-w-lg mx-auto px-4 py-8", children: [_jsxs(Link, { to: createPageUrl("Dashboard"), className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back to Dashboard"] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: _jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm", children: [_jsxs("div", { className: "bg-gradient-to-r from-violet-600 to-pink-500 p-6 text-white", children: [_jsx("h1", { className: "text-xl font-bold", children: "Complete your purchase" }), _jsx("p", { className: "text-sm text-white/80 mt-1", children: "Upgrade to unlock premium features" })] }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-gray-100", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: details.name }), _jsx("p", { className: "text-sm text-gray-500 mt-0.5", children: details.description })] }), _jsx(Badge, { className: "bg-violet-100 text-violet-700 border-0", children: plan === "lifetime" ? "Best Value" : "Popular" })] }), _jsx("div", { className: "py-4 space-y-3 border-b border-gray-100", children: [
                                            "Unlimited Bio Pages",
                                            "All Premium Templates",
                                            "Custom Domain Support",
                                            "Remove Branding",
                                            "Advanced Analytics",
                                        ].map((feature, i) => (_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("div", { className: "h-5 w-5 rounded-full bg-green-100 flex items-center justify-center", children: _jsx(Check, { className: "h-3 w-3 text-green-600" }) }), _jsx("span", { className: "text-sm text-gray-600", children: feature })] }, i))) }), _jsxs("div", { className: "pt-4 flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-500", children: "Total" }), _jsxs("div", { className: "text-right", children: [_jsx("span", { className: "text-3xl font-bold text-gray-900", children: details.price }), _jsx("span", { className: "text-sm text-gray-500", children: details.period })] })] })] }), _jsxs("div", { className: "p-6 pt-0 space-y-4", children: [_jsx(Button, { onClick: handlePay, disabled: processing, className: "w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white text-base font-semibold shadow-lg shadow-violet-500/25 transition-all", children: processing ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }), "Processing..."] })) : (_jsxs(_Fragment, { children: [_jsx(CreditCard, { className: "h-5 w-5 mr-2" }), "Pay ", details.price] })) }), _jsxs("div", { className: "flex items-center justify-center gap-4 text-xs text-gray-400", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Lock, { className: "h-3 w-3" }), _jsx("span", { children: "SSL Encrypted" })] }), _jsx("span", { children: "\u2022" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Shield, { className: "h-3 w-3" }), _jsx("span", { children: "Powered by Razorpay" })] })] }), _jsxs("div", { className: "bg-gray-50 rounded-xl p-4 flex items-start gap-3", children: [_jsx(Shield, { className: "h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-700", children: "Money-back guarantee" }), _jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Not satisfied? Get a full refund within 14 days, no questions asked." })] })] })] })] }) })] }) }));
}
