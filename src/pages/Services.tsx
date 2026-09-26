import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Smartphone, Code2, Shield, Store, ArrowRight } from "lucide-react";

const services = [
  { Icon: Globe, title: "Website Development", desc: "Marketing sites, e-commerce, web apps.", link: "/website-development" },
  { Icon: Smartphone, title: "App Development", desc: "iOS & Android apps with native quality.", link: "/app-development" },
  { Icon: Code2, title: "Software Development", desc: "Custom ERPs, CRMs, dashboards, internal tools.", link: "/software-development" },
  { Icon: Store, title: "LUM-EX Management System", desc: "Offline-first POS, stock & multi-business platform.", link: "/management-system-kenya" },
  { Icon: Shield, title: "Cyber Security", desc: "Audits, pen-tests, monitoring, response.", link: "/cybersecurity" },
];

const Services = () => (
  <Layout>
    <section className="py-24 container mx-auto px-4">
      <div className="max-w-3xl mb-14">
        <div className="text-secondary text-sm font-semibold uppercase tracking-wider mb-3">Services</div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          What we <span className="lumex-heading">build.</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Four focused practices, one accountable team.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to={s.link} className="block lumex-card-glow bg-card border border-border rounded-2xl p-8 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <s.Icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground mb-4">{s.desc}</p>
              <span className="text-secondary font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          <Link to="/contact">Start a Project</Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Services;
