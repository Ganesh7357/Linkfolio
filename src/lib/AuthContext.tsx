import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    User,
} from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-hot-toast";

interface AuthContextType {
    user: User | null;
    isLoadingAuth: boolean;
    login: (email: string, password: string) => Promise<any>;
    signup: (email: string, password: string) => Promise<any>;
    loginWithGoogle: () => Promise<any>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setIsLoadingAuth(false);
        });

        return () => unsub();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            console.log("Logging in with email: ", email);
            console.log("Logging in with password: ", password);
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            toast.error(error.message || "Failed to login");
            throw error;
        }
    };

    const signup = async (email: string, password: string) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            toast.error(error.message || "Failed to create account");
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            return await signInWithPopup(auth, provider);
        } catch (error: any) {
            toast.error(error.message || "Google sign-in failed");
            throw error;
        }
    };

    const logout = useCallback(async () => {
        try {
            await signOut(auth);
        } catch (error: any) {
            toast.error("Failed to logout");
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoadingAuth,
                login,
                signup,
                loginWithGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

