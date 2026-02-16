import React, { useState, useEffect } from "react";
import { ExternalLink, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function PublicBio() {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!username) {
                setError("No username provided");
                setLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, "users"),
                    where("profile.username", "==", username),
                    limit(1)
                );

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    setProfile(userData.profile);
                } else {
                    setError("User not found");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Something went wrong while fetching the profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-10 w-10 text-violet-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center max-w-sm">
                    <div className="bg-red-50 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="h-8 w-8 text-red-500 opacity-20" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{error || "User Not Found"}</h2>
                    <p className="text-gray-500 mb-6">The bio page you're looking for doesn't exist or has been moved.</p>
                    <a href="/" className="inline-flex items-center justify-center px-6 py-2 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors">
                        Back to Home
                    </a>
                </div>
            </div>
        );
    }

    const isDark = profile.theme === "dark";

    return (
        <div className={`min-h-screen ${profile.bgClass || 'bg-white'} flex items-center justify-center p-4`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md py-12"
            >
                {/* Avatar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative">
                        <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="h-24 w-24 rounded-full object-cover ring-4 ring-white/20 shadow-2xl"
                        />
                        <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-green-400 rounded-full border-4 border-violet-600" />
                    </div>

                    <h1 className={`text-2xl font-bold mt-5 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {profile.name}
                    </h1>
                    <p className={`text-sm mt-1.5 max-w-xs ${isDark ? "text-white/70" : "text-gray-500"}`}>
                        {profile.bio}
                    </p>
                </motion.div>

                {/* Links */}
                <div className="mt-8 space-y-3 px-4">
                    {profile.links && profile.links.map((link, i) => (
                        <motion.a
                            key={link.id || i}
                            href={link.url}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.08 }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex items-center justify-between w-full py-4 px-5 rounded-2xl font-medium text-sm transition-all duration-300 ${isDark
                                ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10"
                                : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm hover:shadow-md"
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                {link.emoji && <span className="text-lg">{link.emoji}</span>}
                                {link.title}
                            </span>
                            <ExternalLink className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? "text-white/50" : "text-gray-400"
                                }`} />
                        </motion.a>
                    ))}
                </div>

                {/* Branding */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <a
                        href="/"
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full transition-colors ${isDark
                            ? "text-white/40 hover:text-white/60 bg-white/5 hover:bg-white/10"
                            : "text-gray-400 hover:text-gray-500 bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        <Sparkles className="h-3 w-3" />
                        Powered by Linkfolio
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}
