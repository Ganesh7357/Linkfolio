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
        if (!domain) return;
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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <Link to={createPageUrl("Dashboard")} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                            <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Custom Domain</h1>
                            <p className="text-sm text-gray-500">Use your own domain for a professional look</p>
                        </div>
                    </div>

                    {/* Domain Input */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
                        <h2 className="font-semibold text-gray-900 mb-4">Connect your domain</h2>
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    placeholder="yourname.com"
                                    className="pl-10 h-12 rounded-xl border-gray-200 text-base"
                                />
                            </div>
                            <Button
                                onClick={handleConnect}
                                disabled={!domain || checking}
                                className="h-12 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white font-medium"
                            >
                                {checking ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Checking...
                                    </div>
                                ) : (
                                    "Connect"
                                )}
                            </Button>
                        </div>
                        {connected && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200"
                            >
                                <Check className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-700 font-medium">Domain connected successfully!</span>
                            </motion.div>
                        )}
                    </div>

                    {/* DNS Instructions */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <h2 className="font-semibold text-gray-900">DNS Configuration</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-5">
                            Add the following DNS records in your domain provider's settings:
                        </p>

                        <div className="space-y-4">
                            {[
                                { type: "CNAME", name: "www", value: "cname.linkfolio.me" },
                                { type: "A", name: "@", value: "76.76.21.21" },
                            ].map((record, i) => (
                                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Badge variant="outline" className="text-xs font-mono">{record.type}</Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">Name / Host</p>
                                            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                                                <code className="text-sm text-gray-700 font-mono flex-1">{record.name}</code>
                                                <button onClick={() => copyText(record.name)} className="text-gray-400 hover:text-gray-600">
                                                    <Copy className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">Value / Target</p>
                                            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                                                <code className="text-sm text-gray-700 font-mono flex-1 truncate">{record.value}</code>
                                                <button onClick={() => copyText(record.value)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                                                    <Copy className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Help Box */}
                    <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl p-6 border border-violet-100">
                        <div className="flex items-start gap-3">
                            <Sparkles className="h-5 w-5 text-violet-500 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-gray-900">Need help?</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    DNS changes can take up to 48 hours to propagate. Check our{" "}
                                    <a href="#" className="text-violet-600 hover:text-violet-700 font-medium inline-flex items-center gap-1">
                                        setup guide <ExternalLink className="h-3 w-3" />
                                    </a>{" "}
                                    for step-by-step instructions.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}