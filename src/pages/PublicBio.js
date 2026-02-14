import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
const dummyProfiles = {
    sarahchen: {
        name: "Sarah Chen",
        bio: "Designer & Creator ✨ Sharing tips on building your brand",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
        theme: "dark",
        bgClass: "bg-gradient-to-br from-violet-600 via-purple-500 to-pink-500",
        links: [
            { title: "My Portfolio", url: "#", emoji: "🎨" },
            { title: "YouTube Channel", url: "#", emoji: "📺" },
            { title: "Online Store", url: "#", emoji: "🛍️" },
            { title: "Book a Call", url: "#", emoji: "📞" },
            { title: "Newsletter", url: "#", emoji: "📧" },
        ],
    },
    sarahphotos: {
        name: "Sarah Photos",
        bio: "Capturing moments, one frame at a time 📸",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
        theme: "dark",
        bgClass: "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900",
        links: [
            { title: "Photo Gallery", url: "#", emoji: "📷" },
            { title: "Instagram", url: "#", emoji: "📱" },
            { title: "Prints Store", url: "#", emoji: "🖼️" },
        ],
    },
};
export default function PublicBio() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username") || "sarahchen";
    const profile = dummyProfiles[username] || dummyProfiles.sarahchen;
    const isDark = profile.theme === "dark";
    return (_jsx("div", { className: `min-h-screen ${profile.bgClass} flex items-center justify-center p-4`, children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 }, className: "w-full max-w-md py-12", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "flex flex-col items-center text-center", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: profile.avatar, alt: profile.name, className: "h-24 w-24 rounded-full object-cover ring-4 ring-white/20 shadow-2xl" }), _jsx("div", { className: "absolute -bottom-1 -right-1 h-7 w-7 bg-green-400 rounded-full border-4 border-violet-600" })] }), _jsx("h1", { className: `text-2xl font-bold mt-5 ${isDark ? "text-white" : "text-gray-900"}`, children: profile.name }), _jsx("p", { className: `text-sm mt-1.5 max-w-xs ${isDark ? "text-white/70" : "text-gray-500"}`, children: profile.bio })] }), _jsx("div", { className: "mt-8 space-y-3 px-4", children: profile.links.map((link, i) => (_jsxs(motion.a, { href: link.url, initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 + i * 0.08 }, onClick: (e) => e.preventDefault(), className: `group flex items-center justify-between w-full py-4 px-5 rounded-2xl font-medium text-sm transition-all duration-300 ${isDark
                            ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10"
                            : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm hover:shadow-md"}`, children: [_jsxs("span", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-lg", children: link.emoji }), link.title] }), _jsx(ExternalLink, { className: `h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? "text-white/50" : "text-gray-400"}` })] }, i))) }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.6 }, className: "mt-12 text-center", children: _jsxs("a", { href: "#", onClick: (e) => e.preventDefault(), className: `inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full transition-colors ${isDark
                            ? "text-white/40 hover:text-white/60 bg-white/5 hover:bg-white/10"
                            : "text-gray-400 hover:text-gray-500 bg-gray-100 hover:bg-gray-200"}`, children: [_jsx(Sparkles, { className: "h-3 w-3" }), "Powered by Linkfolio"] }) })] }) }));
}
