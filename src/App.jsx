import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Toaster as HotToaster } from "react-hot-toast";

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
    <Layout currentPageName={currentPageName}>{children}</Layout>
    : <>{children}</>;

// Define which pages should be protected
const PROTECTED_PAGES = ["Dashboard", "Templates", "Editor", "Payment", "CustomDomain"];

function AppContent() {
    return (
        <Routes>
            <Route path="/" element={
                <LayoutWrapper currentPageName={mainPageKey}>
                    {mainPageKey === "Landing" ? <Pages.Landing /> : <Pages.Auth />}
                </LayoutWrapper>
            } />

            {Object.entries(Pages).map(([path, Page]) => {
                const isProtected = PROTECTED_PAGES.includes(path);

                const element = (
                    <LayoutWrapper currentPageName={path}>
                        <Page />
                    </LayoutWrapper>
                );

                return (
                    <Route
                        key={path}
                        path={`/${path}`}
                        element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
                    />
                );
            })}

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClientInstance}>
                <Router>
                    <NavigationTracker />
                    <AppContent />
                </Router>
                <Toaster />
                <HotToaster position="top-center" />
            </QueryClientProvider>
        </AuthProvider>
    )
}

export default App
