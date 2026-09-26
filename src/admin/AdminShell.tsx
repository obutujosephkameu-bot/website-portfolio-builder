import { ReactNode, useState } from "react";
import { useAdminAuth } from "./AdminAuthContext";
import { ADMIN_PATH } from "@/lib/firebase-admin";
import { useAdminPush } from "./useAdminPush";
import {
  LayoutDashboard, MessageSquare, Mail, Briefcase, Cpu, Smartphone,
  Tag, Settings, Search, Bell, ShieldCheck, LogOut, Menu, X, Sun, Moon,
} from "lucide-react";
import logo from "@/assets/lumex-x.png";

export type AdminSection =
  | "dashboard" | "messages" | "mail" | "businesses" | "software" | "apps"
  | "offers" | "website" | "seo" | "notifications" | "settings";

const NAV: { key: AdminSection; label: string; icon: any }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "messages", label: "LUMEX Messages", icon: MessageSquare },
  { key: "mail", label: "LUMEX X Mail", icon: Mail },
  { key: "businesses", label: "Businesses Built", icon: Briefcase },
  { key: "software", label: "Software Built", icon: Cpu },
  { key: "apps", label: "Apps Built", icon: Smartphone },
  { key: "offers", label: "Offers", icon: Tag },
  { key: "website", label: "Website Settings", icon: Settings },
  { key: "seo", label: "SEO Settings", icon: Search },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "settings", label: "Admin Settings", icon: ShieldCheck },
];

interface Props {
  active: AdminSection;
  onChange: (s: AdminSection) => void;
  children: ReactNode;
  newCount?: number;
}

const AdminShell = ({ active, onChange, children, newCount = 0 }: Props) => {
  const { user, logout } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  useAdminPush(true);

  const themeBg = dark ? "bg-[#0b1220] text-white" : "bg-slate-50 text-slate-900";
  const sideBg = dark ? "bg-[#111a2e] border-white/10" : "bg-white border-slate-200";
  const itemHover = dark ? "hover:bg-white/5" : "hover:bg-slate-100";

  return (
    <div className={`min-h-screen flex ${themeBg}`}>
      {/* Sidebar */}
      <aside className={`${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static z-30 inset-y-0 left-0 w-64 ${sideBg} border-r transition-transform`}>
        <div className="p-4 flex items-center gap-3 border-b border-inherit">
          <img src={logo} alt="" className="w-9 h-9" />
          <div>
            <div className="font-bold leading-tight">LUMEX</div>
            <div className="text-xs opacity-60 leading-tight">Admin Console</div>
          </div>
          <button className="md:hidden ml-auto" onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-2 space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            const isActive = active === n.key;
            return (
              <button
                key={n.key}
                onClick={() => { onChange(n.key); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive ? "bg-gradient-to-r from-amber-500/20 to-orange-600/20 text-amber-300 border border-amber-500/30"
                  : itemHover
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{n.label}</span>
                {n.key === "messages" && newCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {newCount > 99 ? "99+" : newCount}
                  </span>
                )}
              </button>
            );
          })}
          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 ${itemHover} mt-4`}
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className={`${sideBg} border-b px-4 py-3 flex items-center gap-3 sticky top-0 z-20`}>
          <button className="md:hidden" onClick={() => setOpen(true)}><Menu className="w-5 h-5" /></button>
          <h1 className="font-bold capitalize">{NAV.find((n) => n.key === active)?.label}</h1>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => setDark((d) => !d)} className={`p-2 rounded-lg ${itemHover}`} title="Theme">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="text-xs opacity-70 hidden sm:block">{user?.email}</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">{children}</main>
        <footer className="px-4 py-3 text-xs opacity-50 border-t border-inherit">
          {ADMIN_PATH} • Lumex Digital
        </footer>
      </div>

      {open && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setOpen(false)} />}
    </div>
  );
};

export default AdminShell;
