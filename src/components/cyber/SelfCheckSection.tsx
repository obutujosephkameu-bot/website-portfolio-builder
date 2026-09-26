import { motion } from "framer-motion";
import { Shield, Terminal, Wifi, WifiOff, Activity, Cpu, Users, Clock, Search, AlertTriangle, ChevronRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CircuitPattern, HexGrid } from "@/components/cyber/CyberEffects";

const CodeBlock = ({ code, label }: { code: string; label?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {label && <p className="text-[10px] text-gray-400 font-mono mb-1 uppercase tracking-wider">{label}</p>}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 font-mono text-sm text-emerald-400 overflow-x-auto">
        <pre className="whitespace-pre-wrap">{code}</pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
          title="Copy command"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
        </button>
      </div>
    </div>
  );
};

const steps = [
  {
    icon: Terminal,
    title: "How to Open CMD",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    description: "Press Windows + R, type cmd, then press Enter. For admin privileges (needed for some commands), right-click Command Prompt and select \"Run as administrator\".",
    commands: [
      { label: "Open Run Dialog", code: "Windows + R → type \"cmd\" → Enter" },
    ],
  },
  {
    icon: WifiOff,
    title: "Disconnect from Network / Wi-Fi",
    color: "bg-red-50 text-red-600 border-red-100",
    description: "If you suspect a hack, disconnect immediately. You can turn off Wi-Fi from the taskbar, or use CMD to disable your network adapter.",
    commands: [
      { label: "Disable Wi-Fi", code: "netsh interface set interface \"Wi-Fi\" admin=disabled" },
      { label: "Re-enable Wi-Fi", code: "netsh interface set interface \"Wi-Fi\" admin=enabled" },
    ],
  },
  {
    icon: Activity,
    title: "Check Active Network Connections",
    color: "bg-orange-50 text-orange-600 border-orange-100",
    description: "This shows all active connections and which process is using them. Look for unknown IP addresses or suspicious connections to foreign servers.",
    commands: [
      { label: "View all connections with process IDs", code: "netstat -ano" },
      { label: "Find the process behind a connection (replace <PID>)", code: "tasklist | findstr <PID>" },
    ],
  },
  {
    icon: Cpu,
    title: "View Running Processes",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    description: "Lists all running programs. Look for unknown processes, misspelled system names (like \"svchost\" vs \"svch0st\"), or anything using unusually high resources.",
    commands: [
      { label: "List all running processes", code: "tasklist" },
      { label: "Sort by memory usage", code: "tasklist /fi \"memusage gt 50000\"" },
    ],
  },
  {
    icon: Wifi,
    title: "Check Startup Programs",
    color: "bg-cyan-50 text-cyan-600 border-cyan-100",
    description: "Shows which programs launch automatically when Windows starts. Hackers often hide malware here to maintain persistence after reboots.",
    commands: [
      { label: "View all startup programs", code: "wmic startup get caption,command" },
    ],
  },
  {
    icon: Users,
    title: "Check Logged-in Users",
    color: "bg-pink-50 text-pink-600 border-pink-100",
    description: "Lists all user accounts on your computer. Look for any accounts you didn't create — hackers sometimes add hidden admin accounts for backdoor access.",
    commands: [
      { label: "View all user accounts", code: "net user" },
      { label: "View detailed info about a user", code: "net user <username>" },
    ],
  },
  {
    icon: Clock,
    title: "Check Scheduled Tasks",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    description: "Scheduled tasks can run programs at specific times. Malware often creates scheduled tasks to re-install itself or execute malicious code periodically.",
    commands: [
      { label: "View all scheduled tasks", code: "schtasks" },
      { label: "Delete a suspicious task", code: "schtasks /delete /tn \"<taskname>\" /f" },
    ],
  },
  {
    icon: Search,
    title: "Scan System File Integrity",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    description: "System File Checker (SFC) scans all protected Windows system files and replaces corrupted ones. Malware often modifies these files to hide itself.",
    commands: [
      { label: "Run system file checker (requires admin CMD)", code: "sfc /scannow" },
    ],
  },
];

const SelfCheckSection = () => {
  return (
    <section className="py-20 bg-[#0D0D0D] relative overflow-hidden">
      <CircuitPattern color="rgba(0, 255, 65, 0.06)" />
      <HexGrid opacity={0.04} />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-cyan-500/5" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold mb-4 border border-emerald-500/20">
            DIY Security Check
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Quick Self-Check: <span className="text-emerald-400">Is Your Computer Compromised?</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            If you suspect your computer may be hacked, perform these simple checks using Windows Command Prompt (CMD). 
            They help you inspect network connections, running processes, startup programs, and system integrity.
          </p>
        </motion.div>

        {/* Disclaimer bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-6 py-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-cyan-200 text-sm">
              <strong>Note:</strong> These steps don't replace professional security analysis but can catch suspicious activity early. 
              If you're unsure about any results, contact our cybersecurity team immediately.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <Card className="bg-gray-900/80 border border-gray-700/50 shadow-md hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 flex flex-col items-center gap-2">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Step {i + 1}</span>
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${step.color}`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  {/* Commands */}
                  <div className="space-y-3 ml-0 md:ml-[72px]">
                    {step.commands.map((cmd) => (
                      <CodeBlock key={cmd.code} code={cmd.code} label={cmd.label} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-10"
        >
          <Card className="border border-amber-500/30 bg-amber-500/10 shadow-lg">
            <CardContent className="p-6 md:p-8 flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-amber-300 mb-1">Found Something Suspicious?</h4>
                <p className="text-amber-200/80 text-sm leading-relaxed">
                  If you discover unknown user accounts, suspicious network connections, unfamiliar startup programs, or corrupted system files — 
                  <strong className="text-amber-200"> keep your PC offline</strong> and contact our cybersecurity team immediately for a full professional security audit. 
                  Do not attempt to delete system files on your own.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]" asChild>
            <Link to="/contact">
              <Shield className="w-5 h-5 mr-2" /> Request a Professional Security Audit
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <p className="text-gray-500 text-sm mt-3">Our experts will perform a comprehensive analysis of your system</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SelfCheckSection;
