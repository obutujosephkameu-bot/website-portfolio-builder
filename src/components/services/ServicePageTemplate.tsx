import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, LucideIcon } from "lucide-react";

interface ServicePageProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  Icon: LucideIcon;
  features: { title: string; desc: string; Icon: LucideIcon }[];
  process: { step: string; title: string; desc: string }[];
  techStack: string[];
  accent?: "blue" | "orange";
  children?: ReactNode;
}

const ServicePageTemplate = ({
  eyebrow,
  title,
  highlight,
  description,
  Icon,
  features,
  process,
  techStack,
  accent = "blue",
}: ServicePageProps) => {
  const accentClass = accent === "orange" ? "text-secondary" : "text-primary";
  const accentBg = accent === "orange" ? "bg-secondary/10" : "bg-primary/10";

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 lumex-page-bg" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-2 ${accentBg} ${accentClass} rounded-full px-4 py-2 mb-6 text-sm font-semibold`}
            >
              <Icon className="w-4 h-4" />
              {eyebrow}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              {title}{" "}
              <span className="lumex-heading">{highlight}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="flex flex-wrap gap-3"
            >
              <Button size="lg" asChild>
                <Link to="/contact">
                  Get a Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://wa.me/254706387820" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Deliver</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Crafted with precision, built to scale, and designed to outperform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="lumex-card-glow bg-card border border-border rounded-2xl p-6"
              >
                <div className={`w-12 h-12 rounded-xl ${accentBg} ${accentClass} flex items-center justify-center mb-4`}>
                  <f.Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-muted-foreground">From discovery to launch — clear, collaborative, fast.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className={`text-6xl font-bold ${accentClass} opacity-20 mb-2`}>{p.step}</div>
                <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tools & Technologies</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {techStack.map((t) => (
              <span key={t} className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:border-primary transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="lumex-gradient-bg rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to start your project?</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Get a free consultation and detailed quote within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">Get a Quote</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
                  <a href="tel:+254706387820">Call 0706 387 820</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicePageTemplate;
