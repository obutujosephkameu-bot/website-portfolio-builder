import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Briefcase, Code2, Smartphone, Shield, Megaphone, GraduationCap, ArrowRight, MapPin } from "lucide-react";

const roles = [
  { icon: Code2, title: "Web Developer (React / WordPress)", type: "Full-time · Nairobi / Remote" },
  { icon: Smartphone, title: "Mobile App Developer", type: "Full-time · Nairobi / Remote" },
  { icon: Briefcase, title: "Software Engineer — Software World", type: "Full-time · Nairobi" },
  { icon: Shield, title: "Cyber Security Analyst", type: "Contract · Nairobi" },
  { icon: Megaphone, title: "Sales & Marketing Executive", type: "Commission · Countrywide" },
  { icon: GraduationCap, title: "Internship / Attachment", type: "3–6 months · Nairobi" },
];

const Careers = () => {
  useEffect(() => {
    document.title = "Careers at Lumex Digital | Tech Jobs in Kenya";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Join Lumex Digital and Software World. Open roles for web developers, app developers, software engineers, cyber security and sales in Kenya."
    );
  }, []);

  return (
    <Layout>
      <section className="lumex-dark-bg py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block rounded-full border border-secondary/40 bg-secondary/15 px-4 py-2 text-sm font-semibold text-secondary mb-6">
            Careers · Since 2010
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-background mb-5">Build Africa's digital future with us</h1>
          <p className="text-lg text-background/75 max-w-2xl mx-auto">
            Work with Lumex Digital and our software-building department, Software World, on websites, apps and systems used across Kenya.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Open positions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map(({ icon: Icon, title, type }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-5">
                  <MapPin className="w-4 h-4" /> {type}
                </p>
                <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full">
                  <Link to="/join-us">Apply now <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-12">
            Don't see your role? Email your CV to{" "}
            <a href="mailto:info@lumexdigital.co.ke" className="text-primary font-semibold">info@lumexdigital.co.ke</a>.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
