import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Users } from "lucide-react";

const values = [
  { Icon: Target, title: "Precision", desc: "Every pixel, every line of code, considered." },
  { Icon: Heart, title: "Partnership", desc: "We win when our clients win." },
  { Icon: Zap, title: "Speed", desc: "Ship weekly, learn fast, iterate faster." },
  { Icon: Users, title: "People", desc: "A small senior team — no juniors learning on your dime." },
];

import founderPhoto from "@/assets/founder.png";

const About = () => (
  <Layout>
    <section className="py-24 container mx-auto px-4">
      <div className="max-w-3xl">
        <div className="text-secondary text-sm font-semibold uppercase tracking-wider mb-3">About</div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          A digital studio building <span className="lumex-heading">what's next.</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          Lumex Digital is a Nairobi-based studio engineering websites, apps, software, and security
          for ambitious teams across Kenya and Africa.
        </p>
        <p className="text-lg text-muted-foreground">
          We've shipped 500+ projects for 300+ clients — from startups finding their first customer to
          enterprises modernizing legacy systems.
        </p>
      </div>
    </section>

    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Our values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <v.Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Leadership</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left"
        >
          <img
            src={founderPhoto}
            alt="Josemaria M. Njeru, C.E.O and Founder of Lumex Digital and Software World"
            className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover shadow-lumex-lg shrink-0"
          />
          <div>
            <h3 className="text-2xl font-bold">Josemaria M. Njeru</h3>
            <p className="text-secondary font-semibold mb-4">C.E.O &amp; Founder</p>
            <p className="text-muted-foreground">
              Founder and Chief Executive Officer of Lumex Digital and its software-building
              department, Software World — leading the team behind every website, app, and system
              we ship.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default About;
