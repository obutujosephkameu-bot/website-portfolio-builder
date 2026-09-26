import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { adminAuth, isOwner } from "@/lib/firebase-admin";

interface Ctx {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<Ctx | null>(null);

export const useAdminAuth = () => {
  const c = useContext(AdminAuthContext);
  if (!c) throw new Error("useAdminAuth must be inside AdminAuthProvider");
  return c;
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(adminAuth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(adminAuth, email, password);
    if (!isOwner(cred.user)) {
      await signOut(adminAuth);
      throw new Error("Access denied. This account is not authorized.");
    }
  };

  const logout = async () => { await signOut(adminAuth); };

  return (
    <AdminAuthContext.Provider value={{ user, loading, isAdmin: isOwner(user), login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
