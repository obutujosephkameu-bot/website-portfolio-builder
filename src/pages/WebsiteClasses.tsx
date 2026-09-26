import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, Users, Code2, Rocket, CheckCircle2, ArrowRight, Laptop, Globe } from "lucide-react";

const modules = [
  { Icon: Globe, title: "HTML, CSS & Modern Layouts", desc: "Build responsive sites from scratch using semantic HTML and Flex/Grid." },
  { Icon: Code2, title: "JavaScript & React", desc: "From DOM basics to building real React apps with components and state." },
  { Icon: Laptop, title: "Tailwind & UI Design", desc: "Design beautiful interfaces fast using Tailwind, shadcn and Figma." },
  { Icon: Rocket, title: "Hosting & Domains", desc: "Deploy live to .co.ke / .com — connect domains, SSL and email." },
  { Icon: Users, title: "Real Client Projects", desc: "Work on actual Lumex client briefs — portfolio-ready by graduation." },
  { Icon: Award, title: "Certificate of Completion", desc: "Recognized Lumex Digital certificate awarded at the end of the course." },
];

const tracks = [
  {
    title: "3-Month Fast Track",
    price: "KES 20,000",
    perMonth: "/month",
    bullets: ["12 weeks intensive", "2 sessions per week", "1 capstone website project", "Certificate awarded"],
    accent: "from-primary to-blue-500",
  },
  {
    title: "6-Month Pro Track",
    price: "KES 20,000",
    perMonth: "/month",
    bullets: ["24 weeks in-depth", "Frontend + Backend + Hosting", "3 portfolio projects", "Internship opportunity", "Certificate awarded"],
    accent: "from-secondary to-orange-500",
    featured: true,
  },
];

const WebsiteClasses = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 lumex-dark-bg opacity-90" />
      <div className="absolute inset-0 lumex-grid-bg opacity-40" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 text-secondary rounded-full px-4 py-2 mb-6 text-sm font-semibold">
            <GraduationCap className="w-4 h-4" /> Lumex Digital Academy
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-background mb-4 leading-tight">
            Learn Website Development —{" "}
            <span className="text-secondary">become a developer in 3-6 months.</span>
          </h1>
          <p className="text-lg text-background/75 mb-8">
            Hands-on classes by working Lumex engineers. Build real websites, host them live, and graduate with a portfolio and a recognized certificate.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-14 px-8">
              <Link to="/contact">Enroll Now <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/5 border-white/20 text-background hover:bg-white/15 h-14 px-8">
              <a href="https://wa.me/254706387820" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </Button>
          </div>

          <div className="mt-10 inline-flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3 rounded-2xl bg-background/10 backdrop-blur border border-secondary/30">
            <span className="text-background/85 text-sm font-semibold uppercase tracking-wide">As low as</span>
            <span
              className="font-extrabold text-3xl md:text-5xl leading-none"
              style={{
                background: "linear-gradient(180deg, #FFE27A 0%, #F5C518 35%, #B8860B 70%, #8B6508 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 6px rgba(184,134,11,.6))",
              }}
            >
              KES 20,000/-
            </span>
            <span className="text-secondary text-sm font-bold">per month • 3-6 months • Certificate included</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* What you'll learn */}
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <div className="text-secondary text-sm font-semibold uppercase tracking-wider mb-3">Curriculum</div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">What you'll learn</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="lumex-card-glow rounded-2xl bg-card border border-border p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <m.Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{m.title}</h3>
              <p className="text-muted-foreground text-sm">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Pricing tracks */}
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12 text-center mx-auto">
          <div className="text-secondary text-sm font-semibold uppercase tracking-wider mb-3">Choose your track</div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Flexible class options</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tracks.map((t) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl p-8 border ${t.featured ? "border-secondary shadow-2xl shadow-secondary/20 scale-[1.02]" : "border-border"} bg-card`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${t.accent} text-white rounded-full px-3 py-1 mb-4 text-xs font-bold`}>
                <Calendar className="w-3 h-3" /> {t.title}
              </div>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl md:text-5xl font-extrabold text-foreground">{t.price}</span>
                <span className="text-muted-foreground mb-2">{t.perMonth}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className={`w-full bg-gradient-to-r ${t.accent} text-white hover:opacity-90 h-12`}>
                <Link to="/contact">Enroll in {t.title}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default WebsiteClasses;
