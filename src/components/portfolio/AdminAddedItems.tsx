import { useEffect, useState } from "react";
import { adminDb } from "@/lib/firebase-admin";
import { collection, onSnapshot } from "firebase/firestore";
import { ExternalLink } from "lucide-react";

/** Shows items added from the Lumex Admin panel ("businesses" = websites, "software" = software). */
interface Props {
  collectionName: "businesses" | "software";
  dark?: boolean;
}

const AdminAddedItems = ({ collectionName, dark }: Props) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(adminDb, collectionName),
      (snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((d: any) => d.visible !== false)),
      () => setItems([])
    );
    return () => unsub();
  }, [collectionName]);

  if (!items.length) return null;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {items.map((it) => {
        const url = it.website || it.demoUrl || "";
        const img = it.logo || it.image;
        return (
          <a
            key={it.id}
            href={url || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`group lumex-card-glow rounded-2xl backdrop-blur border p-6 flex flex-col items-center text-center ${dark ? "bg-background/10 border-background/20" : "bg-card/60 border-border"}`}
          >
            {img && (
              <div className="w-full h-32 flex items-center justify-center mb-4 bg-background/60 rounded-xl">
                <img src={img} alt={`${it.name} logo`} className="max-h-24 w-auto object-contain" loading="lazy" />
              </div>
            )}
            {it.category && <div className="text-xs uppercase tracking-wider text-secondary font-semibold">{it.category}</div>}
            <h3 className={`text-lg font-bold mt-1 ${dark ? "text-background" : "text-foreground"}`}>{it.name}</h3>
            {it.description && <p className={`text-sm mt-2 ${dark ? "text-background/70" : "text-muted-foreground"}`}>{it.description}</p>}
            {url && (
              <span className="mt-3 inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
                {url.replace(/^https?:\/\//, "")} <ExternalLink className="w-3.5 h-3.5" />
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
};

export default AdminAddedItems;
