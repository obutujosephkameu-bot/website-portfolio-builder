import { useEffect, useState } from "react";
import { adminDb } from "@/lib/firebase-admin";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { MessageSquare, Mail, Briefcase, Cpu, Smartphone, Tag, Bell, Plus } from "lucide-react";

interface Props { onJump: (s: any) => void; }

const Stat = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-xs opacity-70">{label}</div>
  </div>
);

const DashboardSection = ({ onJump }: Props) => {
  const [counts, setCounts] = useState({ msgs: 0, newMsgs: 0, biz: 0, sw: 0, apps: 0, offers: 0 });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    const subs = [
      onSnapshot(collection(adminDb, "messages"), (s) => {
        const all = s.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        setCounts((c) => ({
          ...c, msgs: all.length,
          newMsgs: all.filter((m: any) => (m.status || "new") === "new").length,
        }));
        setRecent(all.slice(0, 5));
      }, () => {}),
      onSnapshot(collection(adminDb, "businesses"), (s) => setCounts((c) => ({ ...c, biz: s.size })), () => {}),
      onSnapshot(collection(adminDb, "software"), (s) => setCounts((c) => ({ ...c, sw: s.size })), () => {}),
      onSnapshot(collection(adminDb, "apps"), (s) => setCounts((c) => ({ ...c, apps: s.size })), () => {}),
      onSnapshot(query(collection(adminDb, "offers"), where("status", "==", "active")),
        (s) => setCounts((c) => ({ ...c, offers: s.size })), () => {}),
    ];
    return () => subs.forEach((u) => u());
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat icon={MessageSquare} label="Total Messages" value={counts.msgs} color="bg-blue-500/30 text-blue-300" />
        <Stat icon={Bell} label="New / Unread" value={counts.newMsgs} color="bg-red-500/30 text-red-300" />
        <Stat icon={Briefcase} label="Businesses Built" value={counts.biz} color="bg-emerald-500/30 text-emerald-300" />
        <Stat icon={Cpu} label="Software Built" value={counts.sw} color="bg-purple-500/30 text-purple-300" />
        <Stat icon={Smartphone} label="Apps Built" value={counts.apps} color="bg-amber-500/30 text-amber-300" />
        <Stat icon={Tag} label="Active Offers" value={counts.offers} color="bg-orange-500/30 text-orange-300" />
        <Stat icon={Mail} label="Mail Folder" value="X-Mail" color="bg-cyan-500/30 text-cyan-300" />
        <Stat icon={Bell} label="Notifications"
          value={typeof Notification !== "undefined" && Notification.permission === "granted" ? "ON" : "OFF"}
          color="bg-green-500/30 text-green-300" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="font-bold mb-3">Recent Client Messages</h3>
          <ul className="space-y-2">
            {recent.length === 0 && <li className="text-sm opacity-50">No messages yet.</li>}
            {recent.map((m) => (
              <li key={m.id} className="text-sm border-b border-white/5 pb-2">
                <div className="font-semibold">{m.name || "Unknown"}</div>
                <div className="text-xs opacity-60 line-clamp-1">{m.message}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="font-bold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: "offers", l: "Add Offer" },
              { k: "apps", l: "Add App" },
              { k: "software", l: "Add Software" },
              { k: "businesses", l: "Add Business" },
            ].map((q) => (
              <button key={q.k} onClick={() => onJump(q.k)}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5">
                <Plus className="w-4 h-4" /> {q.l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
