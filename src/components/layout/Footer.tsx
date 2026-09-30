import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import footerLogo from "@/assets/logo-footer.png";
import VisitorReviews from "./VisitorReviews";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <img src={footerLogo} alt="Lumex Digital — Kenya websites, apps, software, hosting & cyber security" className="h-14 w-auto mb-4 brightness-0 invert" loading="lazy" decoding="async" />
            <p className="text-background/70 mb-3 text-sm">
              Engineering websites, apps, software, and security for businesses across Kenya and Africa.
            </p>
            <p className="text-background/70 text-sm">
              <a href="tel:+254706387820" className="hover:text-secondary font-semibold">Call 0706 387 820</a>
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-secondary flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-secondary">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/web-design-kenya" className="text-background/70 hover:text-secondary">Web Design Kenya</Link></li>
              <li><Link to="/mobile-app-development-kenya" className="text-background/70 hover:text-secondary">Mobile App Development Kenya</Link></li>
              <li><Link to="/software-development-kenya" className="text-background/70 hover:text-secondary">Software Development Kenya</Link></li>
              <li><Link to="/school-management-system-kenya" className="text-background/70 hover:text-secondary">School Management System Kenya</Link></li>
              <li><Link to="/business-systems-kenya" className="text-background/70 hover:text-secondary">Business Systems Kenya</Link></li>
              <li><Link to="/web-hosting-kenya" className="text-background/70 hover:text-secondary">Web Hosting Kenya</Link></li>
              <li><Link to="/seo-services-kenya" className="text-background/70 hover:text-secondary">SEO Services Kenya</Link></li>
              <li><Link to="/management-system-kenya" className="text-background/70 hover:text-secondary">LUM-EX Management System</Link></li>
              <li><Link to="/cybersecurity" className="text-background/70 hover:text-secondary">Cyber Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-secondary">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-background/70 hover:text-secondary">Home</Link></li>
              <li><Link to="/about" className="text-background/70 hover:text-secondary">About</Link></li>
              <li><Link to="/portfolio" className="text-background/70 hover:text-secondary">Portfolio</Link></li>
              <li><Link to="/blog" className="text-background/70 hover:text-secondary">Blog</Link></li>
              <li><Link to="/pricing-packages" className="text-background/70 hover:text-secondary">Pricing</Link></li>
              <li><Link to="/contact" className="text-background/70 hover:text-secondary">Contact</Link></li>
              <li><Link to="/careers" className="text-background/70 hover:text-secondary">Careers</Link></li>
              <li><a href="https://softwareworld.co.ke/" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-secondary">Software World (Our Group)</a></li>
              <li className="text-background/50 text-xs leading-relaxed">Software World (softwareworld.co.ke) is owned by Lumex Digital — our software-building department.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-secondary">Contact</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="https://wa.me/254706387820" className="hover:text-secondary">+254 706 387 820</a></li>
              <li><a href="mailto:info@lumexdigital.co.ke" className="hover:text-secondary">info@lumexdigital.co.ke</a></li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <VisitorReviews />
        <div className="border-t border-background/15 pt-8 text-center text-background/50 text-sm">
          © 2026 Lumex Digital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
