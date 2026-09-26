import { useEffect, useRef, useState } from "react";

const lines = [
  { p: "$ ", c: "system-status --all", out: "[OK] All systems operational. Score: 98/100" },
  { p: "$ ", c: "nmap -sV --script vuln target.co.ke", out: "[*] Scanning 1024 ports...\n[+] 443/tcp open  https  Apache 2.4.52\n[!] CVE-2024-3094: XZ Utils backdoor detected" },
  { p: "$ ", c: "lumex-shield --activate --mode=aggressive", out: "[OK] Firewall rules updated: 847 rules loaded\n[OK] WAF enabled: SQL injection filter active\n[OK] DDoS protection: Layer 7 mitigation ON" },
  { p: "$ ", c: "vpn-tunnel --encrypt AES-256 --connect", out: "[OK] Tunnel established  ::  198.51.100.7  ::  AES-256-GCM" },
  { p: "$ ", c: "recover-account --platform=instagram --verify-2fa", out: "[OK] Account recovered: 2FA enabled" },
];

const TerminalAnimation = () => {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [showOut, setShowOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = lines[step % lines.length];
    setTyped(""); setShowOut(false);
    let i = 0;
    const typer = setInterval(() => {
      i++;
      setTyped(cur.c.slice(0, i));
      if (i >= cur.c.length) {
        clearInterval(typer);
        setTimeout(() => setShowOut(true), 250);
        setTimeout(() => setStep((s) => s + 1), 2600);
      }
    }, 35);
    return () => clearInterval(typer);
  }, [step]);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [typed, showOut]);

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-black/70 backdrop-blur shadow-2xl shadow-emerald-500/10 overflow-hidden font-mono text-[13px]">
      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-3 text-emerald-300/60 text-xs">lumex@cybersec:~</span>
      </div>
      <div ref={ref} className="p-4 h-56 overflow-hidden text-emerald-300">
        {lines.slice(0, step).map((l, i) => (
          <div key={i} className="mb-2 opacity-70">
            <div><span className="text-emerald-500">{l.p}</span>{l.c}</div>
            <pre className="text-emerald-200/80 whitespace-pre-wrap text-[12px]">{l.out}</pre>
          </div>
        ))}
        <div>
          <span className="text-emerald-500">{lines[step % lines.length].p}</span>
          {typed}
          <span className="inline-block w-2 h-4 bg-emerald-400 align-middle ml-0.5 animate-pulse" />
        </div>
        {showOut && (
          <pre className="text-emerald-200/80 whitespace-pre-wrap text-[12px] mt-1">{lines[step % lines.length].out}</pre>
        )}
      </div>
    </div>
  );
};

export default TerminalAnimation;
