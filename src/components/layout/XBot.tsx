import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X as CloseIcon, Send } from "lucide-react";
import xLogo from "@/assets/lumex-x.png";

const QUICK = [
 "What services do you offer?",
 "How much does a website cost?",
 "Do you build mobile apps?",
 "Buy a domain",
 "School software",
 "HR software",
 "Cyber security",
 "Talk to a human",
];

// Deep knowledge base — handles partial / fuzzy queries about Lumex.
const KB: { match: (t: string) => boolean; reply: string }[] = [
 // Identity
 { match: (t) => /\b(who|what)\s+(is|are)\s+(lumex|rumex|limex)/.test(t) || /about\s+lumex/.test(t),
 reply: "Lumex Digital is a Kenyan technology company (founded 2020) building websites, mobile apps, business software, and cyber-security solutions. We've served 300+ clients across Kenya & Africa." },

 // Contacts
 { match: (t) => /(contact|phone|call|number|reach|whatsapp|email|address|location|where)/.test(t),
 reply: " Call/WhatsApp: 0706 387 820 • info@lumexdigital.co.ke / support@lumexdigital.co.ke • Nairobi, Kenya — serving all 47 counties & Africa. Mon–Sat 8am–6pm EAT." },

 // Pricing — websites
 { match: (t) => /(website|site|web).*(price|cost|how much|charge|package|quote)/.test(t) || /(price|cost).*(website|site)/.test(t),
 reply: "Websites: Basic from KES 14,400 • Standard KES 25,000 • Business KES 45,000 • E-commerce KES 65,000+. Every package includes free hosting (3-12 months), free SSL, and free domain on annual plans." },

 // Apps
 { match: (t) => /(app|mobile|android|ios|iphone|play store)/.test(t),
 reply: "Mobile apps (Android + iOS) start at KES 60,000. Includes a FREE companion website, FREE domain, FREE SSL and 2 months free support. We also publish to Google Play & App Store on your behalf." },

 // Software / Systems
 { match: (t) => /(school|sms|student|class).*(software|system|management)/.test(t) || /school software/.test(t),
 reply: "School Management System — fees, students, exams, attendance, parents portal, SMS. Demo: https://schoolsoftware.lumexdigital.co.ke/ — Call 0706 387 820 to deploy yours." },
 { match: (t) => /(hr|human resource|payroll|employee|staff).*(software|system)/.test(t) || /hr software/.test(t),
 reply: "HR & Payroll Management System — staff records, leave, payroll, NHIF/NSSF/PAYE, performance. Demo available. Call 0706 387 820 for pricing & deployment." },
 { match: (t) => /(pos|point of sale|inventory|stock|shop|retail).*(software|system)/.test(t),
 reply: "We build POS, inventory & shop management systems with M-Pesa, barcode and receipt printer support. Call 0706 387 820 for a demo." },
 { match: (t) => /(hospital|clinic|pharmacy|medical|health).*(software|system)/.test(t),
 reply: "Hospital / clinic / pharmacy management software — patients, appointments, prescriptions, billing, lab. Custom-built for your facility." },
 { match: (t) => /(software|system).*(buy|download|product|sell)/.test(t) || /buy software/.test(t) || /download software/.test(t),
 reply: "Browse ready software: /software-products — School, HR, POS, Hospital and more. Or call 0706 387 820." },

 // Domain / hosting
 { match: (t) => /(domain|hosting|host|website hosting|.co.ke|cpanel|email hosting)/.test(t),
 reply: "Domains & hosting at https://hosting.lumexdigital.co.ke/ • .co.ke from KES 463/yr • .com from KES 1,500/yr • Hosting from KES 2,500/yr with free SSL, cPanel, email accounts and daily backups." },

 // Cyber security
 { match: (t) => /(cyber|security|hack|virus|antivirus|vpn|recover|firewall|pentest|penetration|breach|2fa|account hacked|facebook hack|whatsapp hack|instagram hack)/.test(t),
 reply: "Cyber Security — website hardening, hacked-account recovery (FB/IG/Gmail/WhatsApp), VPN deployment, antivirus, network security, penetration testing & 24/7 monitoring. Visit /cybersecurity or call 0706 387 820." },

 // SEO / marketing
 { match: (t) => /(seo|google|rank|marketing|ads|google ads|facebook ads|tiktok|social media)/.test(t),
 reply: "SEO & Digital Marketing — Google Business Profile, local SEO, Google Ads, Meta Ads, TikTok Ads, content & social media management. Packages from KES 8,000/month." },

 // Branding
 { match: (t) => /(brand|logo|design|flyer|poster|t.?shirt|mug|business card|sticker)/.test(t),
 reply: "Branding & print: logos, flyers, posters, business cards, T-shirts, mugs, banners, hoodies, caps. Logo design from KES 3,500." },

 // IT services
 { match: (t) => /(it support|computer|laptop|repair|network|wifi|cctv|installation)/.test(t),
 reply: "IT & Computer Services — laptop/PC repairs, networking, Wi-Fi setup, CCTV installation, software setup, on-site & remote support. Call 0706 387 820." },

 // Payment / process
 { match: (t) => /(pay|payment|deposit|installment|m.?pesa|paypal|how to pay)/.test(t),
 reply: "Payment: 50% deposit to start, 50% on delivery. We accept M-Pesa (Till), Bank Transfer, PayPal & Card. Larger projects can be milestone-based." },
 { match: (t) => /(how long|duration|deliver|time|days|weeks)/.test(t),
 reply: "Delivery: Basic site 3-5 days • Standard 1-2 weeks • E-commerce/Custom 2-6 weeks. We always send a written timeline before starting." },
 { match: (t) => /(support|maintenance|after sales|warranty)/.test(t),
 reply: "Every package includes free support (1-12 months). Beyond that, monthly maintenance from KES 2,500." },

 // Portfolio / clients
 { match: (t) => /(portfolio|clients|customers|who.*work|websites.*made|projects)/.test(t),
 reply: "Some clients: Shani School, TopTank, Kibatia Advocates, Rosben Accounting, Arizona International College, Patrina Homes, Greenfield Real Estate. See /portfolio." },

 // Careers / join
 { match: (t) => /(job|career|hire|join|intern|work with|partner)/.test(t),
 reply: "We hire developers, designers, marketers and sales partners. Apply at /join-us or email careers@lumexdigital.co.ke." },

 // Greetings
 { match: (t) => /^(hi|hello|hey|habari|niaje|sasa|mambo|good (morning|afternoon|evening))/.test(t),
 reply: "Hello! I'm X — Lumex's assistant. Ask me about websites, apps, software, domains, cyber-security or pricing." },
 { match: (t) => /(thank|thanks|asante)/.test(t),
 reply: "You're welcome! Anything else I can help with?" },
 { match: (t) => /(human|agent|talk|person|sales)/.test(t),
 reply: "Sure! Tap the green WhatsApp button or call 0706 387 820 to speak with a human now." },

 // Services overview
 { match: (t) => /(service|what.*offer|what.*do|do you|provide)/.test(t),
 reply: "We offer: Website Development, Mobile App Development, Software Development, Cyber Security, IT & Computer Services, Branding, SEO & Digital Marketing, Domains & Hosting." },
];

const reply = (q: string) => {
 const t = q.toLowerCase().trim();
 for (const k of KB) if (k.match(t)) return k.reply;
 return "Thanks! For a quick answer, WhatsApp us at 0706 387 820, email info@lumexdigital.co.ke, or visit /contact. You can also ask me about websites, apps, software, domains, hosting, cyber-security or pricing.";
};

const XBot = () => {
 const [open, setOpen] = useState(false);
 const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
 { role: "bot", text: "Hi, I'm X — Lumex's assistant. Ask me anything about Lumex Digital: websites, apps, software, domains, hosting, cyber-security or pricing." },
 ]);
 const [input, setInput] = useState("");

 const send = (text: string) => {
 if (!text.trim()) return;
 setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: reply(text) }]);
 setInput("");
 };

 return (
 <>
 <motion.button
 onClick={() => setOpen((o) => !o)}
 className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-foreground border border-secondary/40 flex items-center justify-center shadow-lumex-lg"
 whileHover={{ scale: 1.1 }}
 whileTap={{ scale: 0.95 }}
 animate={{ y: [0, -6, 0] }}
 transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
 aria-label="Open chat"
 >
 <img src={xLogo} alt="X" className="w-9 h-9" loading="lazy" decoding="async" />
 </motion.button>

 <AnimatePresence>
 {open && (
 <motion.div
 initial={{ opacity: 0, y: 30, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 30, scale: 0.95 }}
 className="fixed bottom-24 left-6 z-50 w-[340px] max-w-[92vw] h-[480px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
 >
 <div className="bg-foreground text-background p-4 flex items-center gap-3">
 <img src={xLogo} alt="X" className="w-9 h-9" loading="lazy" decoding="async" />
 <div>
 <div className="font-bold">X — Lumex Assistant</div>
 <div className="text-xs text-secondary">Online • Knows everything Lumex</div>
 </div>
 <button onClick={() => setOpen(false)} className="ml-auto"><CloseIcon className="w-4 h-4" /></button>
 </div>
 <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-muted/30">
 {messages.map((m, i) => (
 <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
 <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border rounded-bl-sm"}`}>
 {m.text}
 </div>
 </div>
 ))}
 <div className="pt-2 flex flex-wrap gap-1.5">
 {QUICK.map((q) => (
 <button key={q} onClick={() => send(q)} className="text-xs bg-secondary/10 text-secondary border border-secondary/30 rounded-full px-2.5 py-1 hover:bg-secondary/20">
 {q}
 </button>
 ))}
 </div>
 </div>
 <form
 onSubmit={(e) => { e.preventDefault(); send(input); }}
 className="p-2 border-t border-border flex gap-2"
 >
 <input
 value={input}
 onChange={(e) => setInput(e.target.value)}
 placeholder="Ask anything about Lumex..."
 className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
 />
 <button type="submit" className="bg-primary text-primary-foreground rounded-xl w-10 flex items-center justify-center">
 <Send className="w-4 h-4" />
 </button>
 </form>
 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
};

export default XBot;
