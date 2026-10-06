import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  RecaptchaVerifier,
  PhoneAuthProvider,
  linkWithCredential,
  reauthenticateWithCredential,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type UserRole = "main_admin" | "sales_admin" | "member";

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  phoneVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshRole: () => Promise<void>;
  setPhoneVerified: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

const MAIN_ADMIN_EMAIL = "info@lumexdigital.co.ke";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const fetchRole = async (u: User) => {
    try {
      const userDoc = await getDoc(doc(db, "users", u.uid));
      if (userDoc.exists()) {
        setRole(userDoc.data().role as UserRole);
      } else {
        const assignedRole: UserRole = u.email === MAIN_ADMIN_EMAIL ? "main_admin" : "member";
        await setDoc(doc(db, "users", u.uid), {
          email: u.email,
          displayName: u.displayName || "",
          role: assignedRole,
          createdAt: new Date().toISOString(),
        });
        setRole(assignedRole);
      }
    } catch (err) {
      console.error("Error fetching role:", err);
      setRole(u.email === MAIN_ADMIN_EMAIL ? "main_admin" : "member");
    }
  };

  const refreshRole = async () => {
    if (user) await fetchRole(user);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        await fetchRole(u);
        // Phone verification is NOT auto-granted on auth state change
        // User must verify phone each session
        setPhoneVerified(false);
      } else {
        setRole(null);
        setPhoneVerified(false);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    setPhoneVerified(false);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setRole(null);
    setPhoneVerified(false);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, phoneVerified, setPhoneVerified, login, logout, refreshRole }}>
      {children}
    </AuthContext.Provider>
  );
};
