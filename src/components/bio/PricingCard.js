import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
export default function PricingCard({ plan, index }) {
    const isPopular = plan.popular;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1, duration: 0.5 }, className: `relative rounded-3xl p-8 transition-all duration-300 ${isPopular
            ? "bg-gradient-to-br from-violet-600 to-pink-500 text-white shadow-2xl shadow-violet-500/30 scale-105 z-10"
            : "bg-white border border-gray-200 hover:border-violet-200 hover:shadow-xl"}`, children: [isPopular && (_jsx(Badge, { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-4 py-1 rounded-full shadow-lg", children: "Most Popular" })), _jsx("h3", { className: `text-lg font-semibold ${isPopular ? "text-white" : "text-gray-900"}`, children: plan.name }), _jsxs("div", { className: "mt-4 mb-6", children: [_jsx("span", { className: `text-5xl font-bold tracking-tight ${isPopular ? "text-white" : "text-gray-900"}`, children: plan.price }), plan.period && (_jsxs("span", { className: `text-sm ml-1 ${isPopular ? "text-white/70" : "text-gray-500"}`, children: ["/", plan.period] }))] }), _jsx("p", { className: `text-sm mb-6 ${isPopular ? "text-white/80" : "text-gray-500"}`, children: plan.description }), _jsx(Link, { to: createPageUrl("Auth") + "?mode=signup", children: _jsx(Button, { className: `w-full rounded-full font-medium h-12 text-sm ${isPopular
                        ? "bg-white text-violet-700 hover:bg-gray-100 shadow-lg"
                        : "bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:from-violet-700 hover:to-pink-600 shadow-md shadow-violet-500/20"}`, children: plan.cta }) }), _jsx("ul", { className: "mt-8 space-y-3", children: plan.features.map((feature, i) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx("div", { className: `mt-0.5 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${isPopular ? "bg-white/20" : "bg-violet-100"}`, children: _jsx(Check, { className: `h-3 w-3 ${isPopular ? "text-white" : "text-violet-600"}` }) }), _jsx("span", { className: `text-sm ${isPopular ? "text-white/90" : "text-gray-600"}`, children: feature })] }, i))) })] }));
}
