import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { adminDb } from "@/lib/firebase-admin";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import {
  Briefcase, Code2, Smartphone, Shield, Megaphone, GraduationCap, MapPin, Clock, Send,
  CheckCircle2, Rocket, Users, HeartHandshake, Laptop, CalendarDays, Wallet,
} from "lucide-react";

interface Vacancy {
  id: string; title?: string; department?: string; type?: string; location?: string;
  salary?: string; deadline?: string; description?: string; requirements?: string; visible?: boolean;
}

const DEFAULT_VACANCIES: Vacancy[] = [
  { id: "d1", title: "Web Developer (React / WordPress)", department: "Lumex Digital", type: "Full-time", location: "Nairobi / Remote", description: "Build fast, modern websites for clients across Kenya." },
  { id: "d2", title: "Mobile App Developer", department: "Lumex Digital", type: "Full-time", location: "Nairobi / Remote", description: "Create Android and iOS apps for businesses." },
  { id: "d3", title: "Software Engineer", department: "Software World", type: "Full-time", location: "Nairobi", description: "Build HRM, school and business systems under Software World." },
  { id: "d4", title: "Cyber Security Analyst", department: "Cyber Security", type: "Contract", location: "Nairobi", description: "Protect client systems and run security audits." },
  { id: "d5", title: "Sales & Marketing Executive", department: "Sales & Marketing", type: "Commission", location: "Countrywide", description: "Bring new clients to Lumex Digital." },
  { id: "d6", title: "Internship / Attachment", department: "Internship", type: "Internship", location: "Nairobi", description: "Learn real-world development with our team for 3–6 months." },
];

const iconFor = (v: Vacancy) => {
  const t = `${v.title} ${v.department}`.toLowerCase();
  if (t.includes("mobile") || t.includes("app")) return Smartphone;
  if (t.includes("security")) return Shield;
  if (t.includes("sales") || t.includes("market")) return Megaphone;
  if (t.includes("intern")) return GraduationCap;
  if (t.includes("software") || t.includes("web") || t.includes("develop")) return Code2;
  return Briefcase;
};

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  position: z.string().trim().min(2, "Choose or type a position").max(150),
  experience: z.string().max(50),
  portfolio: z.string().trim().max(300),
  cvLink: z.string().trim().max(300),
  message: z.string().trim().min(20, "Tell us a bit more (at least 20 characters)").max(3000),
});

const empty = { name: "", email: "", phone: "", position: "", experience: "", portfolio: "", cvLink: "", message: "" };

const Careers = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>(DEFAULT_VACANCIES);
  const [form, setForm] = useState(empty);
  const [kind, setKind] = useState<"vacancy" | "general">("vacancy");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Careers at Lumex Digital | Tech Jobs & Internships in Kenya";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Work with Lumex Digital and Software World. Apply for open vacancies or request to join our team of developers, designers, security and sales experts in Kenya."
    );
    const unsub = onSnapshot(
      collection(adminDb, "vacancies"),
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })).filter((v) => v.visible !== false);
        if (list.length) setVacancies(list);
      },
      () => {}
    );
    return () => unsub();
  }, []);

  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const applyFor = (v: Vacancy) => {
    setKind("vacancy");
    set("position", v.title || "");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    const d = parsed.data;
    const label = kind === "general" ? "Request to Work With Lumex" : "Career Application";
    const record = {
      ...d, email: d.email.toLowerCase(), applicationType: kind, status: "new",
      pageUrl: window.location.href, createdAt: serverTimestamp(),
    };
    try {
      // Saved to the admin inbox (LUMEX Messages) — always allowed.
      await addDoc(collection(adminDb, "messages"), {
        name: d.name, full_name: d.name, email: d.email.toLowerCase(), phone: d.phone,
        subject: `${label} - ${d.position}`, service: label,
        message: `${label}\nPosition: ${d.position}\nExperience: ${d.experience || "-"}\nPortfolio: ${d.portfolio || "-"}\nCV link: ${d.cvLink || "-"}\n\n${d.message}`,
        status: "new", source: "contact-page", channel: "LUMEX Careers",
        pageUrl: window.location.href, userAgent: navigator.userAgent, createdAt: serverTimestamp(),
      });
      // Also stored in its own collection (created automatically on first save).
      addDoc(collection(adminDb, "careerApplications"), record).catch(() => {});
      setDone(true);
      setForm(empty);
    } catch {
      setErrors({ form: "Could not send right now. Please email info@lumexdigital.co.ke or WhatsApp 0706 387 820." });
    } finally {
      setSending(false);
    }
  };

  const field = (k: keyof typeof empty, label: string, props: any = {}) => (
    <div className="space-y-2">
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} value={form[k]} onChange={(e) => set(k, e.target.value)} {...props} />
      {errors[k] && <p className="text-sm text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="lumex-dark-bg pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block rounded-full border border-secondary/40 bg-secondary/15 px-4 py-2 text-sm font-semibold text-secondary mb-6">
            Careers at Lumex Digital · Since 2010
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-background mb-5">Build Africa's digital future with us</h1>
          <p className="text-lg text-background/75 max-w-2xl mx-auto mb-8">
            Join Lumex Digital and Software World, our software-building department. We make websites, apps and
            systems used by businesses and schools across Kenya.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" onClick={() => document.getElementById("vacancies")?.scrollIntoView({ behavior: "smooth" })}>
              View open vacancies
            </Button>
            <Button size="lg" variant="outline" className="bg-background/5 border-background/30 text-background hover:bg-background/15"
              onClick={() => { setKind("general"); formRef.current?.scrollIntoView({ behavior: "smooth" }); }}>
              Request to work with us
            </Button>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Why work at Lumex</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { i: Rocket, t: "Real projects", d: "Work on live websites, apps and systems for real clients." },
              { i: GraduationCap, t: "Learn & grow", d: "Mentorship, training and room to move up." },
              { i: Laptop, t: "Flexible work", d: "Remote and hybrid options for many roles." },
              { i: Wallet, t: "Fair pay", d: "Competitive salaries and commissions." },
              { i: Users, t: "Great team", d: "Developers, designers and security experts who help each other." },
              { i: HeartHandshake, t: "Impact", d: "Help Kenyan businesses and schools go digital." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-2xl bg-card border border-border p-6">
                <Icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg text-foreground mb-1">{t}</h3>
                <p className="text-muted-foreground text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vacancies */}
      <section id="vacancies" className="py-20 bg-background scroll-mt-28">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">Open vacancies</h2>
          <p className="text-center text-muted-foreground mb-10">Pick a role and apply in minutes.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacancies.map((v) => {
              const Icon = iconFor(v);
              return (
                <div key={v.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground leading-snug">{v.title}</h3>
                      {v.department && <p className="text-xs font-semibold text-secondary">{v.department}</p>}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                    {v.type && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{v.type}</span>}
                    {v.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{v.location}</span>}
                    {v.deadline && <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" />Apply by {v.deadline}</span>}
                  </div>
                  {v.salary && <p className="text-sm font-semibold text-foreground mb-2">{v.salary}</p>}
                  {v.description && <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">{v.description}</p>}
                  {v.requirements && (
                    <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                      {v.requirements.split("\n").filter(Boolean).map((r) => (
                        <li key={r} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{r}</li>
                      ))}
                    </ul>
                  )}
                  <Button className="mt-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full" onClick={() => applyFor(v)}>
                    Apply for this role
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-muted/40">
        <div ref={formRef} className="container mx-auto px-4 max-w-3xl scroll-mt-28">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-lg">
            {done ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Application received!</h2>
                <p className="text-muted-foreground mb-6">Thank you. Our team will review it and contact you soon.</p>
                <Button onClick={() => setDone(false)}>Send another</Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Apply or request to work with us</h2>
                <p className="text-muted-foreground mb-6">Apply for a vacancy, or send a general request even if no role fits you yet.</p>
                <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-xl bg-muted">
                  {([["vacancy", "Apply for a vacancy"], ["general", "Request to work with us"]] as const).map(([k, l]) => (
                    <button key={k} type="button" onClick={() => setKind(k)}
                      className={`rounded-lg py-2.5 text-sm font-semibold transition ${kind === k ? "bg-background text-primary shadow" : "text-muted-foreground"}`}>
                      {l}
                    </button>
                  ))}
                </div>
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    {field("name", "Full name *", { maxLength: 120 })}
                    {field("email", "Email *", { type: "email", maxLength: 200 })}
                    {field("phone", "Phone / WhatsApp *", { type: "tel", maxLength: 30 })}
                    <div className="space-y-2">
                      <Label htmlFor="position">{kind === "general" ? "Area you want to work in *" : "Position *"}</Label>
                      <Input id="position" list="positions" value={form.position} onChange={(e) => set("position", e.target.value)} maxLength={150} />
                      <datalist id="positions">{vacancies.map((v) => <option key={v.id} value={v.title} />)}</datalist>
                      {errors.position && <p className="text-sm text-destructive">{errors.position}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      <select id="experience" value={form.experience} onChange={(e) => set("experience", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                        <option value="">Select…</option>
                        {["Student / No experience", "Less than 1 year", "1–3 years", "3–5 years", "5+ years"].map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    {field("portfolio", "Portfolio / GitHub / LinkedIn", { type: "url", placeholder: "https://", maxLength: 300 })}
                  </div>
                  {field("cvLink", "CV link (Google Drive, Dropbox…)", { type: "url", placeholder: "https://", maxLength: 300 })}
                  <div className="space-y-2">
                    <Label htmlFor="message">{kind === "general" ? "Tell us about yourself and how you'd like to work with Lumex *" : "Why are you a good fit? *"}</Label>
                    <Textarea id="message" rows={6} value={form.message} onChange={(e) => set("message", e.target.value)} maxLength={3000} />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>
                  {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
                  <Button type="submit" size="lg" disabled={sending} className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <Send className="w-4 h-4 mr-2" /> {sending ? "Sending…" : "Submit application"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
