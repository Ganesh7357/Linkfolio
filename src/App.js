import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import NavigationTracker from '@/lib/NavigationTracker';
import { pagesConfig } from './pages.config';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : _jsx(_Fragment, {});
const LayoutWrapper = ({ children, currentPageName }) => Layout ?
    _jsx(Layout, { currentPageName: currentPageName, children: children })
    : _jsx(_Fragment, { children: children });
const AuthenticatedApp = () => {
    const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
    // Show loading spinner while checking app public settings or auth
    if (isLoadingPublicSettings || isLoadingAuth) {
        return (_jsx("div", { className: "fixed inset-0 flex items-center justify-center", children: _jsx("div", { className: "w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" }) }));
    }
    // Handle authentication errors
    if (authError) {
        if (authError.type === 'user_not_registered') {
            return _jsx(UserNotRegisteredError, {});
        }
        else if (authError.type === 'auth_required') {
            // Redirect to login automatically
            navigateToLogin();
            return null;
        }
    }
    // Render the main app
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LayoutWrapper, { currentPageName: mainPageKey, children: _jsx(MainPage, {}) }) }), Object.entries(Pages).map(([path, Page]) => (_jsx(Route, { path: `/${path}`, element: _jsx(LayoutWrapper, { currentPageName: path, children: _jsx(Page, {}) }) }, path))), _jsx(Route, { path: "*", element: _jsx(PageNotFound, {}) })] }));
};
function App() {
    return (_jsx(AuthProvider, { children: _jsxs(QueryClientProvider, { client: queryClientInstance, children: [_jsxs(Router, { children: [_jsx(NavigationTracker, {}), _jsx(AuthenticatedApp, {})] }), _jsx(Toaster, {})] }) }));
}
export default App;
