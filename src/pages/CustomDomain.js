import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe, Check, Copy, AlertCircle, Sparkles, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
export default function CustomDomain() {
    const [domain, setDomain] = useState("");
    const [connected, setConnected] = useState(false);
    const [checking, setChecking] = useState(false);
    const handleConnect = () => {
        if (!domain)
            return;
        setChecking(true);
        setTimeout(() => {
            setChecking(false);
            setConnected(true);
            toast.success("Domain connected successfully!");
        }, 2000);
    };
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", children: [_jsxs(Link, { to: createPageUrl("Dashboard"), className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back to Dashboard"] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-8", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center", children: _jsx(Globe, { className: "h-6 w-6 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Custom Domain" }), _jsx("p", { className: "text-sm text-gray-500", children: "Use your own domain for a professional look" })] })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "Connect your domain" }), _jsxs("div", { className: "flex gap-3", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Globe, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" }), _jsx(Input, { value: domain, onChange: (e) => setDomain(e.target.value), placeholder: "yourname.com", className: "pl-10 h-12 rounded-xl border-gray-200 text-base" })] }), _jsx(Button, { onClick: handleConnect, disabled: !domain || checking, className: "h-12 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white font-medium", children: checking ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }), "Checking..."] })) : ("Connect") })] }), connected && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "mt-4 flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200", children: [_jsx(Check, { className: "h-4 w-4 text-green-600" }), _jsx("span", { className: "text-sm text-green-700 font-medium", children: "Domain connected successfully!" })] }))] }), _jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-amber-500" }), _jsx("h2", { className: "font-semibold text-gray-900", children: "DNS Configuration" })] }), _jsx("p", { className: "text-sm text-gray-500 mb-5", children: "Add the following DNS records in your domain provider's settings:" }), _jsx("div", { className: "space-y-4", children: [
                                        { type: "CNAME", name: "www", value: "cname.linkfolio.me" },
                                        { type: "A", name: "@", value: "76.76.21.21" },
                                    ].map((record, i) => (_jsxs("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100", children: [_jsx("div", { className: "flex items-center gap-2 mb-3", children: _jsx(Badge, { variant: "outline", className: "text-xs font-mono", children: record.type }) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Name / Host" }), _jsxs("div", { className: "flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200", children: [_jsx("code", { className: "text-sm text-gray-700 font-mono flex-1", children: record.name }), _jsx("button", { onClick: () => copyText(record.name), className: "text-gray-400 hover:text-gray-600", children: _jsx(Copy, { className: "h-3.5 w-3.5" }) })] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Value / Target" }), _jsxs("div", { className: "flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200", children: [_jsx("code", { className: "text-sm text-gray-700 font-mono flex-1 truncate", children: record.value }), _jsx("button", { onClick: () => copyText(record.value), className: "text-gray-400 hover:text-gray-600 flex-shrink-0", children: _jsx(Copy, { className: "h-3.5 w-3.5" }) })] })] })] })] }, i))) })] }), _jsx("div", { className: "bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl p-6 border border-violet-100", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Sparkles, { className: "h-5 w-5 text-violet-500 mt-0.5" }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Need help?" }), _jsxs("p", { className: "text-sm text-gray-600 mt-1", children: ["DNS changes can take up to 48 hours to propagate. Check our", " ", _jsxs("a", { href: "#", className: "text-violet-600 hover:text-violet-700 font-medium inline-flex items-center gap-1", children: ["setup guide ", _jsx(ExternalLink, { className: "h-3 w-3" })] }), " ", "for step-by-step instructions."] })] })] }) })] })] }) }));
}
