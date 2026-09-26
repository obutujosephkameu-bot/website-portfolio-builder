import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
 Shield, Lock, Eye, FileSearch, AlertTriangle, ShieldCheck, KeyRound, Terminal, Zap,
 Globe, Wifi, Smartphone, Server, Mail, Cloud, Bug, Activity, Database, Users, BookOpen, Radio,
} from "lucide-react";
import MatrixRain from "@/components/cyber/MatrixRain";
import { CircuitPattern, ScanLine, HexGrid, DataStream, BinaryFloat } from "@/components/cyber/CyberEffects";
import TerminalAnimation from "@/components/cyber/TerminalAnimation";
import SecurityTools from "@/components/cyber/SecurityTools";
import CountUp from "@/components/effects/CountUp";

const stats = [
 { n: 500, suffix: "+", label: "Threats Blocked Daily" },
 { n: 99.9, suffix: "%", label: "Uptime Guarantee", decimals: 1 },
 { n: 50, suffix: "+", label: "Security Experts" },
 { n: 200, suffix: "+", label: "Clients Protected" },
 { n: 1200, suffix: "+", label: "Accounts Recovered" },
 { n: 300, suffix: "+", label: "VPNs Deployed" },
];

const allServices = [
 { Icon: FileSearch, title: "Website Security Audit", desc: "Comprehensive analysis of vulnerabilities, misconfigurations and security gaps with detailed remediation reports." },
 { Icon: Bug, title: "Penetration Testing", desc: "Simulated real-world attacks to identify exploitable vulnerabilities before malicious hackers find them." },
 { Icon: Shield, title: "Malware Detection & Removal", desc: "Advanced scanning and removal of viruses, trojans, ransomware, and other malicious software." },
 { Icon: Server, title: "Server & Network Hardening", desc: "Fortify servers and networks with secure configurations, patch management and access controls." },
 { Icon: Lock, title: "Firewall Setup & Management", desc: "Enterprise-grade firewall deployment and 24/7 monitoring to block unauthorized access and threats." },
 { Icon: Mail, title: "Phishing Protection & Awareness", desc: "Email security and employee training to prevent social engineering and phishing attacks." },
 { Icon: Activity, title: "DDoS Mitigation & Protection", desc: "Advanced DDoS protection to keep your services online during volumetric and application-layer attacks." },
 { Icon: AlertTriangle, title: "Vulnerability Scanning", desc: "Automated and manual scanning to discover weaknesses before attackers exploit them." },
 { Icon: ShieldCheck, title: "SSL / HTTPS Implementation", desc: "Secure your sites with SSL certificates, enforce HTTPS, and protect data in transit with encryption." },
 { Icon: Mail, title: "Email Security & Spam Filtering", desc: "Enterprise email protection with advanced spam filtering, DMARC, SPF, and DKIM implementation." },
 { Icon: Eye, title: "Security Monitoring & IR", desc: "24/7 surveillance with instant threat detection, alerting, and rapid incident response." },
 { Icon: Database, title: "Data Encryption & Backups", desc: "End-to-end encryption for data at rest and in transit plus automated secure backup solutions." },
 { Icon: Smartphone, title: "Endpoint Security & Antivirus", desc: "Premium antivirus deployment, real-time threat detection, and endpoint security across devices." },
 { Icon: Cloud, title: "Cloud Security Services", desc: "Secure your cloud on AWS, Azure, and GCP with proper IAM, encryption, and compliance controls." },
 { Icon: KeyRound, title: "Identity & Access Management", desc: "SSO, MFA, role-based access control, and privileged access management — done right." },
 { Icon: Wifi, title: "IoT Security Services", desc: "Protect IoT devices with firmware security, network segmentation, and continuous monitoring." },
 { Icon: ShieldCheck, title: "Compliance & Audits", desc: "ISO 27001, PCI DSS, GDPR, HIPAA, and other regulatory security standards." },
 { Icon: Users, title: "Security Awareness Training", desc: "Train employees to recognize threats, avoid phishing, and follow cybersecurity best practices." },
 { Icon: Smartphone, title: "Mobile Device Security", desc: "Secure smartphones and tablets with MDM solutions, app security, and mobile threat defense." },
 { Icon: Radio, title: "Threat Intelligence & Reporting", desc: "Real-time threat intelligence feeds, security analytics, and comprehensive reporting dashboards." },
];

const tools = ["CrowdStrike", "Wazuh", "Splunk", "Kali Linux", "Burp Suite", "Cloudflare", "Okta", "1Password", "Snyk", "Metasploit", "Nessus", "OpenVAS", "Suricata"];

const recoverySteps = [
 { n: "01", title: "Report", desc: "Tell us which account was hacked and provide details." },
 { n: "02", title: "Investigate", desc: "Our team analyzes the breach and identifies the attack vector." },
 { n: "03", title: "Recover & Secure", desc: "We recover your account and set up 2FA + security measures." },
];

const liveStats = [
 { n: 12847, label: "Active Threats Detected", trend: "+3.2% this week" },
 { n: 45291, label: "Attacks Blocked Today", trend: "+12.8% this week" },
 { n: 8934, label: "Vulnerabilities Patched", trend: "+5.1% this week" },
];

const categories = ["Websites", "VPN", "Antivirus", "Social Media Recovery", "Networks"];

const blog = [
 { tag: "Threat Intel", date: "Mar 2025", title: "Top 10 Hacking Techniques in 2025" },
 { tag: "Web Security", date: "Feb 2025", title: "How to Secure Your WordPress Site" },
 { tag: "Awareness", date: "Jan 2025", title: "Phishing Red Flags Every Employee Must Know" },
];

const CyberSecurity = () => (
 <Layout bg="none">
 <div className="fixed inset-0 bg-[#020617] z-0" />

 {/* HERO */}
 <section className="relative overflow-hidden py-24 md:py-32 text-emerald-50">
 <MatrixRain />
 <CircuitPattern color="rgba(16, 185, 129, 0.14)" />
 <ScanLine duration={5} />
 <HexGrid opacity={0.06} />
 <BinaryFloat />

 <div className="container mx-auto px-4 relative z-10">
 <div className="grid lg:grid-cols-2 gap-12 items-center">
 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
 <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full px-4 py-2 mb-6 text-sm font-mono">
 <Terminal className="w-4 h-4" /> root@lumex:~# secure --all
 </div>
 <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.05]">
 Cybersecurity &amp;<br />
 <span className="text-emerald-400">Digital Protection</span>
 </h1>
 <p className="text-lg md:text-xl text-emerald-100/70 mb-8 max-w-2xl">
 Africa's leading cybersecurity firm. We protect websites, recover hacked accounts,
 deploy VPNs, and secure your digital world.
 </p>
 <div className="flex flex-wrap gap-3 mb-8">
 <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold" asChild>
 <Link to="/contact">Get Protected Now</Link>
 </Button>
 <Button size="lg" variant="outline" className="bg-emerald-500/5 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10" asChild>
 <Link to="/contact">Request Security Audit</Link>
 </Button>
 </div>
 <div className="flex flex-wrap gap-2">
 {categories.map((c) => (
 <span key={c} className="px-3 py-1.5 text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300">
 {c}
 </span>
 ))}
 </div>
 <div className="mt-8 max-w-xl">
 <DataStream />
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, x: 30 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.2 }}
 >
 <TerminalAnimation />
 </motion.div>
 </div>
 </div>
 </section>

 {/* Stats */}
 <section className="relative py-16 text-emerald-50 border-t border-emerald-500/10">
 <CircuitPattern color="rgba(16, 185, 129, 0.07)" />
 <div className="container mx-auto px-4 relative z-10">
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
 {stats.map((s, i) => (
 <motion.div
 key={s.label}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.05 }}
 className="text-center bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4"
 >
 <div className="text-2xl md:text-3xl font-bold text-emerald-400 font-mono">
 <CountUp end={s.n} suffix={s.suffix} decimals={(s as any).decimals || 0} />
 </div>
 <div className="text-xs text-emerald-100/60 mt-1">{s.label}</div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* Digital Protection Tools */}
 <section className="relative py-20 text-emerald-50 border-t border-emerald-500/10">
 <HexGrid opacity={0.05} />
 <div className="container mx-auto px-4 relative z-10">
 <div className="text-center mb-12">
 <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs mb-2">
 <Zap className="w-4 h-4" /> ./digital-protection
 </div>
 <h2 className="text-3xl md:text-5xl font-bold mb-3">VPN &amp; Antivirus Solutions</h2>
 <p className="text-emerald-100/60 max-w-2xl mx-auto">Enterprise-grade digital protection tools for businesses and individuals.</p>
 </div>
 <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
 <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-2xl p-7 hover:border-emerald-400/60 transition-colors">
 <div className="flex items-center gap-3 mb-4">
 <Lock className="w-8 h-8 text-emerald-400" />
 <h3 className="text-2xl font-bold">VPN Protection</h3>
 </div>
 <ul className="space-y-2 text-emerald-100/70 text-sm mb-6">
 <li> AES-256 Military-Grade Encryption</li>
 <li> Unlimited Bandwidth &amp; Speed</li>
 <li> No-Log Privacy Policy</li>
 <li> Multi-Device Support</li>
 <li> Secure Remote Team Access</li>
 </ul>
 <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold" asChild>
 <Link to="/contact">Get VPN Setup</Link>
 </Button>
 </div>
 <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-2xl p-7 hover:border-emerald-400/60 transition-colors">
 <div className="flex items-center gap-3 mb-4">
 <Shield className="w-8 h-8 text-emerald-400" />
 <h3 className="text-2xl font-bold">Antivirus &amp; Endpoint Security</h3>
 </div>
 <ul className="space-y-2 text-emerald-100/70 text-sm mb-6">
 <li> Real-Time Threat Detection</li>
 <li> 2.8M+ Virus Definitions</li>
 <li> Ransomware Protection</li>
 <li> Automatic Updates &amp; Scanning</li>
 <li> Windows, Mac, Android, iOS</li>
 </ul>
 <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold" asChild>
 <Link to="/contact">Get Antivirus</Link>
 </Button>
 </div>
 </div>
 </div>
 </section>

 {/* Account Recovery */}
 <section className="relative py-20 text-emerald-50 border-t border-emerald-500/10">
 <ScanLine duration={6} />
 <div className="container mx-auto px-4 relative z-10">
 <div className="max-w-5xl mx-auto">
 <div className="text-center mb-10">
 <div className="text-emerald-400 font-mono text-xs mb-2">./account-recovery</div>
 <h2 className="text-3xl md:text-5xl font-bold mb-3">Hacked Social Media? We Recover It.</h2>
 <p className="text-emerald-100/60">Lost access to your accounts? Our team specializes in recovery across all platforms.</p>
 </div>
 <div className="flex flex-wrap justify-center gap-3 mb-12">
 {["Instagram", "Facebook", "Twitter / X", "TikTok", "WhatsApp", "Gmail"].map((p) => (
 <span key={p} className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm font-mono text-emerald-300">{p}</span>
 ))}
 </div>
 <div className="grid md:grid-cols-3 gap-6">
 {recoverySteps.map((s, i) => (
 <motion.div
 key={s.n}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="border border-emerald-500/20 rounded-2xl p-6 bg-emerald-500/5"
 >
 <div className="text-5xl font-bold text-emerald-400/40 font-mono mb-2">{s.n}</div>
 <h3 className="text-xl font-bold mb-2">{s.title}</h3>
 <p className="text-emerald-100/60 text-sm">{s.desc}</p>
 </motion.div>
 ))}
 </div>
 <div className="text-center mt-10">
 <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold" asChild>
 <Link to="/contact">Report Hacked Account Now</Link>
 </Button>
 </div>
 </div>
 </div>
 </section>

 {/* All cybersecurity services */}
 <section className="relative py-20 text-emerald-50 border-t border-emerald-500/10">
 <CircuitPattern color="rgba(16, 185, 129, 0.06)" />
 <div className="container mx-auto px-4 relative z-10">
 <div className="text-center mb-12">
 <div className="text-emerald-400 font-mono text-xs mb-2">./full-service-suite</div>
 <h2 className="text-3xl md:text-5xl font-bold mb-3">All Cybersecurity Services</h2>
 <p className="text-emerald-100/60 max-w-2xl mx-auto">Comprehensive security solutions to protect your digital assets.</p>
 </div>
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
 {allServices.map((s, i) => (
 <motion.div
 key={s.title}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: (i % 6) * 0.04 }}
 whileHover={{ y: -4 }}
 className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 hover:border-emerald-400/60 hover:bg-emerald-500/10 transition-all group"
 >
 <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
 <s.Icon className="w-5 h-5" />
 </div>
 <h3 className="font-bold text-base mb-1.5 text-emerald-50">{s.title}</h3>
 <p className="text-emerald-100/60 text-xs leading-relaxed">{s.desc}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* Security Framework */}
 <section className="relative py-20 text-emerald-50 border-t border-emerald-500/10">
 <div className="container mx-auto px-4 relative z-10">
 <div className="text-center mb-12">
 <div className="text-emerald-400 font-mono text-xs mb-2">./framework</div>
 <h2 className="text-3xl md:text-5xl font-bold mb-3">Lumex Managed Security Services</h2>
 <p className="text-emerald-100/60">Anticipate · Detect · Respond · Contain</p>
 </div>
 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
 {[
 { step: "01", title: "Anticipate", desc: "Threat intelligence, risk assessment, and proactive vulnerability scanning." },
 { step: "02", title: "Detect", desc: "24/7 SIEM, endpoint detection, and anomaly hunting across your stack." },
 { step: "03", title: "Respond", desc: "Playbook-driven incident response, containment, and rapid recovery." },
 { step: "04", title: "Contain", desc: "Forensics, remediation, and hardening to prevent re-infection." },
 ].map((p, i) => (
 <motion.div
 key={p.step}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.08 }}
 className="border border-emerald-500/20 rounded-2xl p-6 bg-emerald-500/5"
 >
 <div className="text-5xl font-bold text-emerald-400/50 font-mono mb-2">{p.step}</div>
 <h3 className="font-bold text-xl mb-2">{p.title}</h3>
 <p className="text-emerald-100/60 text-sm">{p.desc}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* Live threat intelligence */}
 <section className="relative py-20 text-emerald-50 border-t border-emerald-500/10">
 <div className="container mx-auto px-4 relative z-10">
 <div className="text-center mb-10">
 <div className="text-emerald-400 font-mono text-xs mb-2">./live-feed</div>
 <h2 className="text-3xl md:text-5xl font-bold mb-3">Live Cyber Threat Intelligence</h2>
 <p className="text-emerald-100/60">Real-time security statistics from our monitoring systems.</p>
 </div>
 <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
 {liveStats.map((s, i) => (
 <motion.div
 key={s.label}
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="border border-emerald-500/30 rounded-2xl p-6 bg-emerald-500/5 text-center"
 >
 <div className="text-4xl md:text-5xl font-bold text-emerald-400 font-mono mb-2">
 <CountUp end={s.n} />
 </div>
 <div className="text-emerald-100/70 mb-1">{s.label}</div>
 <div className="text-emerald-400/70 text-xs">{s.trend}</div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* Free security tools */}
 <SecurityTools />

 {/* Tools / arsenal */}
 <section className="relative py-16 text-emerald-50 border-t border-emerald-500/10">
 <div className="container mx-auto px-4 relative z-10 text-center">
 <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Arsenal</h2>
 <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
 {tools.map((t) => (
 <span key={t} className="px-4 py-2 bg-emerald-500/5 border border-emerald-500/30 rounded-full text-sm font-mono text-emerald-300 hover:bg-emerald-500/15 transition-colors">
 {t}
 </span>
 ))}
 </div>
 </div>
 </section>

 {/* Blog */}
 <section className="relative py-20 text-emerald-50 border-t border-emerald-500/10">
 <div className="container mx-auto px-4 relative z-10">
 <div className="text-center mb-10">
 <div className="text-emerald-400 font-mono text-xs mb-2">./knowledge-base</div>
 <h2 className="text-3xl md:text-5xl font-bold mb-3">Cyber Threat Intelligence Blog</h2>
 <p className="text-emerald-100/60">Stay informed with the latest cybersecurity news.</p>
 </div>
 <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
 {blog.map((b, i) => (
 <motion.div
 key={b.title}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.08 }}
 className="border border-emerald-500/20 rounded-2xl p-6 bg-emerald-500/5 hover:border-emerald-400/60 transition-colors"
 >
 <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3">
 <BookOpen className="w-3.5 h-3.5" />
 <span>{b.tag}</span>
 <span className="text-emerald-100/40">·</span>
 <span className="text-emerald-100/40">{b.date}</span>
 </div>
 <h3 className="text-lg font-bold mb-3">{b.title}</h3>
 <Link to="/contact" className="text-emerald-400 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
 Read more →
 </Link>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* CTA */}
 <section className="relative py-20 text-emerald-50 border-t border-emerald-500/10">
 <div className="container mx-auto px-4">
 <div className="rounded-3xl border-2 border-emerald-500/40 bg-emerald-500/10 p-10 md:p-14 text-center relative overflow-hidden">
 <ScanLine duration={4} />
 <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4 relative z-10" />
 <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10">Lock down your business today.</h2>
 <p className="text-emerald-100/70 mb-8 max-w-2xl mx-auto relative z-10">
 Free 30-minute consultation. We'll outline your top 3 risks and a 90-day roadmap.
 </p>
 <div className="flex flex-wrap gap-3 justify-center relative z-10">
 <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold" asChild>
 <Link to="/contact">Book Free Consultation</Link>
 </Button>
 <Button size="lg" variant="outline" className="bg-emerald-500/5 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10" asChild>
 <a href="https://wa.me/254706387820" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
 </Button>
 </div>
 </div>
 </div>
 </section>
 </Layout>
);

export default CyberSecurity;
