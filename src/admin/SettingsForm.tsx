import { useEffect, useState } from "react";
import { adminDb } from "@/lib/firebase-admin";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Save } from "lucide-react";

interface Props {
  docId: string;
  title: string;
  fields: { name: string; label: string; type?: "text" | "textarea" | "url" | "email" }[];
}

const SettingsForm = ({ docId, title, fields }: Props) => {
  const [data, setData] = useState<any>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getDoc(doc(adminDb, "settings", docId)).then((s) => {
      if (s.exists()) setData(s.data());
    }).catch(() => {});
  }, [docId]);

  const save = async () => {
    await setDoc(doc(adminDb, "settings", docId), { ...data, updatedAt: serverTimestamp() }, { merge: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="max-w-2xl">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="text-xs opacity-70">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                value={data[f.name] || ""} rows={4}
                onChange={(e) => setData({ ...data, [f.name]: e.target.value })}
                className="w-full mt-1 bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2 outline-none"
              />
            ) : (
              <input
                type={f.type || "text"}
                value={data[f.name] || ""}
                onChange={(e) => setData({ ...data, [f.name]: e.target.value })}
                className="w-full mt-1 bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2 outline-none"
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={save}
        className="mt-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
        <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save Changes"}
      </button>
    </section>
  );
};

export default SettingsForm;
