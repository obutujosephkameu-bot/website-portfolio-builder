import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import SearchButton from "@/components/layout/SearchButton";

interface DropdownItem { href: string; label: string; }
interface NavItem { href?: string; label: string; dropdown?: DropdownItem[]; }

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Services",
    dropdown: [
      { href: "/website-development", label: "Website Development" },
      { href: "/app-development", label: "App Development" },
      { href: "/software-development", label: "Software Development" },
      { href: "/software-products", label: "Buy Software / Systems" },
      { href: "/management-system-kenya", label: "LUM-EX Management System" },
      { href: "/cybersecurity", label: "Cyber Security" },
      { href: "/it-services", label: "IT & Computer Services" },
      { href: "/website-classes", label: "Website Dev Classes" },
    ],
  },
  { href: "/pricing-packages", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-foreground text-background text-xs text-center py-1.5 hidden sm:block">
        <a href="tel:+254706387820" className="font-semibold hover:text-secondary transition-colors">Call 0706 387 820</a>
        <span className="mx-2 opacity-50">|</span>
        <a href="mailto:info@lumexdigital.co.ke" className="hover:text-secondary transition-colors">info@lumexdigital.co.ke</a>
      </div>
      <div className="bg-background/90 backdrop-blur-xl border-b border-border">
        <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img src={logo} alt="Lumex Digital — Best website developers in Kenya" className="h-10 md:h-12 w-auto group-hover:animate-logo-pulse transition-transform" width="48" height="48" decoding="async" />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDrop(link.label)}
                  onMouseLeave={() => setOpenDrop(null)}
                >
                  <button className="font-medium text-sm text-foreground/80 hover:text-primary flex items-center gap-1 transition-colors">
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDrop === link.label ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openDrop === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                      >
                        <div className="bg-card border border-border rounded-2xl shadow-xl p-2 min-w-[240px]">
                          {link.dropdown.map((sub) => (
                            <Link
                              key={sub.href}
                              to={sub.href}
                              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${
                                location.pathname === sub.href ? "text-primary bg-primary/5" : "text-foreground/80"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href!}
                  className={`font-medium text-sm transition-colors hover:text-primary ${
                    location.pathname === link.href ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <SearchButton />
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <SearchButton />
            <button className="p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.label} className="py-1">
                      <div className="font-semibold text-sm text-foreground py-2">{link.label}</div>
                      <div className="pl-3 flex flex-col">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="py-2 text-sm text-foreground/70 hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href!}
                      onClick={() => setIsOpen(false)}
                      className="font-medium py-2 text-foreground/80 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <Button asChild className="mt-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>Get a Quote</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
