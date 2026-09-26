import { useEffect, useState } from "react";
import { adminDb } from "@/lib/firebase-admin";
import {
  collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { Inbox, Send, FileText, Archive, Trash2, Plus, X } from "lucide-react";

type Folder = "inbox" | "sent" | "drafts" | "archived" | "trash";

const FOLDERS: { key: Folder; label: string; icon: any }[] = [
  { key: "inbox", label: "Inbox", icon: Inbox },
  { key: "sent", label: "Sent", icon: Send },
  { key: "drafts", label: "Drafts", icon: FileText },
  { key: "archived", label: "Archived", icon: Archive },
  { key: "trash", label: "Deleted", icon: Trash2 },
];

const MailSection = () => {
  const [folder, setFolder] = useState<Folder>("inbox");
  const [mails, setMails] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [composing, setComposing] = useState<any | null>(null);

  useEffect(() => {
    const u1 = onSnapshot(query(collection(adminDb, "mail"), orderBy("createdAt", "desc")),
      (s) => setMails(s.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))),
      () => setMails([]));
    const u2 = onSnapshot(query(collection(adminDb, "messages"), orderBy("createdAt", "desc")),
      (s) => setMessages(s.docs.map((d) => ({ id: d.id, ...(d.data() as any), folder: "inbox", isContactMsg: true }))),
      () => setMessages([]));
    return () => { u1(); u2(); };
  }, []);

  const all = [...messages, ...mails];
  const items = all.filter((m) => (m.folder || "inbox") === folder);

  const move = async (m: any, target: Folder) => {
    if (m.isContactMsg) return; // contact messages are managed in Messages section
    await updateDoc(doc(adminDb, "mail", m.id), { folder: target });
  };

  const sendCompose = async () => {
    if (!composing?.to) return;
    await addDoc(collection(adminDb, "mail"), {
      ...composing,
      folder: composing.draft ? "drafts" : "sent",
      createdAt: serverTimestamp(),
    });
    setComposing(null);
  };

  return (
    <section className="grid md:grid-cols-[200px,1fr] gap-4">
      <aside className="space-y-1">
        {FOLDERS.map((f) => {
          const Icon = f.icon;
          return (
            <button key={f.key} onClick={() => setFolder(f.key)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${folder === f.key ? "bg-amber-500/20 text-amber-300" : "hover:bg-white/5"}`}>
              <Icon className="w-4 h-4" /> {f.label}
            </button>
          );
        })}
        <button onClick={() => setComposing({ to: "", subject: "", body: "" })}
          className="w-full mt-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold py-2 rounded-lg flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> Compose
        </button>
      </aside>

      <div className="space-y-2">
        {items.map((m) => (
          <article key={m.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="flex justify-between text-xs opacity-70">
              <span>{m.isContactMsg ? `From: ${m.name} <${m.email}>` : (folder === "sent" ? `To: ${m.to}` : `From: ${m.from || m.email || "—"}`)}</span>
              <span>{m.createdAt?.toDate?.()?.toLocaleString?.() || ""}</span>
            </div>
            <h4 className="font-semibold mt-1">{m.subject || "(no subject)"}</h4>
            <p className="text-sm opacity-80 line-clamp-2 mt-1">{m.body || m.message}</p>
            {!m.isContactMsg && (
              <div className="flex gap-1.5 mt-2">
                {folder !== "archived" && <button onClick={() => move(m, "archived")} className="text-xs px-2 py-1 rounded bg-white/10">Archive</button>}
                {folder !== "trash" && <button onClick={() => move(m, "trash")} className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-300">Delete</button>}
                {folder === "trash" && <button onClick={() => deleteDoc(doc(adminDb, "mail", m.id))} className="text-xs px-2 py-1 rounded bg-red-500/30 text-red-200">Permanent</button>}
              </div>
            )}
          </article>
        ))}
        {items.length === 0 && <p className="opacity-50 text-center py-12 text-sm">No mail in {folder}.</p>}
      </div>

      {composing && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setComposing(null)}>
          <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">New Message</h3>
              <button onClick={() => setComposing(null)}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2">
              <input value={composing.to} onChange={(e) => setComposing({ ...composing, to: e.target.value })} placeholder="To (email)"
                className="w-full bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2 outline-none" />
              <input value={composing.subject || ""} onChange={(e) => setComposing({ ...composing, subject: e.target.value })} placeholder="Subject"
                className="w-full bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2 outline-none" />
              <textarea value={composing.body || ""} onChange={(e) => setComposing({ ...composing, body: e.target.value })} rows={6} placeholder="Message..."
                className="w-full bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2 outline-none" />
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => { setComposing({ ...composing, draft: true }); setTimeout(sendCompose, 0); }}
                className="px-3 py-2 rounded-lg bg-white/10 text-sm">Save Draft</button>
              <button onClick={() => { setComposing({ ...composing, draft: false }); setTimeout(sendCompose, 0); }}
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-sm font-semibold">Send</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MailSection;
