import { useEffect, useState } from "react";
import { adminDb } from "@/lib/firebase-admin";
import {
  collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy, addDoc, serverTimestamp,
} from "firebase/firestore";
import { Mail, Phone, Trash2, Reply, Search, Archive, Send } from "lucide-react";

interface Msg {
  id: string;
  name?: string; email?: string; phone?: string; subject?: string; message?: string;
  status?: "new" | "read" | "replied" | "archived";
  createdAt?: any;
}

const MessagesSection = () => {
  const [items, setItems] = useState<Msg[]>([]);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied" | "archived">("all");
  const [search, setSearch] = useState("");
  const [reply, setReply] = useState<{ to: Msg; body: string } | null>(null);

  useEffect(() => {
    const q = query(collection(adminDb, "messages"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q,
      (s) => setItems(s.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))),
      () => setItems([]),
    );
    return () => unsub();
  }, []);

  const filtered = items.filter((m) => {
    if (filter !== "all" && (m.status || "new") !== filter) return false;
    if (search) {
      const t = search.toLowerCase();
      return [m.name, m.email, m.phone, m.subject, m.message].some((v) => (v || "").toLowerCase().includes(t));
    }
    return true;
  });

  const setStatus = (id: string, status: Msg["status"]) =>
    updateDoc(doc(adminDb, "messages", id), { status });
  const remove = (id: string) => confirm("Delete this message?") && deleteDoc(doc(adminDb, "messages", id));

  const sendReply = async () => {
    if (!reply) return;
    await addDoc(collection(adminDb, "mail"), {
      folder: "sent",
      to: reply.to.email,
      toName: reply.to.name,
      subject: "Re: " + (reply.to.subject || "Your inquiry"),
      body: reply.body,
      replyToId: reply.to.id,
      createdAt: serverTimestamp(),
    });
    await setStatus(reply.to.id, "replied");
    setReply(null);
    alert("Reply saved to LUMEX X Mail → Sent. (Configure email sending to deliver automatically.)");
  };

  return (
    <section>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-3 opacity-50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm outline-none"
          />
        </div>
        {(["all", "new", "read", "replied", "archived"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`text-xs px-3 py-2 rounded-lg capitalize ${filter === s ? "bg-amber-500 text-black font-semibold" : "bg-white/10"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((m) => (
          <article key={m.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="font-bold flex items-center gap-2">
                  {m.name || "Unknown"}
                  {(m.status || "new") === "new" && (
                    <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>
                  )}
                </div>
                <div className="text-xs opacity-70 flex flex-wrap gap-3 mt-1">
                  {m.email && <a href={`mailto:${m.email}`} className="flex items-center gap-1"><Mail className="w-3 h-3" />{m.email}</a>}
                  {m.phone && <a href={`tel:${m.phone}`} className="flex items-center gap-1"><Phone className="w-3 h-3" />{m.phone}</a>}
                </div>
              </div>
              <div className="text-xs opacity-50">{m.createdAt?.toDate?.()?.toLocaleString?.() || ""}</div>
            </div>
            {m.subject && <p className="text-sm font-semibold mt-2">{m.subject}</p>}
            <p className="text-sm opacity-80 mt-1 whitespace-pre-wrap">{m.message}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button onClick={() => { setStatus(m.id, "read"); setReply({ to: m, body: "" }); }}
                className="text-xs px-2.5 py-1.5 rounded bg-amber-500/20 text-amber-300 flex items-center gap-1">
                <Reply className="w-3 h-3" /> Reply
              </button>
              <button onClick={() => setStatus(m.id, "read")} className="text-xs px-2.5 py-1.5 rounded bg-white/10">Mark Read</button>
              <button onClick={() => setStatus(m.id, "archived")} className="text-xs px-2.5 py-1.5 rounded bg-white/10 flex items-center gap-1">
                <Archive className="w-3 h-3" /> Archive
              </button>
              <button onClick={() => remove(m.id)} className="text-xs px-2.5 py-1.5 rounded bg-red-500/20 text-red-300 ml-auto flex items-center gap-1">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <p className="opacity-50 text-center py-12 text-sm">No messages.</p>}
      </div>

      {reply && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setReply(null)}>
          <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold mb-3">Reply to {reply.to.name}</h3>
            <p className="text-xs opacity-60 mb-2">To: {reply.to.email}</p>
            <textarea
              value={reply.body}
              onChange={(e) => setReply({ ...reply, body: e.target.value })}
              rows={6}
              placeholder="Type your reply..."
              className="w-full bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2 outline-none"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setReply(null)} className="px-3 py-2 rounded-lg bg-white/10 text-sm">Cancel</button>
              <button onClick={sendReply} className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-sm font-semibold flex items-center gap-2">
                <Send className="w-4 h-4" /> Save Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MessagesSection;
