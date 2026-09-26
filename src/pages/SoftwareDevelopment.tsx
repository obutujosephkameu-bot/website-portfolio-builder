import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Database, GitBranch, Workflow, Cloud, Cpu, ShieldCheck, Download, ArrowRight, Globe2 } from "lucide-react";
import FloatingBubbles from "@/components/effects/FloatingBubbles";

const features = [
  { Icon: Workflow, title: "Workflow Automation", desc: "Replace spreadsheets with reliable, audited processes." },
  { Icon: Database, title: "Robust Data Layer", desc: "PostgreSQL, role-based access, full audit trails." },
  { Icon: Cloud, title: "Cloud Native", desc: "Deploy anywhere — AWS, Azure, GCP, or on-premise." },
  { Icon: GitBranch, title: "Scalable Architecture", desc: "Microservices, queues, and caching done right." },
  { Icon: ShieldCheck, title: "Enterprise Security", desc: "SSO, 2FA, encryption, and compliance-ready logs." },
  { Icon: Cpu, title: "AI Integrations", desc: "Embed LLMs, automation, and analytics into your tools." },
];

const SoftwareDevelopment = () => (
  <Layout bg="orange">
    {/* Hero */}
    <section className="relative overflow-hidden py-20 md:py-28">
      <FloatingBubbles count={12} />
      <div className="absolute inset-0 lumex-grid-bg opacity-40 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary border border-primary/30 rounded-full px-4 py-2 mb-6 text-sm font-semibold">
            <Code2 className="w-4 h-4" /> Software Development
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Custom software that <span className="lumex-heading-blue">runs your business.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            ERPs, CRMs, school management, HR systems, dashboards, and internal tools — engineered to fit your workflow exactly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/software-products">
                <Download className="w-4 h-4 mr-2" /> Buy Software <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://hosting.lumexdigital.co.ke/" target="_blank" rel="noopener noreferrer">
                <Globe2 className="w-4 h-4 mr-2" /> Buy Hosting & Domain
              </a>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link to="/contact">Custom Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">What we deliver</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="lumex-card-glow bg-card/50 backdrop-blur border border-border rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                <f.Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Buy Software CTA */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-6">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold mb-2">Already-built software ready to deploy</h3>
              <p className="opacity-80">School Management, HR, POS, Hospital, Hotel, Real Estate & more.</p>
            </div>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
              <Link to="/software-products">Browse Software <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default SoftwareDevelopment;
