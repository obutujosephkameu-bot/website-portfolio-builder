import { useEffect, useState } from "react";
import { adminDb } from "@/lib/firebase-admin";
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save } from "lucide-react";

export interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea" | "url" | "number" | "date" | "select";
  options?: string[];
  placeholder?: string;
}

interface Props {
  collectionName: string;
  title: string;
  fields: Field[];
  /** Field shown as the row title */
  titleField?: string;
  /** Field shown as the row image */
  imageField?: string;
}

const CrudSection = ({ collectionName, title, fields, titleField = "name", imageField }: Props) => {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const baseRef = collection(adminDb, collectionName);
    let q: any;
    try { q = query(baseRef, orderBy("createdAt", "desc")); } catch { q = baseRef; }
    const unsub = onSnapshot(q,
      (snap: any) => setItems(snap.docs.map((d: any) => ({ id: d.id, ...d.data() }))),
      () => setItems([])
    );
    return () => unsub();
  }, [collectionName]);

  const startNew = () => {
    const empty: any = { visible: true };
    fields.forEach((f) => (empty[f.name] = ""));
    setEditing(empty);
    setOpen(true);
  };

  const save = async () => {
    if (!editing) return;
    const payload = { ...editing };
    delete payload.id;
    if (editing.id) {
      await updateDoc(doc(adminDb, collectionName, editing.id), {
        ...payload, updatedAt: serverTimestamp(),
      });
    } else {
      await addDoc(collection(adminDb, collectionName), {
        ...payload, createdAt: serverTimestamp(),
      });
    }
    setOpen(false);
    setEditing(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this item permanently?")) return;
    await deleteDoc(doc(adminDb, collectionName, id));
  };

  const toggleVisible = async (it: any) => {
    await updateDoc(doc(adminDb, collectionName, it.id), { visible: !it.visible });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{title} <span className="opacity-50 text-sm">({items.length})</span></h2>
        <button onClick={startNew} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold px-3 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <article key={it.id} className="bg-white/5 dark:bg-white/5 border border-white/10 rounded-xl p-4">
            {imageField && it[imageField] && (
              <img src={it[imageField]} alt="" className="w-full h-32 rounded-lg object-cover mb-3" loading="lazy" />
            )}
            <h3 className="font-bold truncate">{it[titleField] || "(untitled)"}</h3>
            <p className="text-xs opacity-60 line-clamp-2 mt-1 whitespace-pre-line">
              {it.description || it.message || ""}
            </p>
            <div className="flex items-center gap-1.5 mt-3">
              <button onClick={() => { setEditing(it); setOpen(true); }} className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 flex items-center gap-1">
                <Pencil className="w-3 h-3" /> Edit
              </button>
              <button onClick={() => toggleVisible(it)} className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 flex items-center gap-1">
                {it.visible === false ? <><EyeOff className="w-3 h-3" /> Hidden</> : <><Eye className="w-3 h-3" /> Visible</>}
              </button>
              <button onClick={() => remove(it.id)} className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 flex items-center gap-1 ml-auto">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <p className="opacity-50 text-sm col-span-full text-center py-8">No items yet. Click “Add” to create one.</p>
        )}
      </div>

      {open && editing && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start sm:items-center justify-center p-4 overflow-y-auto" onClick={() => setOpen(false)}>
          <div className="bg-[#111a2e] text-white border border-white/10 rounded-2xl p-6 w-full max-w-lg my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">{editing.id ? "Edit" : "New"} {title.replace(/s$/, "")}</h3>
              <button onClick={() => setOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="text-xs opacity-70">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      value={editing[f.name] || ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                      rows={4}
                      className="w-full mt-1 bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-amber-400"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={editing[f.name] || ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      className="w-full mt-1 bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2 outline-none"
                    >
                      <option value="">— Select —</option>
                      {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "url" ? "url" : "text"}
                      value={editing[f.name] || ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full mt-1 bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-amber-400"
                    />
                  )}
                </div>
              ))}
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.visible !== false} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} />
                Visible to public
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg bg-white/10 text-sm">Cancel</button>
              <button onClick={save} className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-sm font-semibold flex items-center gap-2">
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CrudSection;
