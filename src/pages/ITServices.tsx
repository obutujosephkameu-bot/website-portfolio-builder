import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Globe2, Wrench, Monitor, HardDrive, Wifi, ShieldCheck, Printer } from "lucide-react";
import FloatingBubbles from "@/components/effects/FloatingBubbles";

const downloads = [
  { name: "Microsoft Office Suite", desc: "Word, Excel, PowerPoint installation.", url: "https://www.microsoft.com/microsoft-365/try" },
  { name: "Adobe Creative Cloud", desc: "Photoshop, Illustrator, Premiere.", url: "https://www.adobe.com/creativecloud.html" },
  { name: "AutoCAD", desc: "Engineering & architectural design.", url: "https://www.autodesk.com/products/autocad/free-trial" },
  { name: "QuickBooks", desc: "Accounting & business finance.", url: "https://quickbooks.intuit.com/" },
  { name: "Antivirus (Bitdefender)", desc: "Premium protection for PC & Mac.", url: "https://www.bitdefender.com/" },
  { name: "Zoom & Teams", desc: "Meetings, collaboration, calls.", url: "https://zoom.us/download" },
];

const services = [
  { Icon: Monitor, title: "Computer Setup & Repair", desc: "Diagnostics, OS installs, hardware fixes." },
  { Icon: Wifi, title: "Networking & WiFi", desc: "Office WiFi, routers, LAN cabling." },
  { Icon: HardDrive, title: "Data Recovery & Backup", desc: "Lost data recovery and cloud backup." },
  { Icon: Printer, title: "Printer & Peripheral Support", desc: "Setup, drivers, sharing on networks." },
  { Icon: ShieldCheck, title: "Antivirus & Cleanup", desc: "Virus removal, system optimization." },
  { Icon: Wrench, title: "On-site & Remote Support", desc: "We come to you or fix it remotely." },
];

const ITServices = () => (
  <Layout bg="orange">
    {/* Hero */}
    <section className="relative overflow-hidden py-20 md:py-28">
      <FloatingBubbles count={10} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-secondary/15 text-secondary border border-secondary/30 rounded-full px-4 py-2 mb-6 text-sm font-semibold">
            <Wrench className="w-4 h-4" /> IT &amp; Computer Services
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Your business runs on tech. <span className="lumex-heading-orange">We keep it running.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Hardware, networks, software installs, domain registration, antivirus, and remote support — all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="https://hosting.lumexdigital.co.ke/" target="_blank" rel="noopener noreferrer">
                <Globe2 className="w-4 h-4 mr-2" /> Buy Hosting & Domain
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild><Link to="/software-products">Buy Software</Link></Button>
            <Button size="lg" variant="ghost" asChild><Link to="/contact">Request Support</Link></Button>
          </div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">What we handle</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="lumex-card-glow bg-card border border-border rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center mb-4">
                <s.Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Software Downloads */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
            <Download className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Software downloads &amp; installs</h2>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          We help you safely install genuine software for your office or home. Click any item below to start, or contact us to install for you.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {downloads.map((d, i) => (
            <motion.a
              key={d.name}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="lumex-card-glow group bg-card border border-border rounded-2xl p-6 flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{d.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{d.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>

    {/* Buy a Domain */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-[auto_1fr_auto] items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center">
              <Globe2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Buy a domain</h3>
              <p className="text-background/75">
                Register .co.ke, .com, .net, .org and more. We handle DNS, email, and hosting setup.
              </p>
            </div>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
              <a href="https://hosting.lumexdigital.co.ke/" target="_blank" rel="noopener noreferrer">Buy Hosting & Domain</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default ITServices;
