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
        pro: { name: "Pro Plan", price: "$5", period: "/month", description: "Everything you need to grow" },
        lifetime: { name: "Lifetime Plan", price: "$50", period: " one-time", description: "Pay once, own it forever" },
    };

    const details = planDetails[plan] || planDetails.pro;

    const handlePay = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            window.location.href = createPageUrl("Dashboard");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-lg mx-auto px-4 py-8">
                <Link to={createPageUrl("Dashboard")} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="bg-gradient-to-r from-violet-600 to-pink-500 p-6 text-white">
                            <h1 className="text-xl font-bold">Complete your purchase</h1>
                            <p className="text-sm text-white/80 mt-1">Upgrade to unlock premium features</p>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{details.name}</h3>
                                    <p className="text-sm text-gray-500 mt-0.5">{details.description}</p>
                                </div>
                                <Badge className="bg-violet-100 text-violet-700 border-0">
                                    {plan === "lifetime" ? "Best Value" : "Popular"}
                                </Badge>
                            </div>

                            <div className="py-4 space-y-3 border-b border-gray-100">
                                {[
                                    "Unlimited Bio Pages",
                                    "All Premium Templates",
                                    "Custom Domain Support",
                                    "Remove Branding",
                                    "Advanced Analytics",
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                            <Check className="h-3 w-3 text-green-600" />
                                        </div>
                                        <span className="text-sm text-gray-600">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                                <span className="text-sm text-gray-500">Total</span>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-gray-900">{details.price}</span>
                                    <span className="text-sm text-gray-500">{details.period}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Button */}
                        <div className="p-6 pt-0 space-y-4">
                            <Button
                                onClick={handlePay}
                                disabled={processing}
                                className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white text-base font-semibold shadow-lg shadow-violet-500/25 transition-all"
                            >
                                {processing ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    <>
                                        <CreditCard className="h-5 w-5 mr-2" />
                                        Pay {details.price}
                                    </>
                                )}
                            </Button>

                            {/* Razorpay badge */}
                            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Lock className="h-3 w-3" />
                                    <span>SSL Encrypted</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <Shield className="h-3 w-3" />
                                    <span>Powered by Razorpay</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                                <Shield className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Money-back guarantee</p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Not satisfied? Get a full refund within 14 days, no questions asked.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}