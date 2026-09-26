import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Item {
  title: string;
  desc: string;
  to: string;
  external?: boolean;
  keywords: string;
}

const INDEX: Item[] = [
  { title: "Website Development", desc: "Custom websites, e-commerce, landing pages", to: "/website-development", keywords: "website web design html landing ecommerce shop store" },
  { title: "App Development", desc: "Android & iOS mobile apps", to: "/app-development", keywords: "app mobile android ios iphone play store apk" },
  { title: "Software Development", desc: "Custom business software & systems", to: "/software-development", keywords: "software system custom erp crm" },
  { title: "Buy Software / Systems", desc: "School, HR, POS, hospital systems ready to deploy", to: "/software-products", keywords: "buy software download school hr payroll pos hospital pharmacy clinic system management" },
  { title: "Cyber Security", desc: "Website security, recovery, VPN, antivirus", to: "/cybersecurity", keywords: "cyber security hack recover vpn antivirus pentest 2fa breach firewall" },
  { title: "IT & Computer Services", desc: "Repairs, networking, CCTV, support", to: "/it-services", keywords: "it computer repair laptop pc network wifi cctv installation support" },
  { title: "Pricing & Packages", desc: "All package prices and what's included", to: "/pricing-packages", keywords: "price pricing cost package quote how much" },
  { title: "Portfolio", desc: "Websites & apps we've built", to: "/portfolio", keywords: "portfolio clients customers projects work showcase websites" },
  { title: "About Lumex Digital", desc: "Who we are, mission, team", to: "/about", keywords: "about lumex digital company who founder team history" },
  { title: "Contact Us", desc: "Phone, WhatsApp, email, location", to: "/contact", keywords: "contact phone whatsapp email address location reach call number 0706387820" },
  { title: "Lumex Team", desc: "Meet our team", to: "/lumex-team", keywords: "team members staff people" },
  { title: "Join Us / Careers", desc: "Work with Lumex", to: "/join-us", keywords: "career job hire join intern partner work" },
  { title: "Buy Domain & Hosting", desc: "hosting.lumexdigital.co.ke — domains from KES 463", to: "https://hosting.lumexdigital.co.ke/", external: true, keywords: "domain hosting buy host cpanel ssl email .co.ke .com register transfer" },
  { title: "School Management Software", desc: "Demo: schoolsoftware.lumexdigital.co.ke", to: "https://schoolsoftware.lumexdigital.co.ke/", external: true, keywords: "school software student management fees attendance exam parent sms" },
];

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);

  const results = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return INDEX.slice(0, 8);
    return INDEX.filter((it) =>
      it.title.toLowerCase().includes(s) ||
      it.desc.toLowerCase().includes(s) ||
      it.keywords.toLowerCase().includes(s)
    );
  }, [q]);

  const go = (it: Item) => {
    setOpen(false);
    setQ("");
    if (it.external) window.open(it.to, "_blank", "noopener");
    else navigate(it.to);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 bg-muted/60 hover:bg-muted text-foreground/70 hover:text-foreground rounded-full px-3 py-1.5 text-sm border border-border transition-colors"
        aria-label="Search services"
      >
        <Search className="w-4 h-4" />
        <span>Search services...</span>
        <kbd className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-background border border-border">⌘K</kbd>
      </button>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-foreground/80"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-foreground/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-2 p-3 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search Lumex services, software, contact..."
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                <button onClick={() => setOpen(false)} aria-label="Close"><X className="w-4 h-4" /></button>
              </div>
              <ul className="max-h-[60vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <li className="text-sm text-muted-foreground px-4 py-6 text-center">
                    No matches. Try "website", "domain", "school software" or "contact".
                  </li>
                )}
                {results.map((it) => (
                  <li key={it.title}>
                    <button
                      onClick={() => go(it)}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-primary/10 transition-colors"
                    >
                      <div className="font-semibold text-sm text-foreground">{it.title}</div>
                      <div className="text-xs text-muted-foreground">{it.desc}</div>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="px-3 py-2 border-t border-border text-[11px] text-muted-foreground flex justify-between">
                <span>Press Enter to open • Esc to close</span>
                <Link to="/contact" onClick={() => setOpen(false)} className="text-primary font-semibold">Contact us →</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchButton;
