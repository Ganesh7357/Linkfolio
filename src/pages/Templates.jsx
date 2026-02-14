import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion } from "framer-motion";
import Navbar from "../components/bio/Navbar";
import Footer from "../components/bio/Footer";
import TemplateCard from "../components/bio/TemplateCard";
import { templates } from "../components/bio/templateData";

export default function Templates() {
    const navigate = useNavigate();

    const handleSelect = (template) => {
        navigate(createPageUrl("Editor") + `?template=${template.id}`);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-14"
                >
                    <p className="text-sm font-semibold text-violet-600 mb-3 tracking-wide uppercase">Templates</p>
                    <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
                        Pick your perfect look
                    </h1>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Choose from our curated collection of beautiful templates.
                        Each one is fully customizable.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {templates.map((template, i) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            index={i}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}