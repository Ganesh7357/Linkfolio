import React from "react";
import { ExternalLink } from "lucide-react";

const defaultProfile = {
    name: "Sarah Chen",
    username: "@sarahchen",
    bio: "Designer & Creator ✨ Sharing tips on building your brand",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    links: [
        { title: "My Portfolio", url: "#" },
        { title: "YouTube Channel", url: "#" },
        { title: "Online Store", url: "#" },
        { title: "Book a Call", url: "#" },
    ],
};

export default function BioPreview({ template, mini = false, profile = null }) {
    const p = profile || defaultProfile;
    const styles = template?.styles || {};
    const theme = template?.theme || "light";

    const getButtonStyle = () => {
        if (styles.buttonStyle === "outline") {
            return `border-2 ${theme === "dark" ? "border-white/30 text-white hover:bg-white/10" : "border-gray-800 text-gray-800 hover:bg-gray-100"}`;
        }
        if (styles.buttonStyle === "gradient") {
            return "bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:from-violet-600 hover:to-pink-600";
        }
        if (styles.buttonStyle === "soft") {
            return `${theme === "dark" ? "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`;
        }
        return `${theme === "dark" ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"}`;
    };

    const getTextColor = () => theme === "dark" ? "text-white" : "text-gray-900";
    const getSubTextColor = () => theme === "dark" ? "text-white/70" : "text-gray-500";
    const borderRadius = styles.borderRadius || "rounded-xl";

    return (
        <div className={`flex flex-col items-center text-center ${mini ? "scale-90" : ""}`}>
            <img
                src={p.avatar}
                alt={p.name}
                className={`${mini ? "h-14 w-14" : "h-20 w-20"} rounded-full object-cover ring-4 ${theme === "dark" ? "ring-white/20" : "ring-gray-200"
                    } shadow-lg`}
            />
            <h2 className={`${mini ? "text-sm mt-2" : "text-lg mt-4"} font-bold ${getTextColor()}`}>
                {p.name}
            </h2>
            <p className={`${mini ? "text-[10px] mt-0.5" : "text-sm mt-1"} ${getSubTextColor()}`}>
                {p.bio}
            </p>
            <div className={`w-full ${mini ? "mt-3 space-y-1.5" : "mt-6 space-y-3"}`}>
                {p.links.map((link, i) => (
                    <a
                        key={i}
                        href={link.url}
                        className={`block w-full ${mini ? "py-1.5 text-[10px]" : "py-3 text-sm"} font-medium ${borderRadius} transition-all duration-200 ${getButtonStyle()}`}
                        onClick={(e) => e.preventDefault()}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {link.title}
                            {!mini && <ExternalLink className="h-3 w-3 opacity-50" />}
                        </span>
                    </a>
                ))}
            </div>
            {!mini && (
                <p className={`mt-6 text-xs ${getSubTextColor()} flex items-center gap-1`}>
                    Powered by <span className="font-semibold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">Linkfolio</span>
                </p>
            )}
        </div>
    );
}