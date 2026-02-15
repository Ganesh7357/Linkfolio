import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./lib/firebase";

const templates = [
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean and simple. Perfect for professionals.",
        bgClass: "bg-gradient-to-b from-gray-50 to-white",
        theme: "light",
        premium: false,
        styles: { buttonStyle: "solid", borderRadius: "rounded-xl" },
        price: 0,
    },
    {
        id: "aurora",
        name: "Aurora",
        description: "Stunning gradient background for creators.",
        bgClass: "bg-gradient-to-br from-violet-600 via-purple-500 to-pink-500",
        theme: "dark",
        premium: true,
        styles: { buttonStyle: "soft", borderRadius: "rounded-2xl" },
        price: 499,
    },
    {
        id: "midnight",
        name: "Midnight",
        description: "Sleek dark theme with elegant contrast.",
        bgClass: "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900",
        theme: "dark",
        premium: false,
        styles: { buttonStyle: "outline", borderRadius: "rounded-xl" },
        price: 0,
    },
    {
        id: "sunset",
        name: "Sunset",
        description: "Warm tones inspired by golden hour.",
        bgClass: "bg-gradient-to-br from-orange-400 via-rose-400 to-pink-500",
        theme: "dark",
        premium: true,
        styles: { buttonStyle: "gradient", borderRadius: "rounded-full" },
        price: 499,
    },
    {
        id: "ocean",
        name: "Ocean",
        description: "Calming blue tones for a serene feel.",
        bgClass: "bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600",
        theme: "dark",
        premium: true,
        styles: { buttonStyle: "soft", borderRadius: "rounded-xl" },
        price: 699,
    },
    {
        id: "paper",
        name: "Paper",
        description: "Warm, elegant minimalism.",
        bgClass: "bg-gradient-to-b from-amber-50 to-orange-50",
        theme: "light",
        premium: false,
        styles: { buttonStyle: "outline", borderRadius: "rounded-2xl" },
        price: 0,
    },
];

export const seedTemplates = async () => {
    try {
        for (const template of templates) {
            await setDoc(doc(db, "templates", template.id), template);
        }

        console.log("Templates uploaded successfully 🔥");
    } catch (error) {
        console.error("Error seeding templates:", error);
    }
};
