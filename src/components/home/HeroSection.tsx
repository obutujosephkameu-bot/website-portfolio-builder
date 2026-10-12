import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Cpu, Smartphone, Globe, Shield, AppWindow, Boxes } from "lucide-react";
import logo from "@/assets/logo.png";
import softwareWorldLogo from "@/assets/softwareworld-logo.png";
import Typewriter from "@/components/effects/Typewriter";
import CountUp from "@/components/effects/CountUp";
import FloatingBubbles from "@/components/effects/FloatingBubbles";
import bannerBackground from "@/assets/homepage-banner-background.png.asset.json";

const HeroSection = () => {
  return (
    <section className="relative min-h-[94vh] flex items-center overflow-hidden">
      <img src={bannerBackground.url} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <FloatingBubbles count={32} />

      {/* Floating coding icons */}
      {[
        { Icon: Code2, x: "10%", y: "20%", d: 0 },
        { Icon: Cpu, x: "85%", y: "30%", d: 1 },
        { Icon: Smartphone, x: "15%", y: "75%", d: 2 },
        { Icon: Globe, x: "80%", y: "70%", d: 1.5 },
      ].map(({ Icon, x, y, d }, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/60"
          style={{ left: x, top: y }}
          animate={{ y: [0, -22, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: d, ease: "easeInOut" }}
        >
          <Icon className="w-12 h-12 md:w-16 md:h-16" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-md border border-primary/30 text-primary rounded-full px-4 py-2 mb-6 text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              Engineering digital excellence since 2010
            </motion.div>


            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-lumex-dark mb-4 leading-[1.05]"
            >
              We build{" "}
              <span className="text-primary block md:inline">
                <Typewriter words={["websites.", "mobile apps.", "software.", "secure systems."]} />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-lumex-dark/80 mb-10 max-w-2xl"
            >
              Websites, mobile apps, custom software, cybersecurity, and IT services — engineered for businesses
              ready to scale across Kenya and Africa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base h-14 px-8 group">
                <Link to="/contact">
                  Start a Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-background/80 backdrop-blur border-primary/30 text-lumex-dark hover:bg-background text-base h-14 px-8">
                <Link to="/pricing-packages">View Pricing</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              <Button asChild className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white h-12 px-6 shadow-lg shadow-red-500/30">
                <Link to="/cybersecurity">
                  <Shield className="w-5 h-5" /> Cyber Security
                </Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-secondary to-orange-500 hover:opacity-90 text-secondary-foreground h-12 px-6 shadow-lg shadow-secondary/30">
                <Link to="/app-development">
                  <AppWindow className="w-5 h-5" /> App Development
                </Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 text-primary-foreground h-12 px-6 shadow-lg shadow-primary/30">
                <Link to="/software-development">
                  <Boxes className="w-5 h-5" /> Software Development
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-6 max-w-3xl"
            >
              <Button
                asChild
                className="group h-auto min-h-32 w-full justify-start whitespace-normal rounded-2xl border border-secondary/60 bg-gradient-to-r from-primary via-primary to-secondary px-6 py-6 text-left text-primary-foreground shadow-2xl shadow-primary/40 hover:scale-[1.01] hover:opacity-95 md:min-h-44 md:px-10 md:py-8"
              >
                <a href="https://softwareworld.co.ke/" target="_blank" rel="noopener noreferrer">
                  <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-background p-2.5 shadow-lg md:h-28 md:w-28 md:p-3">
                    <img src={softwareWorldLogo} alt="Software World logo" className="max-h-full max-w-full object-contain" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold uppercase text-primary-foreground/75 md:text-base">
                      Our software-building department
                    </span>
                    <span className="mt-1 block text-2xl font-bold md:text-5xl">Software World</span>
                    <span className="mt-2 block text-base font-semibold text-primary-foreground/90 md:text-2xl">
                      Get software for your school, company, or shop
                    </span>
                  </span>
                  <ArrowRight className="h-8 w-8 shrink-0 transition-transform group-hover:translate-x-1 md:h-12 md:w-12" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6 md:gap-12 mt-16 max-w-2xl"
            >
              {[
                { number: 300, suffix: "+", label: "Clients served" },
                { number: 500, suffix: "+", label: "Projects shipped" },
                { number: 7, suffix: "+", label: "Years building" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-5xl font-bold text-primary mb-1">
                    <CountUp end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-lumex-dark/75">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Big animated 3D logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <div className="relative w-[420px] h-[420px]" style={{ perspective: 1000 }}>
              <motion.div
                animate={{ rotateY: [0, 18, 0, -18, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-full relative"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-secondary/30 border-dashed"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 rounded-full border border-primary/30 border-dashed"
                />
                <img
                  src={logo}
                  alt="Lumex Digital"
                  className="relative w-full h-full object-contain animate-logo-pulse drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile logo */}
      <motion.img
        src={logo}
        alt="Lumex Digital"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="lg:hidden absolute -bottom-10 -right-10 w-[280px] opacity-30 animate-logo-pulse"
      />
    </section>
  );
};

export default HeroSection;
