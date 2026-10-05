import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink, Clock, GraduationCap, Users, ShoppingCart, Hotel, Stethoscope, Building2, Truck, Wallet, Boxes, ClipboardList, Download, Handshake, Banknote, LifeBuoy, Warehouse } from "lucide-react";
import FloatingBubbles from "@/components/effects/FloatingBubbles";
import { Link } from "react-router-dom";
import AdminAddedItems from "@/components/portfolio/AdminAddedItems";
import softwareWorldLogo from "@/assets/softwareworld-logo.png";

const ready = [
  {
    name: "Lumex School Management System",
    desc: "Students, fees, exams, timetable, SMS to parents, reports.",
    url: "https://schoolsoftware.lumexdigital.co.ke/",
    Icon: GraduationCap,
  },
  {
    name: "Lumex HR Management System",
    desc: "Employees, payroll, leave, attendance, appraisals.",
    url: "https://hrmlumex.lumexdigital.co.ke/",
    Icon: Users,
  },
];

const coming = [
  { name: "POS & Retail", desc: "Point of sale for shops & supermarkets.", Icon: ShoppingCart },
  { name: "Hotel & Restaurant", desc: "Bookings, orders, kitchen & billing.", Icon: Hotel },
  { name: "Hospital & Clinic", desc: "Patients, appointments, billing, pharmacy.", Icon: Stethoscope },
  { name: "Real Estate", desc: "Properties, tenants, rent collection.", Icon: Building2 },
  { name: "Logistics & Fleet", desc: "Vehicles, drivers, routes, fuel.", Icon: Truck },
  { name: "Accounting", desc: "Invoices, expenses, taxes, reports.", Icon: Wallet },
  { name: "Inventory & Warehouse", desc: "Stock, suppliers, purchases.", Icon: Boxes },
  { name: "Church Management", desc: "Members, contributions, events.", Icon: ClipboardList },
];

const SoftwareProducts = () => (
  <Layout bg="dark">
    {/* Hero */}
    <section className="relative overflow-hidden py-20 md:py-28">
      <FloatingBubbles count={16} />
      <div className="absolute inset-0 lumex-grid-bg opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary border border-secondary/40 rounded-full px-4 py-2 mb-6 text-sm font-semibold backdrop-blur">
            <Download className="w-4 h-4" /> Lumex Software Store
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-background">
            Ready-to-deploy <span className="lumex-heading-orange">business software.</span>
          </h1>
          <p className="text-lg text-background/70 mb-8">
            Buy or subscribe to professional systems built and hosted by Lumex. Each system comes with hosting,
            domain, training, and 2 months of free support.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="https://wa.me/254706387820" target="_blank" rel="noopener noreferrer">Buy a Software</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-background/10 border-background/30 text-background hover:bg-background/20" asChild>
              <a href="https://hosting.lumexdigital.co.ke/" target="_blank" rel="noopener noreferrer">Buy Hosting & Domain</a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Available now */}
    <section className="py-16 relative">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-background">Available now</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {ready.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-3xl p-8 border border-secondary/30 bg-background/5 backdrop-blur-md hover:bg-background/10 transition-all"
              style={{ boxShadow: "0 20px 60px hsl(22 95% 55% / .15)" }}
            >
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                  <p.Icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 bg-lumex-green/20 text-[hsl(var(--lumex-green))] text-xs font-bold px-2.5 py-1 rounded-full mb-2">
                    LIVE
                  </div>
                  <h3 className="text-xl font-bold text-background mb-2">{p.name}</h3>
                  <p className="text-background/70 text-sm mb-4">{p.desc}</p>
                  <span className="inline-flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
                    Open demo <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        <AdminAddedItems collectionName="software" dark />
        <a href="https://softwareworld.co.ke/" target="_blank" rel="noopener noreferrer"
          className="mt-10 flex flex-col sm:flex-row items-center gap-6 rounded-2xl bg-background/10 border border-background/20 hover:border-secondary p-6 transition-all">
          <div className="w-28 h-20 bg-background rounded-xl flex items-center justify-center shrink-0">
            <img src={softwareWorldLogo} alt="Software World logo" className="max-h-16 w-auto object-contain" loading="lazy" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-background text-xl">More software by our group — Software World</h3>
            <p className="text-background/70 text-sm mt-1">We build more software under our Software World trade name. Visit softwareworld.co.ke <ExternalLink className="w-3.5 h-3.5 inline" /></p>
          </div>
        </a>
      </div>
    </section>


    {/* Coming soon */}
    <section className="py-16 relative">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-background">Coming soon</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {coming.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl p-5 border border-primary/30 bg-background/5 backdrop-blur"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-3">
                <p.Icon className="w-5 h-5" />
              </div>
              <div className="inline-flex items-center gap-1.5 bg-secondary/20 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                <Clock className="w-3 h-3" /> SOON
              </div>
              <h3 className="font-bold text-background">{p.name}</h3>
              <p className="text-background/60 text-xs mt-1">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl p-10 md:p-14 relative overflow-hidden lumex-gradient-bg text-white">
          <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-6">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold mb-2">Need a custom system?</h3>
              <p className="opacity-90">We build tailor-made business software for your exact workflow.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Get a Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <a href="https://hosting.lumexdigital.co.ke/" target="_blank" rel="noopener noreferrer">Buy Hosting</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default SoftwareProducts;
