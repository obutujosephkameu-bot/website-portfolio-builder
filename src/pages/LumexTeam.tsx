import Layout from "@/components/layout/Layout";
import { Globe, Smartphone, Code2, Shield } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  { icon: Globe, name: "Web Engineering", desc: "Modern, fast, accessible web platforms." },
  { icon: Smartphone, name: "Mobile Engineering", desc: "Native and cross-platform apps that delight." },
  { icon: Code2, name: "Software & Backend", desc: "APIs, databases, automation, and AI integrations." },
  { icon: Shield, name: "Security", desc: "Audits, pen-tests, and ongoing protection." },
];

const LumexTeam = () => (
  <Layout>
    <section className="py-24 container mx-auto px-4">
      <div className="max-w-3xl mb-14">
        <div className="text-secondary text-sm font-semibold uppercase tracking-wider mb-3">The team</div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Meet the <span className="lumex-heading">Lumex squads.</span>
        </h1>
        <p className="text-lg text-muted-foreground">Senior practitioners, organized into focused squads.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {team.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="lumex-card-glow bg-card border border-border rounded-2xl p-8"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <t.icon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
            <p className="text-muted-foreground">{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default LumexTeam;
