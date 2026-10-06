import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Frown,
  Headphones,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { adminDb } from "@/lib/firebase-admin";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CONTACT_EMAILS } from "@/lib/contactEmails";

const WHATSAPP_NUMBER = "254706387820";
const DISPLAY_PHONE = "+254 706 387 820";
const TEAM_EMAIL = CONTACT_EMAILS.sales;

type ViewState = "form" | "success" | "error";

const emptyForm = { full_name: "", email: "", phone: "", service: "", message: "" };

const Contact = () => {
  const [view, setView] = useState<ViewState>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const whatsAppMessage = `Hello LUMEX Digital,\n\nName: ${formData.full_name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service || "General Inquiry"}\n\n${formData.message}`;
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsAppMessage)}`;
  const emailLink = `mailto:${TEAM_EMAIL}?subject=${encodeURIComponent(formData.service || "LUMEX Inquiry")}&body=${encodeURIComponent(whatsAppMessage)}`;
  const telLink = `tel:+254706387820`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget).get("_honeypot");
    if (honeypot) {
      setView("success");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(adminDb, "messages"), {
        name: formData.full_name.trim(),
        full_name: formData.full_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        subject: formData.service || "General Inquiry",
        service: formData.service || "General Inquiry",
        message: formData.message.trim(),
        status: "new",
        source: "contact-page",
        channel: "LUMEX Messages",
        pageUrl: window.location.href,
        userAgent: window.navigator.userAgent,
        createdAt: serverTimestamp(),
      });
      setView("success");
    } catch (err: any) {
      console.error("[Contact] message send failed:", err?.code, err?.message, err);
      setView("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendAnother = () => {
    setFormData(emptyForm);
    setView("form");
  };

  const tryAgain = () => setView("form");

  const quickContact = [
    { title: "WhatsApp LUMEX", detail: DISPLAY_PHONE, note: "Fastest reply", Icon: MessageCircle, href: waLink, external: true, variant: "whatsapp" as const },
    { title: "Call LUMEX", detail: DISPLAY_PHONE, note: "Mon–Sat 8am–6pm", Icon: Phone, href: telLink, external: false, variant: "default" as const },
    { title: "Email LUMEX", detail: TEAM_EMAIL, note: "Direct to our team", Icon: Mail, href: emailLink, external: false, variant: "outline" as const },
    { title: "LUMEX Messages", detail: "Send a project brief", note: "Use the form below", Icon: Send, href: "#message-form", external: false, variant: "secondary" as const },
  ];

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0 lumex-grid-bg opacity-25" />
        <motion.div animate={{ scale: [1, 1.18, 1], x: [0, 36, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-background/20 blur-3xl" />
        <motion.div animate={{ scale: [1.1, 1, 1.1], y: [0, -24, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-background/25 bg-background/10 px-4 py-2 text-sm font-semibold text-primary-foreground backdrop-blur">
                <Headphones className="h-4 w-4" />
                Contact LUMEX Digital — Kenya
              </div>
              <h1 className="mb-5 text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
                Talk to LUMEX. Websites, domains, support &amp; more.
              </h1>
              <p className="max-w-2xl text-lg text-primary-foreground/85 md:text-xl">
                Send us a clear message and our team will reply on WhatsApp, phone or email — usually within a few hours.
              </p>
              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  { label: "Reply time", value: "Within 24 hours", Icon: Clock },
                  { label: "Based in", value: "Nairobi, Kenya", Icon: MapPin },
                  { label: "Trusted by", value: "300+ clients", Icon: ShieldCheck },
                ].map(({ label, value, Icon }) => (
                  <div key={label} className="rounded-2xl border border-background/20 bg-background/10 p-4 text-primary-foreground backdrop-blur">
                    <Icon className="mb-3 h-5 w-5 text-secondary" />
                    <div className="text-xs uppercase tracking-wide text-primary-foreground/60">{label}</div>
                    <div className="font-bold">{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="hidden justify-center lg:flex">
              <div className="relative h-80 w-80">
                <div className="absolute inset-0 rounded-full bg-background/15 blur-2xl" />
                <div className="absolute inset-8 rounded-full border border-background/25" />
                <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-secondary/70" />
                <img src={logo} alt="LUMEX Digital" className="relative h-full w-full object-contain drop-shadow-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT */}
      <section className="bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickContact.map(({ title, detail, note, Icon, href, external, variant }) => (
              <Button key={title} variant={variant} asChild className="h-auto justify-start rounded-2xl p-4 text-left shadow-lumex-sm">
                <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="min-w-0">
                    <span className="block font-bold">{title}</span>
                    <span className="block truncate text-xs opacity-80">{detail}</span>
                    <span className="block text-xs font-normal opacity-70">{note}</span>
                  </span>
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FORM / SUCCESS / ERROR */}
      <section className="py-16 md:py-24" id="message-form">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1.5 text-sm font-semibold text-secondary">
              <Sparkles className="h-4 w-4" />
              Send LUMEX a message
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">
              {view === "form" && "Tell us about your project"}
              {view === "success" && "Message sent successfully"}
              {view === "error" && "We couldn't send your message"}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {view === "form" && "Fill in the form and we'll reply on WhatsApp, phone or email — whichever is easiest for you."}
              {view === "success" && "Thank you for contacting LUMEX. Our team has received your message."}
              {view === "error" && "Please try again or reach LUMEX directly using WhatsApp, call or email."}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative">
              <AnimatePresence mode="wait">
                {view === "form" && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden rounded-3xl border border-border bg-card shadow-lumex-lg"
                  >
                    <div className="border-b border-border bg-gradient-to-r from-primary/10 via-background to-secondary/10 p-6 md:p-8">
                      <h3 className="text-2xl font-bold text-foreground">Project message</h3>
                      <p className="mt-2 text-muted-foreground">All fields marked * are required.</p>
                    </div>

                    <div className="space-y-6 p-6 md:p-8">
                      <input type="text" name="_honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="full_name">Full Name *</Label>
                          <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required placeholder="John Doe" className="h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="h-12" />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone / WhatsApp *</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+254 7XX XXX XXX" className="h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service">Service</Label>
                          <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                            <SelectTrigger className="h-12"><SelectValue placeholder="Select a service" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Website Design">Website Design</SelectItem>
                              <SelectItem value="Website Development Classes">Website Development Classes</SelectItem>
                              <SelectItem value="Mobile App">Mobile App</SelectItem>
                              <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                              <SelectItem value="IT Services">IT Services</SelectItem>
                              <SelectItem value="Business Systems">Business Systems</SelectItem>
                              <SelectItem value="Design Services">Design Services</SelectItem>
                              <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={8}
                          placeholder="Tell us about your project, budget, timeline, domain, current website, or the problem you want us to solve..."
                          className="min-h-[220px] resize-y"
                        />
                      </div>

                      <Button type="submit" size="lg" className="h-14 w-full text-base" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : (<><Send className="h-5 w-5" /> Send Message</>)}
                      </Button>
                    </div>
                  </motion.form>
                )}

                {view === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden rounded-3xl border border-secondary/30 bg-card shadow-lumex-lg"
                  >
                    <div className="flex flex-col items-center px-6 py-12 text-center md:px-12 md:py-16">
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                        className="relative mb-6"
                      >
                        <div className="absolute inset-0 animate-ping rounded-full bg-secondary/30" />
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary text-primary-foreground shadow-lumex-lg">
                          <CheckCircle2 className="h-12 w-12" strokeWidth={2.5} />
                        </div>
                      </motion.div>

                      <h3 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Message sent successfully!</h3>
                      <p className="mb-8 max-w-xl text-lg text-muted-foreground">
                        Thank you for contacting LUMEX. We've received your message and our team will get back to you soon.
                      </p>

                      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                        <Button asChild variant="whatsapp" size="lg" className="h-14">
                          <a href={waLink} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="h-5 w-5" /> WhatsApp us
                          </a>
                        </Button>
                        <Button asChild size="lg" className="h-14">
                          <a href={telLink}>
                            <Phone className="h-5 w-5" /> Call us
                          </a>
                        </Button>
                        <Button onClick={sendAnother} variant="outline" size="lg" className="h-14">
                          <Send className="h-5 w-5" /> Send another message
                        </Button>
                        <Button asChild variant="secondary" size="lg" className="h-14">
                          <a href="/">
                            <Home className="h-5 w-5" /> Back to home
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden rounded-3xl border border-destructive/30 bg-card shadow-lumex-lg"
                  >
                    <div className="flex flex-col items-center px-6 py-12 text-center md:px-12 md:py-16">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-destructive to-destructive/70 text-destructive-foreground shadow-lumex-lg"
                      >
                        <Frown className="h-12 w-12" strokeWidth={2.5} />
                      </motion.div>

                      <h3 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">We couldn't send your message right now.</h3>
                      <p className="mb-8 max-w-xl text-lg text-muted-foreground">
                        Please try again, or contact LUMEX directly using WhatsApp or call.
                      </p>

                      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                        <Button onClick={tryAgain} size="lg" className="h-14">
                          <RefreshCw className="h-5 w-5" /> Try again
                        </Button>
                        <Button asChild variant="whatsapp" size="lg" className="h-14">
                          <a href={waLink} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="h-5 w-5" /> WhatsApp {DISPLAY_PHONE}
                          </a>
                        </Button>
                        <Button asChild variant="secondary" size="lg" className="h-14">
                          <a href={telLink}>
                            <Phone className="h-5 w-5" /> Call {DISPLAY_PHONE}
                          </a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14">
                          <a href={emailLink}>
                            <Mail className="h-5 w-5" /> Email {TEAM_EMAIL}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SIDEBAR */}
            <motion.aside initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-lumex-md">
                <h3 className="mb-5 text-2xl font-bold text-foreground">LUMEX contact options</h3>
                <div className="space-y-3">
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 rounded-2xl bg-muted p-4 transition-colors hover:bg-whatsapp/10">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-whatsapp text-white">
                      <MessageCircle className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-bold text-foreground group-hover:text-whatsapp">WhatsApp LUMEX</span>
                      <span className="block text-muted-foreground">{DISPLAY_PHONE}</span>
                      <span className="text-sm text-muted-foreground">Best for quick questions and urgent requests.</span>
                    </span>
                  </a>

                  <a href={telLink} className="group flex items-start gap-4 rounded-2xl bg-muted p-4 transition-colors hover:bg-primary/10">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Phone className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-bold text-foreground group-hover:text-primary">Call LUMEX</span>
                      <span className="block text-muted-foreground">{DISPLAY_PHONE}</span>
                      <span className="text-sm text-muted-foreground">Mon–Sat, 8am–6pm EAT.</span>
                    </span>
                  </a>

                  <a href={emailLink} className="group flex items-start gap-4 rounded-2xl bg-muted p-4 transition-colors hover:bg-secondary/10">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                      <Mail className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-bold text-foreground group-hover:text-secondary">Email LUMEX</span>
                      <span className="block text-muted-foreground">{TEAM_EMAIL}</span>
                      <span className="text-sm text-muted-foreground">For detailed briefs and attachments.</span>
                    </span>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-gradient-to-br from-primary to-secondary p-6 text-primary-foreground shadow-lumex-lg">
                <h3 className="text-2xl font-bold">What LUMEX can help with</h3>
                <div className="mt-5 grid gap-3">
                  {[
                    "LUMEX Websites — design, domains and hosting",
                    "LUMEX Apps & Software — custom systems and dashboards",
                    "LUMEX Support — IT, cyber security and computer services",
                    "LUMEX Classes — website development with certificate",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-background/10 p-3 backdrop-blur">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
