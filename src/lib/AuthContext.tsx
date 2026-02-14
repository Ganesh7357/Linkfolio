import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    User,
} from "firebase/auth";

import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
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

    // 🔥 Create Firestore User Document
    const createUserInFirestore = async (firebaseUser: User) => {
        if (!firebaseUser) return;

        try {
            const userRef = doc(db, "users", firebaseUser.uid);
            const userSnap = await getDoc(userRef);

            // Agar pehle se exist nahi karta
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || "",
                    displayName: firebaseUser.displayName || "",
                    photoURL: firebaseUser.photoURL || "",
                    role: "user",
                    createdAt: serverTimestamp(),
                });

                console.log("User document created in Firestore");
            }
        } catch (error) {
            console.error("Error creating user document:", error);
        }
    };

    // 🔥 Auth State Listener
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                await createUserInFirestore(firebaseUser);
            }

            setUser(firebaseUser);
            setIsLoadingAuth(false);
        });

        return () => unsub();
    }, []);

    // 🔥 Email Login
    const login = async (email: string, password: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful");
            return result;
        } catch (error: any) {
            toast.error(error.message || "Failed to login");
            throw error;
        }
    };

    // 🔥 Email Signup
    const signup = async (email: string, password: string) => {
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await createUserInFirestore(result.user);

            toast.success("Account created successfully");
            return result;
        } catch (error: any) {
            toast.error(error.message || "Failed to create account");
            throw error;
        }
    };

    // 🔥 Google Login
    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            await createUserInFirestore(result.user);

            toast.success("Google login successful");
            return result;
        } catch (error: any) {
            toast.error(error.message || "Google sign-in failed");
            throw error;
        }
    };

    // 🔥 Logout
    const logout = useCallback(async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully");
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

// 🔥 Custom Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
