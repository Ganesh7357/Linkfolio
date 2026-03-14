import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    ArrowLeft, Plus, Trash2, GripVertical, Save, Eye,
    Upload, Sun, Moon, Sparkles, Link2, Image
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { templates } from "../components/bio/templateData";
import BioPreview from "../components/bio/BioPreview";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const themeOptions = [
    { id: "light", label: "Light", icon: Sun, bgClass: "bg-gradient-to-b from-gray-50 to-white" },
    { id: "dark", label: "Dark", icon: Moon, bgClass: "bg-gradient-to-b from-gray-900 to-gray-800" },
    { id: "gradient", label: "Gradient", icon: Sparkles, bgClass: "bg-gradient-to-br from-violet-600 to-pink-500" },
];

export default function Editor() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get("template") || "minimal";

    const [loading, setLoading] = useState(true);
    const [avatarUploading, setAvatarUploading] = useState(false);
    const [template, setTemplate] = useState(templates.find(t => t.id === templateId) || templates[0]);
    const fileInputRef = useRef(null);

    const [profile, setProfile] = useState({
        name: "",
        username: "",
        bio: "",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        links: [],
    });

    const [theme, setTheme] = useState(template.theme === "dark" ? "dark" : "light");
    const [activeThemeBg, setActiveThemeBg] = useState(template.bgClass);

    // 🔥 Fetch Template from Firestore (Optional, fallback to local)
    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const docRef = doc(db, "templates", templateId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTemplate(prev => ({ ...prev, ...data, id: docSnap.id }));
                    setTheme(data.theme === "dark" ? "dark" : "light");
                    setActiveThemeBg(data.bgClass);
                }
            } catch (error) {
                console.error("Error fetching template:", error);
            }
        };
        fetchTemplate();
    }, [templateId]);

    // 🔥 Fetch User Profile from Firestore
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.profile) {
                        setProfile(data.profile);
                        if (data.profile.theme) setTheme(data.profile.theme);
                        if (data.profile.bgClass) setActiveThemeBg(data.profile.bgClass);
                    } else {
                        // Set some defaults if profile doesn't exist but user does
                        setProfile(prev => ({
                            ...prev,
                            name: user.displayName || "",
                            email: user.email || "",
                            avatar: user.photoURL || prev.avatar
                        }));
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    const currentTemplate = {
        ...template,
        theme,
        bgClass: activeThemeBg,
    };

    const updateField = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const addLink = () => {
        setProfile(prev => ({
            ...prev,
            links: [...prev.links, { id: Date.now().toString(), title: "", url: "" }],
        }));
    };

    const removeLink = (id) => {
        setProfile(prev => ({
            ...prev,
            links: prev.links.filter(l => l.id !== id),
        }));
    };

    const updateLink = (id, field, value) => {
        setProfile(prev => ({
            ...prev,
            links: prev.links.map(l => l.id === id ? { ...l, [field]: value } : l),
        }));
    };

    const handleSave = async () => {
        if (!user) {
            toast.error("You must be logged in to save");
            return;
        }
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                profile: {
                    ...profile,
                    theme,
                    bgClass: activeThemeBg,
                    updatedAt: new Date()
                }
            }, { merge: true });

            toast.success("Bio page saved successfully! 🚀");
            navigate(createPageUrl("CustomDomain"));
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Failed to save profile");
        }
    };

    const handleThemeChange = (t) => {
        setTheme(t.id === "gradient" ? "dark" : t.id);
        setActiveThemeBg(t.bgClass);
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!CLOUD_NAME || !UPLOAD_PRESET) {
            toast.error("Cloudinary is not configured. Check your .env file.");
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5 MB.");
            return;
        }

        setAvatarUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESET);
            formData.append("folder", "linkfolio/avatars");

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                { method: "POST", body: formData }
            );

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error?.message || "Upload failed");
            }

            const data = await res.json();
            updateField("avatar", data.secure_url);
            toast.success("Profile photo updated! 🎉");
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            toast.error(error.message || "Failed to upload image");
        } finally {
            setAvatarUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
                    <p className="text-gray-500 font-medium">Loading your editor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to={createPageUrl("Dashboard")}>
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="font-semibold text-gray-900 hidden sm:block">Edit Bio Page</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to={`/${profile.username}`}>
                            <Button variant="outline" size="sm" className="rounded-xl">
                                <Eye className="h-4 w-4 mr-1.5" /> Preview
                            </Button>
                        </Link>
                        <Button
                            size="sm"
                            className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white shadow-md"
                            onClick={handleSave}
                        >
                            <Save className="h-4 w-4 mr-1.5" /> Save
                        </Button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid lg:grid-cols-[1fr_380px] gap-8">
                    {/* Editor Panel */}
                    <div className="space-y-6">
                        {/* Profile Section */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
                                <Image className="h-4 w-4 text-violet-500" />
                                Profile
                            </h2>

                            <div className="flex items-center gap-5 mb-6">
                                <div className="relative">
                                    <img
                                        src={profile.avatar}
                                        alt="Avatar"
                                        className="h-20 w-20 rounded-2xl object-cover border-2 border-gray-100"
                                    />
                                    {/* Hidden file input */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        className="hidden"
                                        onChange={handleAvatarUpload}
                                    />
                                    <button
                                        type="button"
                                        disabled={avatarUploading}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg hover:bg-violet-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {avatarUploading
                                            ? <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            : <Upload className="h-3.5 w-3.5" />}
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-700">Profile Photo</p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {avatarUploading ? "Uploading…" : "Recommended: 400x400px, JPG or PNG"}
                                    </p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Display Name</Label>
                                    <Input
                                        value={profile.name}
                                        onChange={(e) => updateField("name", e.target.value)}
                                        className="mt-1.5 rounded-xl border-gray-200 h-11"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Username</Label>
                                    <div className="relative mt-1.5">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">@</span>
                                        <Input
                                            value={profile.username}
                                            onChange={(e) => updateField("username", e.target.value)}
                                            className="pl-8 rounded-xl border-gray-200 h-11"
                                            placeholder="username"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Label className="text-sm font-medium text-gray-700">Bio</Label>
                                <Textarea
                                    value={profile.bio}
                                    onChange={(e) => updateField("bio", e.target.value)}
                                    className="mt-1.5 rounded-xl border-gray-200 resize-none"
                                    rows={3}
                                    placeholder="Tell the world about yourself..."
                                />
                            </div>
                        </div>

                        {/* Links Section */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <Link2 className="h-4 w-4 text-violet-500" />
                                    Links
                                </h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addLink}
                                    className="rounded-xl text-xs"
                                >
                                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Link
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <AnimatePresence>
                                    {profile.links.map((link, i) => (
                                        <motion.div
                                            key={link.id}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
                                        >
                                            <div className="mt-2 cursor-grab text-gray-300 hover:text-gray-400">
                                                <GripVertical className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <Input
                                                    value={link.title}
                                                    onChange={(e) => updateLink(link.id, "title", e.target.value)}
                                                    placeholder="Link title"
                                                    className="rounded-lg border-gray-200 h-9 text-sm"
                                                />
                                                <Input
                                                    value={link.url}
                                                    onChange={(e) => updateLink(link.id, "url", e.target.value)}
                                                    placeholder="https://..."
                                                    className="rounded-lg border-gray-200 h-9 text-sm"
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeLink(link.id)}
                                                className="mt-2 p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {profile.links.length === 0 && (
                                <div className="text-center py-8 text-gray-400">
                                    <Link2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No links yet. Add your first link above.</p>
                                </div>
                            )}
                        </div>

                        {/* Theme */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-violet-500" />
                                Theme
                            </h2>
                            <div className="grid grid-cols-3 gap-3">
                                {themeOptions.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => handleThemeChange(t)}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${activeThemeBg === t.bgClass
                                            ? "border-violet-500 bg-violet-50"
                                            : "border-gray-100 hover:border-gray-200"
                                            }`}
                                    >
                                        <div className={`h-12 w-12 rounded-xl ${t.bgClass} shadow-inner`} />
                                        <span className="text-xs font-medium text-gray-700">{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className="hidden lg:block">
                        <div className="sticky top-24">
                            <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                                <div className="bg-gray-900 rounded-[2rem] overflow-hidden">
                                    <div className="h-6 flex items-center justify-center">
                                        <div className="h-4 w-24 bg-gray-800 rounded-full" />
                                    </div>
                                    <div className={`rounded-[1.5rem] overflow-hidden ${activeThemeBg} p-6 min-h-[550px] flex items-start justify-center`}>
                                        <BioPreview template={currentTemplate} profile={profile} />
                                    </div>
                                    <div className="h-4 flex items-center justify-center">
                                        <div className="h-1 w-32 bg-gray-800 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}