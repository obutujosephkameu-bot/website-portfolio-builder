import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { Tag, Clock } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  description?: string;
  image?: string;
  oldPrice?: string | number;
  newPrice?: string | number;
  discount?: string | number;
  status?: string;
  endDate?: any;
}

const OffersStrip = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const q = query(collection(adminDb, "offers"), where("status", "==", "active"));
    const unsub = onSnapshot(
      q,
      (snap) => setOffers(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))),
      () => setOffers([])
    );
    return () => unsub();
  }, []);

  if (!offers.length) return null;
  // Duplicate for seamless infinite marquee
  const loop = [...offers, ...offers];

  return (
    <section className="relative py-10 overflow-hidden bg-gradient-to-r from-primary/10 via-background to-secondary/10 border-y border-border">
      <div className="container mx-auto px-4 mb-4 flex items-center gap-2">
        <Tag className="w-5 h-5 text-secondary" />
        <h2 className="text-2xl font-bold text-foreground">Available Offers</h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex gap-5 animate-marquee whitespace-nowrap will-change-transform">
          {loop.map((o, i) => (
            <article
              key={`${o.id}-${i}`}
              className="inline-flex shrink-0 w-[320px] bg-card border border-border rounded-2xl p-4 shadow-lumex hover:shadow-lumex-lg transition gap-4 items-center"
            >
              {o.image ? (
                <img src={o.image} alt={o.title} className="w-20 h-20 rounded-xl object-cover" loading="lazy" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Tag className="w-8 h-8 text-white" />
                </div>
              )}
              <div className="flex-1 whitespace-normal">
                <h3 className="font-bold text-foreground line-clamp-1">{o.title}</h3>
                {o.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{o.description}</p>
                )}
                <div className="flex items-baseline gap-2 mt-1.5">
                  {o.newPrice != null && (
                    <span className="text-secondary font-bold">KES {o.newPrice}</span>
                  )}
                  {o.oldPrice != null && (
                    <span className="text-xs line-through text-muted-foreground">KES {o.oldPrice}</span>
                  )}
                  {o.discount != null && (
                    <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-bold">
                      -{o.discount}%
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lumex-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: lumex-marquee 32s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

export default OffersStrip;
