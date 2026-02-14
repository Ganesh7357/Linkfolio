import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import { auth } from "./firebase";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [authError, setAuthError] = useState(null);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setIsLoadingAuth(false);
        });
        return () => unsub();
    }, []);
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
    const logout = () => signOut(auth);
    return (_jsx(AuthContext.Provider, { value: {
            user,
            isLoadingAuth,
            authError,
            login,
            signup,
            loginWithGoogle,
            logout,
        }, children: children }));
};
export const useAuth = () => useContext(AuthContext);
