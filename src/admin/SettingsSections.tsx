import { useState } from "react";
import { useAdminAuth } from "./AdminAuthContext";
import { adminAuth, ADMIN_UID, ADMIN_EMAIL } from "@/lib/firebase-admin";
import { updateProfile, updatePassword } from "firebase/auth";
import { Bell, Send, ShieldCheck, KeyRound } from "lucide-react";

export const NotificationsSection = () => {
  const [perm, setPerm] = useState(typeof Notification !== "undefined" ? Notification.permission : "default");

  const enable = async () => {
    const p = await Notification.requestPermission();
    setPerm(p);
  };
  const test = () => {
    if (Notification.permission === "granted") {
      new Notification("New Lumex Message", { body: "A new client message has been received.", icon: "/lumex-admin-icon.png" });
    } else { alert("Enable notifications first."); }
  };

  return (
    <section className="max-w-xl space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="font-bold flex items-center gap-2"><Bell className="w-4 h-4" /> Desktop Notifications</h3>
        <p className="text-sm opacity-70 mt-1">Status: <span className="font-semibold">{perm}</span></p>
        <div className="flex gap-2 mt-3">
          <button onClick={enable} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-2 rounded-lg text-sm font-semibold">
            {perm === "granted" ? "Re-check permission" : "Enable Notifications"}
          </button>
          <button onClick={test} className="bg-white/10 px-3 py-2 rounded-lg text-sm flex items-center gap-1">
            <Send className="w-4 h-4" /> Test
          </button>
        </div>
      </div>
      <p className="text-xs opacity-60">
        Push delivery uses Firebase Cloud Messaging. To send pushes from the server when a new message arrives,
        deploy a Firestore-triggered Cloud Function that sends FCM to the token saved in <code>notificationTokens/{ADMIN_UID}</code>.
      </p>
    </section>
  );
};

export const AdminSettingsSection = () => {
  const { user } = useAdminAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const saveName = async () => {
    if (!adminAuth.currentUser) return;
    await updateProfile(adminAuth.currentUser, { displayName: name });
    setMsg("Display name updated.");
  };
  const changePwd = async () => {
    if (!adminAuth.currentUser || !pwd) return;
    try {
      await updatePassword(adminAuth.currentUser, pwd);
      setPwd(""); setMsg("Password updated.");
    } catch (e: any) {
      setMsg(e?.message || "Could not update password. You may need to log in again first.");
    }
  };

  return (
    <section className="max-w-xl space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="font-bold flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Identity</h3>
        <div className="text-sm opacity-80 mt-2 space-y-1">
          <div>Email: <span className="font-mono">{ADMIN_EMAIL}</span></div>
          <div className="break-all">UID: <span className="font-mono text-xs">{ADMIN_UID}</span></div>
          <div>Logged in as: <span className="font-mono text-xs">{user?.email}</span></div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="font-bold mb-2">Display Name</h3>
        <input value={name} onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2 outline-none" />
        <button onClick={saveName} className="mt-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-2 rounded-lg text-sm font-semibold">Save</button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="font-bold flex items-center gap-2"><KeyRound className="w-4 h-4" /> Change Password</h3>
        <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="New password"
          className="w-full mt-2 bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2 outline-none" />
        <button onClick={changePwd} className="mt-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-2 rounded-lg text-sm font-semibold">Update Password</button>
      </div>

      {msg && <p className="text-sm text-amber-300">{msg}</p>}
    </section>
  );
};
