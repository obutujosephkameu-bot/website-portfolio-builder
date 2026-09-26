import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, ShieldCheck, User } from "lucide-react";
import type { UserRole } from "@/contexts/AuthContext";

interface UserDoc {
  id: string;
  email: string;
  displayName: string;
  phone?: string;
  role: UserRole;
  createdAt?: string;
}

interface UsersTabProps {
  onRefresh?: () => void;
}

const UsersTab = ({ onRefresh }: UsersTabProps) => {
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "users"));
    setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserDoc)));
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const changeRole = async (userId: string, newRole: UserRole) => {
    await updateDoc(doc(db, "users", userId), { role: newRole });
    fetchUsers();
  };

  const roleIcon = (role: UserRole) => {
    if (role === "main_admin") return <ShieldCheck className="w-4 h-4 text-red-500" />;
    if (role === "sales_admin") return <Shield className="w-4 h-4 text-blue-500" />;
    return <User className="w-4 h-4 text-muted-foreground" />;
  };

  const roleBadgeClass = (role: UserRole) => {
    if (role === "main_admin") return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";
    if (role === "sales_admin") return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400";
    return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  };

  if (loading) return <p className="text-center py-8 text-muted-foreground">Loading users...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <span className="text-sm text-muted-foreground">{users.length} registered users</span>
      </div>

      {users.map((u) => (
        <Card key={u.id}>
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {roleIcon(u.role)}
              <div>
                <p className="font-medium">{u.displayName || "Unnamed"}</p>
                <p className="text-sm text-muted-foreground">{u.email}</p>
                {u.phone && <p className="text-xs text-muted-foreground">{u.phone}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${roleBadgeClass(u.role)}`}>
                {u.role}
              </span>
              <Select value={u.role} onValueChange={(v) => changeRole(u.id, v as UserRole)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="sales_admin">Sales Admin</SelectItem>
                  <SelectItem value="main_admin">Main Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      ))}

      {users.length === 0 && <p className="text-muted-foreground text-center py-8">No users found.</p>}
    </div>
  );
};

export default UsersTab;
