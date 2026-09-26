import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Smartphone, Code2, Shield, ArrowUpRight, Wrench } from "lucide-react";

const services = [
  { icon: Globe, title: "Website Development", desc: "Marketing sites, e-commerce, and web platforms built to convert.", link: "/website-development" },
  { icon: Smartphone, title: "App Development", desc: "iOS and Android apps that feel native and scale globally.", link: "/app-development" },
  { icon: Code2, title: "Software Development", desc: "Custom ERPs, CRMs, dashboards, and internal tools.", link: "/software-development" },
  { icon: Shield, title: "Cyber Security", desc: "Audits, penetration testing, monitoring, and incident response.", link: "/cybersecurity" },
  { icon: Wrench, title: "IT & Computer Services", desc: "Setup, support, networking, software downloads, and domains.", link: "/it-services" },
];

const ServicesPreview = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <div className="text-secondary text-sm font-semibold uppercase tracking-wider mb-3">What we do</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Five disciplines. <span className="lumex-heading-orange">One team.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Strategy, design, engineering, security, and IT — under one roof, delivered with the same standard.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={s.link}
                className="group block relative overflow-hidden rounded-3xl bg-card border border-border p-8 lumex-card-glow h-full"
              >
                {/* corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/15 to-transparent rounded-bl-full" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center mb-6 shadow-lumex-md group-hover:scale-110 transition-transform">
                    <s.icon className="w-7 h-7" />
                  </div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">{s.title}</h3>
                    <ArrowUpRight className="w-5 h-5 text-secondary opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>

                  <div className="mt-6 flex items-center gap-2 text-secondary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
