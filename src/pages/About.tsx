import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
          className="max-w-5xl mx-auto bg-card border border-border rounded-3xl overflow-hidden shadow-lumex-lg grid md:grid-cols-[minmax(0,340px)_1fr] lg:grid-cols-[minmax(0,420px)_1fr]"
        >
          <div className="relative w-full overflow-hidden aspect-[3/5] sm:aspect-[2/3] md:aspect-auto md:min-h-[700px] border-b md:border-b-0 md:border-r border-border bg-background">
            <img
              src={founderPhoto}
              alt="Josemaria M. Njeru, C.E.O and Founder of Lumex Digital and Software World"
              className="founder-zoom-out absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="founder-zoom-wrap absolute inset-0 bg-lumex-dark"
            />
          </div>

          <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center text-center md:text-left">

            <h3 className="text-2xl font-bold">Josemaria M. Njeru</h3>
            <p className="text-secondary font-semibold mb-4">C.E.O &amp; Founder</p>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founder and Chief Executive Officer of Lumex Digital and its software-building
                department, Software World — leading the team behind every website, app, and system
                we ship.
              </p>
              <p>
                A consummate visionary and indefatigable architect of digital transformation,
                Josemaria M. Njeru established Lumex Digital in 2010 with an unwavering conviction:
                that exemplary technology ought to be an accessible catalyst for prosperity rather
                than an exclusive privilege of the few.
              </p>
              <p>
                Under his perspicacious stewardship, the enterprise has burgeoned from a modest
                undertaking into a formidable, multifaceted institution — one whose meticulously
                engineered websites, enterprise systems, and cybersecurity solutions empower
                schools, corporations, and merchants throughout Kenya and beyond.
              </p>
              <p>
                Through Software World, he has championed an ethos of relentless innovation,
                orchestrating sophisticated platforms for education, human-resource management, and
                commerce. His leadership is distinguished by intellectual rigour, uncompromising
                integrity, and a magnanimous dedication to mentoring the next generation of African
                technologists.
              </p>
            </div>
            <Button asChild variant="outline" className="mt-6 self-center md:self-start">
              <Link to="/about/josemaria-m-njeru">View Josemaria’s full profile</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default About;
