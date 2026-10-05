import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, ArrowRight } from "lucide-react";
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
import BuiltLogoMarquee from "@/components/portfolio/BuiltLogoMarquee";

const sites = [
  { title: "Deborah Homes", url: "https://deborahhomes.co.ke", category: "Real Estate", logo: logoDeborah },
  { title: "Shani School", url: "https://shanischool.com", category: "Education", logo: logoShani },
  { title: "Kibatia Advocates", url: "https://kibatiaadvocates.com", category: "Law Firm", logo: logoKibatia },
  { title: "TopTank", url: "https://toptank.com", category: "Manufacturing", logo: logoTopTank },
  { title: "Rosben Accounting", url: "https://rosbenaccountingandconsultancy.co.ke", category: "Accounting", logo: logoRosben },
  { title: "Arizona International College", url: "https://arizonainternationalcollege.africa", category: "Higher Education", logo: logoArizonaCollege },
  { title: "Patrina Homes", url: "https://patrinahomes.co.ke", category: "Real Estate", logo: logoPatrina },
  { title: "Greenfield Real Estate", url: "https://greenfieldacademy.co.ke", category: "Real Estate", logo: logoGreenfield },
  { title: "Arizona Group", url: "https://arizonagroup.co.ke", category: "Conglomerate", logo: logoArizona },
  { title: "China Village", url: "https://chinavillage.co.ke", category: "Business", logo: logoChinaVillage },
  { title: "Sports Sparks Africa", url: "https://sportssparks.org", category: "Sports", logo: logoSportsSparks },
];

const PortfolioStrip = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute -top-20 right-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mb-12">
        <div className="text-secondary text-sm font-semibold uppercase tracking-wider mb-3">Our Work</div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Websites we've <span className="lumex-heading-orange">built &amp; manage.</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Trusted by businesses across Kenya — from law firms and schools to real estate and manufacturing.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((s, i) => (
          <motion.a
            key={s.title}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl overflow-hidden border border-border bg-card/80 backdrop-blur shadow-lg hover:shadow-2xl hover:border-secondary/50 transition-all"
          >
            {/* gradient header */}
            <div className="relative h-32 bg-gradient-to-br from-primary via-primary/80 to-secondary overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.4) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,.3) 0, transparent 40%)"
              }} />
              <div className="absolute -bottom-1 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
              <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
              </div>
              <div className="absolute -bottom-8 left-5 w-20 h-20 rounded-2xl bg-white shadow-xl border border-border flex items-center justify-center p-2 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <img src={s.logo} alt={`${s.title} logo`} className="max-h-full max-w-full object-contain" loading="lazy" />
              </div>
            </div>
            <div className="pt-12 pb-5 px-5">
              <div className="text-[11px] uppercase tracking-wider text-secondary font-bold mb-1">{s.category}</div>
              <h3 className="text-lg font-bold text-foreground mb-2 truncate">{s.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-primary text-xs font-semibold inline-flex items-center gap-1 truncate">
                  {s.url.replace(/^https?:\/\//, "")}
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-14">
        <BuiltLogoMarquee />
      </div>

      {/* Domain CTA banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 rounded-3xl overflow-hidden relative border border-secondary/30 bg-gradient-to-br from-primary via-primary to-secondary p-8 md:p-12"
      >
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
              <Globe className="w-3.5 h-3.5" /> Domains &amp; Hosting
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Buy your domain. Launch in minutes.</h3>
            <p className="text-white/80 max-w-2xl">
              .co.ke, .com, .africa and more — affordable hosting plans with email, SSL and 24/7 support.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 font-bold">
              <a href="https://softwareworld.co.ke/" target="_blank" rel="noopener noreferrer">
                Buy a Domain <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PortfolioStrip;
