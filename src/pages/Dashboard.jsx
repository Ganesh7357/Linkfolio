import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Plus, Eye, Pencil, Trash2, ExternalLink, BarChart3,
    MousePointer2, Calendar, MoreVertical, Sparkles, Search,
    Globe, Settings, LogOut, Bell
} from "lucide-react";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { dummyBioPages, templates } from "../components/bio/templateData";
import { format } from "date-fns";

export default function Dashboard() {
    const [pages, setPages] = useState(dummyBioPages);
    const [search, setSearch] = useState("");

    const filteredPages = pages.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.username.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        setPages(pages.filter(p => p.id !== id));
    };

    const getTemplateBg = (templateId) => {
        return templates.find(t => t.id === templateId)?.bgClass || "bg-gray-100";
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Sidebar (desktop) */}
            <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 z-40">
                <div className="p-5 border-b border-gray-100">
                    <Link to={createPageUrl("Landing")} className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-transparent">
                            Linkfolio
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {[
                        { icon: BarChart3, label: "Dashboard", page: "Dashboard", active: true },
                        { icon: Globe, label: "Templates", page: "Templates" },
                        { icon: Globe, label: "Custom Domain", page: "CustomDomain" },
                        { icon: Settings, label: "Settings", page: "Dashboard" },
                    ].map((item, i) => (
                        <Link
                            key={i}
                            to={createPageUrl(item.page)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${item.active
                                ? "bg-violet-50 text-violet-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                            alt="Avatar"
                            className="h-9 w-9 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Sarah Chen</p>
                            <p className="text-xs text-gray-500 truncate">sarah@example.com</p>
                        </div>
                        <Link to={createPageUrl("Landing")}>
                            <LogOut className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="lg:pl-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="lg:hidden flex items-center gap-2">
                            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-transparent">
                                Linkfolio
                            </span>
                        </div>
                        <div className="hidden lg:block">
                            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                                <Bell className="h-5 w-5 text-gray-500" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-pink-500 rounded-full" />
                            </button>
                            <div className="lg:hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                                    alt="Avatar"
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="px-4 sm:px-6 lg:px-8 py-8">
                    {/* Welcome */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Good afternoon, Sarah 👋
                        </h2>
                        <p className="text-gray-500 mt-1">Here's an overview of your bio pages.</p>
                    </motion.div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Total Views", value: "2,531", icon: Eye, color: "from-violet-500 to-purple-500" },
                            { label: "Total Clicks", value: "699", icon: MousePointer2, color: "from-pink-500 to-rose-500" },
                            { label: "Bio Pages", value: "3", icon: Globe, color: "from-blue-500 to-cyan-500" },
                            { label: "Click Rate", value: "27.6%", icon: BarChart3, color: "from-amber-500 to-orange-500" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
                            >
                                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                    <stat.icon className="h-5 w-5 text-white" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Actions Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search pages..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 h-10 rounded-xl border-gray-200"
                            />
                        </div>
                        <Link to={createPageUrl("Templates")}>
                            <Button className="bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white rounded-xl h-10 px-5 shadow-lg shadow-violet-500/20">
                                <Plus className="h-4 w-4 mr-2" />
                                Create New Page
                            </Button>
                        </Link>
                    </div>

                    {/* Bio Pages Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <AnimatePresence>
                            {filteredPages.map((page, i) => (
                                <motion.div
                                    key={page.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className={`h-28 ${getTemplateBg(page.template)} relative`}>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="flex flex-col items-center">
                                                <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm" />
                                                <div className="mt-2 h-2 w-16 rounded-full bg-white/30" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{page.name}</h3>
                                                <p className="text-sm text-gray-500 mt-0.5">linkfolio.me/{page.username}</p>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl">
                                                    <Link to={createPageUrl("Editor") + `?id=${page.id}`}>
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <Pencil className="h-4 w-4 mr-2" /> Edit
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <Link to={createPageUrl("PublicBio") + `?username=${page.username}`}>
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <ExternalLink className="h-4 w-4 mr-2" /> View Page
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer text-red-600 focus:text-red-600"
                                                        onClick={() => handleDelete(page.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                <Eye className="h-3.5 w-3.5" />
                                                <span>{page.views.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                <MousePointer2 className="h-3.5 w-3.5" />
                                                <span>{page.clicks.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm text-gray-500 ml-auto">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{format(new Date(page.createdAt), "MMM d")}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <Link to={createPageUrl("Editor") + `?id=${page.id}`} className="flex-1">
                                                <Button variant="outline" size="sm" className="w-full rounded-xl text-xs h-9">
                                                    <Pencil className="h-3 w-3 mr-1.5" /> Edit
                                                </Button>
                                            </Link>
                                            <Link to={createPageUrl("PublicBio") + `?username=${page.username}`} className="flex-1">
                                                <Button size="sm" className="w-full rounded-xl text-xs h-9 bg-violet-600 hover:bg-violet-700 text-white">
                                                    <Eye className="h-3 w-3 mr-1.5" /> View
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredPages.length === 0 && (
                        <div className="text-center py-16">
                            <div className="h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                <Globe className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900">No pages found</h3>
                            <p className="text-sm text-gray-500 mt-1">Create your first bio page to get started.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}