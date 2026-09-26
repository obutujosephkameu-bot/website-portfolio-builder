import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Globe, Smartphone, Code2 } from "lucide-react";
import { motion } from "framer-motion";

type Tier = {
  name: string;
  price: string;
  oldPrice?: string;
  desc: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const websiteTiers: Tier[] = [
  {
    name: "Basic",
    price: "KES 14,400",
    oldPrice: "KES 20,000",
    desc: "Launch a clean, mobile-ready presence.",
    features: ["Up to 5 pages", "Mobile responsive", "Basic SEO setup", "Contact form", "1 month support"],
    cta: "Get started",
  },
  {
    name: "Standard",
    price: "KES 25,000",
    oldPrice: "KES 34,000",
    desc: "Best for growing businesses.",
    features: ["Up to 10 pages", "Blog / CMS", "Advanced SEO", "Analytics setup", "3 months support"],
    cta: "Most popular",
    featured: true,
  },
  {
    name: "Advanced / E-commerce",
    price: "KES 50,000",
    oldPrice: "KES 57,000",
    desc: "Full e-commerce or custom platform.",
    features: ["Unlimited pages", "Online store + payments", "Customer dashboard", "SEO + speed tuning", "6 months support"],
    cta: "Contact us",
  },
];

const appTiers: Tier[] = [
  {
    name: "App Starter",
    price: "From KES 60,000",
    desc: "MVP single-platform app.",
    features: ["Android or iOS", "Up to 6 screens", "Free companion website", "Free domain (1 year)", "2 months free support"],
    cta: "Get started",
  },
  {
    name: "App Growth",
    price: "From KES 120,000",
    desc: "Cross-platform with backend.",
    features: ["Android + iOS", "Up to 15 screens", "User accounts + push", "Free website + domain", "2 months free support"],
    cta: "Most popular",
    featured: true,
  },
  {
    name: "App Custom",
    price: "Let's talk",
    desc: "Marketplace, fintech, logistics.",
    features: ["Custom architecture", "Payments / integrations", "Admin dashboard", "Free website + domain", "Ongoing maintenance"],
    cta: "Contact us",
  },
];

const Section = ({ title, icon: Icon, accent, tiers }: { title: string; icon: typeof Globe; accent: "blue" | "orange"; tiers: Tier[] }) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-3 mb-10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accent === "orange" ? "bg-secondary/15 text-secondary" : "bg-primary/15 text-primary"}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`relative rounded-3xl p-8 ${
              t.featured
                ? "bg-foreground text-background border-2 border-secondary shadow-2xl md:scale-[1.03]"
                : "bg-card border border-border"
            }`}
          >
            {t.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
            <p className={`text-sm mb-6 ${t.featured ? "text-background/70" : "text-muted-foreground"}`}>{t.desc}</p>
            <div className="mb-6">
              <div className="text-4xl font-bold">{t.price}</div>
              {t.oldPrice && (
                <div className={`text-sm line-through mt-1 ${t.featured ? "text-background/50" : "text-muted-foreground"}`}>
                  was {t.oldPrice}
                </div>
              )}
            </div>
            <ul className="space-y-3 mb-8">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className={`w-5 h-5 mt-0.5 shrink-0 ${t.featured ? "text-secondary" : "text-primary"}`} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button asChild className={`w-full ${t.featured ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : ""}`}>
              <Link to="/contact">{t.cta}</Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const PricingPackages = () => (
  <Layout>
    <section className="py-20 container mx-auto px-4">
      <div className="max-w-3xl mb-6 text-center mx-auto">
        <div className="text-secondary text-sm font-semibold uppercase tracking-wider mb-3">Pricing</div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
          Transparent <span className="lumex-heading-orange">pricing.</span>
        </h1>
        <p className="text-lg text-muted-foreground">Pick a starting point. We'll tailor the rest.</p>
      </div>
    </section>

    <Section title="Website Packages" icon={Globe} accent="blue" tiers={websiteTiers} />
    <Section title="Mobile App Packages" icon={Smartphone} accent="orange" tiers={appTiers} />

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="lumex-gradient-bg rounded-3xl p-10 md:p-14 text-center text-white">
          <Code2 className="w-10 h-10 mx-auto mb-4" />
          <h3 className="text-3xl md:text-4xl font-bold mb-3">Custom Software & Cyber Security</h3>
          <p className="opacity-90 mb-6 max-w-2xl mx-auto">
            ERPs, CRMs, school systems, dashboards, audits, and managed security — quoted to scope.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default PricingPackages;
