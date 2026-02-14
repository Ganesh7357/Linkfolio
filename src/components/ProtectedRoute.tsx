import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { createPageUrl } from "@/utils/index";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoadingAuth } = useAuth();
    const location = useLocation();

    if (isLoadingAuth) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-violet-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        // Redirect to login but save the current location they were trying to go to
        return <Navigate to={createPageUrl("Auth")} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};
