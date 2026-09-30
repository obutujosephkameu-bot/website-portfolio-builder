import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Cpu, Smartphone, Globe, Shield, AppWindow, Boxes } from "lucide-react";
import logo from "@/assets/logo.png";
import softwareWorldLogo from "@/assets/softwareworld-logo.png";
import Typewriter from "@/components/effects/Typewriter";
import CountUp from "@/components/effects/CountUp";
import FloatingBubbles from "@/components/effects/FloatingBubbles";

const HeroSection = () => {
  return (
    <section className="relative min-h-[94vh] flex items-center overflow-hidden">
      {/* Layered animated background */}
      <div className="absolute inset-0 lumex-dark-bg" />
      <div className="absolute inset-0 lumex-grid-bg opacity-70" />
      <FloatingBubbles count={32} />

      {/* 3D orbs */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-10 w-[520px] h-[520px] bg-secondary/60 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0], y: [0, 50, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[640px] h-[640px] bg-primary/60 rounded-full blur-3xl"
      />

      {/* Floating coding icons */}
      {[
        { Icon: Code2, x: "10%", y: "20%", d: 0 },
        { Icon: Cpu, x: "85%", y: "30%", d: 1 },
        { Icon: Smartphone, x: "15%", y: "75%", d: 2 },
        { Icon: Globe, x: "80%", y: "70%", d: 1.5 },
      ].map(({ Icon, x, y, d }, i) => (
        <motion.div
          key={i}
          className="absolute text-secondary/40"
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
              className="inline-flex items-center gap-2 bg-secondary/15 backdrop-blur-md border border-secondary/30 text-secondary rounded-full px-4 py-2 mb-6 text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              Engineering digital excellence since 2010
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6 px-5 py-3 rounded-2xl bg-gradient-to-r from-background/10 to-background/5 backdrop-blur border border-secondary/30 w-fit"
            >
              <span className="text-background/85 text-sm md:text-base font-semibold uppercase tracking-wide">Get a website from as low as</span>
              <span
                className="font-extrabold text-4xl md:text-6xl leading-none"
                style={{
                  background: "linear-gradient(180deg, #FFE27A 0%, #F5C518 35%, #B8860B 70%, #8B6508 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 2px 0 rgba(0,0,0,.25), 0 6px 18px rgba(245,197,24,.45)",
                  filter: "drop-shadow(0 4px 6px rgba(184,134,11,.6))",
                }}
              >
                KES 13,444/-
              </span>
              <span className="text-secondary text-sm md:text-base font-bold">+ FREE .co.ke domain</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-background mb-4 leading-[1.05]"
            >
              We build{" "}
              <span className="text-secondary block md:inline">
                <Typewriter words={["websites.", "mobile apps.", "software.", "secure systems."]} />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-background/75 mb-10 max-w-2xl"
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
              <Button size="lg" variant="outline" asChild className="bg-white/5 backdrop-blur border-white/20 text-background hover:bg-white/15 text-base h-14 px-8">
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
              className="mt-5 max-w-2xl"
            >
              <Button
                asChild
                className="group h-auto min-h-24 w-full justify-start whitespace-normal border border-secondary/50 bg-gradient-to-r from-primary via-primary to-secondary px-5 py-4 text-left text-primary-foreground shadow-xl shadow-primary/30 hover:scale-[1.01] hover:opacity-95 md:min-h-28 md:px-7"
              >
                <a href="https://softwareworld.co.ke/" target="_blank" rel="noopener noreferrer">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-background p-2 shadow-lg md:h-20 md:w-20">
                    <img src={softwareWorldLogo} alt="Software World logo" className="max-h-full max-w-full object-contain" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold uppercase text-primary-foreground/75 md:text-sm">
                      Our software-building department
                    </span>
                    <span className="mt-1 block text-xl font-bold md:text-3xl">Software World</span>
                    <span className="mt-1 block text-sm font-medium text-primary-foreground/80 md:text-base">
                      Explore the systems and software we create
                    </span>
                  </span>
                  <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1 md:h-8 md:w-8" />
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
                  <div className="text-3xl md:text-5xl font-bold text-secondary mb-1">
                    <CountUp end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-background/60">{stat.label}</div>
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
                <div className="absolute inset-0 rounded-full bg-secondary/30 blur-3xl" />
                <div className="absolute inset-10 rounded-full bg-primary/30 blur-2xl" />
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
