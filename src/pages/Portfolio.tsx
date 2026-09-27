import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import FloatingBubbles from "@/components/effects/FloatingBubbles";

import logoArizona from "@/assets/arizona-logo.png";
import logoArizonaCollege from "@/assets/arizona-college-logo.png";
import logoDeborah from "@/assets/deborah-homes-logo.png";
import logoGreenfield from "@/assets/greenfield-logo.png";
import logoRosben from "@/assets/rosben-logo.png";
import logoShani from "@/assets/shani-logo.png";
import logoKibatia from "@/assets/kibatia-logo.png";
import logoTopTank from "@/assets/toptank-logo.png";
import logoPatrina from "@/assets/patrina-logo.png";
import logoChinaVillage from "@/assets/chinavillage-logo.png";
import logoSportsSparks from "@/assets/sportssparks-logo.png";
import logoSoftwareWorld from "@/assets/softwareworld-logo.png";
import AdminAddedItems from "@/components/portfolio/AdminAddedItems";
import BuiltLogoMarquee from "@/components/portfolio/BuiltLogoMarquee";

const built = [
  { title: "Deborah Homes", url: "https://deborahhomes.co.ke", category: "Real Estate", logo: logoDeborah },
  { title: "Shani School", url: "https://shanischool.com", category: "Education", logo: logoShani },
  { title: "Kibatia Advocates", url: "https://kibatiaadvocates.com", category: "Law Firm", logo: logoKibatia },
  { title: "TopTank", url: "https://toptank.com", category: "Manufacturing", logo: logoTopTank },
  { title: "Rosben Accounting", url: "https://rosbenaccountingandconsultancy.co.ke", category: "Accounting", logo: logoRosben },
  { title: "Arizona International College", url: "https://arizonainternationalcollege.africa", category: "Higher Education", logo: logoArizonaCollege },
  { title: "Patrina Homes", url: "https://patrinahomes.co.ke", category: "Real Estate", logo: logoPatrina },
  { title: "China Village", url: "https://chinavillage.co.ke", category: "Business", logo: logoChinaVillage },
  { title: "Sports Sparks Africa", url: "https://sportssparks.org", category: "Sports", logo: logoSportsSparks },
  { title: "Software World", url: "https://softwareworld.co.ke", category: "Our Software Group", logo: logoSoftwareWorld },
];

const managed = [
  { title: "Greenfield Real Estate", url: "https://greenfieldacademy.co.ke", logo: logoGreenfield },
  { title: "Arizona Group", url: "https://arizonagroup.co.ke", logo: logoArizona },
];

const Portfolio = () => (
  <Layout bg="orange">
    {/* Hero */}
    <section className="relative py-20 overflow-hidden">
      <FloatingBubbles count={10} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-4">
          <div className="text-secondary text-sm font-semibold uppercase tracking-wider mb-3">Portfolio</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Websites we've <span className="lumex-heading-orange">built.</span>
          </h1>
          <p className="text-lg text-muted-foreground">Trusted by leading businesses across Kenya and Africa.</p>
        </div>
      </div>
    </section>

    {/* Built */}
    <section className="pb-16 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {built.map((it, i) => (
            <motion.a
              key={it.title}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group lumex-card-glow rounded-2xl bg-card/60 backdrop-blur border border-border p-6 flex flex-col items-center text-center"
            >
              <div className="w-full h-32 flex items-center justify-center mb-4 bg-background/60 rounded-xl">
                <img src={it.logo} alt={`${it.title} logo`} className="max-h-24 w-auto object-contain" loading="lazy" />
              </div>
              <div className="text-xs uppercase tracking-wider text-secondary font-semibold">{it.category}</div>
              <h3 className="text-lg font-bold mt-1 text-foreground">{it.title}</h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all">
                {it.url.replace(/^https?:\/\//, "")} <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </motion.a>
          ))}
        </div>
        <AdminAddedItems collectionName="businesses" />
      </div>
    </section>

    {/* Managed sites */}
    <section className="py-16 bg-foreground/95 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-2">Websites we manage</h2>
          <p className="text-background/70">Ongoing maintenance &amp; support for our partners</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {managed.map((it) => (
            <a key={it.title} href={it.url} target="_blank" rel="noopener noreferrer"
              className="group rounded-2xl bg-background/10 backdrop-blur border border-background/20 hover:border-secondary p-6 flex items-center gap-4 transition-all">
              <div className="w-20 h-20 bg-background rounded-xl flex items-center justify-center shrink-0">
                <img src={it.logo} alt={it.title} className="max-h-16 w-auto object-contain" loading="lazy" />
              </div>
              <div>
                <h3 className="font-bold text-background text-lg">{it.title}</h3>
                <span className="text-background/70 text-sm inline-flex items-center gap-1.5 group-hover:text-secondary transition-colors">
                  Visit site <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* Trusted strip */}
    <section className="py-12 border-y border-border bg-background/40">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">
          Trusted by businesses across Kenya
        </h2>
        <BuiltLogoMarquee />
      </div>
    </section>

    <section className="py-16 text-center">
      <Button size="lg" asChild>
        <Link to="/contact">Start your project</Link>
      </Button>
    </section>
  </Layout>
);

export default Portfolio;
