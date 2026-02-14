import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const themeOptions = [
    { id: "light", label: "Light", icon: Sun, bgClass: "bg-gradient-to-b from-gray-50 to-white" },
    { id: "dark", label: "Dark", icon: Moon, bgClass: "bg-gradient-to-b from-gray-900 to-gray-800" },
    { id: "gradient", label: "Gradient", icon: Sparkles, bgClass: "bg-gradient-to-br from-violet-600 to-pink-500" },
];

export default function Editor() {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get("template") || "minimal";
    const selectedTemplate = templates.find(t => t.id === templateId) || templates[0];

    const [profile, setProfile] = useState({
        name: "Sarah Chen",
        username: "sarahchen",
        bio: "Designer & Creator ✨ Sharing tips on building your brand",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        links: [
            { id: "1", title: "My Portfolio", url: "https://sarahchen.com" },
            { id: "2", title: "YouTube Channel", url: "https://youtube.com/@sarahchen" },
            { id: "3", title: "Online Store", url: "https://store.sarahchen.com" },
        ],
    });

    const [theme, setTheme] = useState(selectedTemplate.theme === "dark" ? "dark" : "light");
    const [activeThemeBg, setActiveThemeBg] = useState(selectedTemplate.bgClass);

    const currentTemplate = {
        ...selectedTemplate,
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

    const handleSave = () => {
        toast.success("Bio page saved successfully!");
    };

    const handleThemeChange = (t) => {
        setTheme(t.id === "gradient" ? "dark" : t.id);
        setActiveThemeBg(t.bgClass);
    };

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
                        <Link to={createPageUrl("PublicBio") + `?username=${profile.username}`}>
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
                                    <button className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg hover:bg-violet-700 transition-colors">
                                        <Upload className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-700">Profile Photo</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Recommended: 400x400px, JPG or PNG</p>
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