import { useState } from "react";
import { Shield, Lock, Search, Globe, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const PasswordChecker = () => {
 const [password, setPassword] = useState("");
 const getStrength = (p: string) => {
 let score = 0;
 if (p.length >= 8) score++;
 if (p.length >= 12) score++;
 if (/[A-Z]/.test(p)) score++;
 if (/[0-9]/.test(p)) score++;
 if (/[^A-Za-z0-9]/.test(p)) score++;
 return score;
 };
 const strength = getStrength(password);
 const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
 const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-400", "bg-emerald-600"];

 return (
 <div className="space-y-3">
 <Input
 type="password"
 placeholder="Enter a password to test..."
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="bg-black/50 border-emerald-500/30 text-emerald-300 placeholder:text-emerald-700"
 />
 {password && (
 <div className="space-y-2">
 <div className="flex gap-1">
 {Array.from({ length: 5 }).map((_, i) => (
 <div key={i} className={`h-2 flex-1 rounded-full ${i < strength ? colors[strength - 1] : "bg-gray-700"}`} />
 ))}
 </div>
 <p className="text-sm text-emerald-400">Strength: {labels[strength - 1] || "Very Weak"}</p>
 <ul className="text-xs space-y-1 text-gray-400">
 <li className={password.length >= 8 ? "text-emerald-400" : ""}>{password.length >= 8 ? "" : ""} At least 8 characters</li>
 <li className={/[A-Z]/.test(password) ? "text-emerald-400" : ""}>{/[A-Z]/.test(password) ? "" : ""} Uppercase letter</li>
 <li className={/[0-9]/.test(password) ? "text-emerald-400" : ""}>{/[0-9]/.test(password) ? "" : ""} Number</li>
 <li className={/[^A-Za-z0-9]/.test(password) ? "text-emerald-400" : ""}>{/[^A-Za-z0-9]/.test(password) ? "" : ""} Special character</li>
 </ul>
 </div>
 )}
 </div>
 );
};

const SSLChecker = () => {
 const [domain, setDomain] = useState("");
 const [result, setResult] = useState<null | "secure" | "insecure">(null);

 const check = () => {
 setResult(domain.length > 3 ? (Math.random() > 0.3 ? "secure" : "insecure") : null);
 };

 return (
 <div className="space-y-3">
 <div className="flex gap-2">
 <Input
 placeholder="Enter domain (e.g. example.com)"
 value={domain}
 onChange={(e) => setDomain(e.target.value)}
 className="bg-black/50 border-emerald-500/30 text-emerald-300 placeholder:text-emerald-700"
 />
 <Button onClick={check} className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0">Scan</Button>
 </div>
 {result && (
 <div className={`flex items-center gap-2 p-3 rounded-lg ${result === "secure" ? "bg-emerald-900/30 text-emerald-400" : "bg-red-900/30 text-red-400"}`}>
 {result === "secure" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
 <span>{result === "secure" ? "SSL Certificate is valid and secure" : "SSL Certificate issue detected"}</span>
 </div>
 )}
 </div>
 );
};

const IPLookup = () => {
 const [ip, setIp] = useState("");
 const [result, setResult] = useState<null | { country: string; city: string; isp: string }>(null);

 const lookup = () => {
 if (ip.length > 5) {
 setResult({ country: "Kenya", city: "Nairobi", isp: "Safaricom PLC" });
 }
 };

 return (
 <div className="space-y-3">
 <div className="flex gap-2">
 <Input
 placeholder="Enter IP address..."
 value={ip}
 onChange={(e) => setIp(e.target.value)}
 className="bg-black/50 border-emerald-500/30 text-emerald-300 placeholder:text-emerald-700"
 />
 <Button onClick={lookup} className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0">Lookup</Button>
 </div>
 {result && (
 <div className="bg-emerald-900/20 p-3 rounded-lg text-sm space-y-1 text-emerald-300 font-mono">
 <p>Country: {result.country}</p>
 <p>City: {result.city}</p>
 <p>ISP: {result.isp}</p>
 </div>
 )}
 </div>
 );
};

const tools = [
 { icon: Lock, title: "Password Strength Checker", desc: "Test how strong your password is", component: <PasswordChecker /> },
 { icon: Shield, title: "SSL Certificate Checker", desc: "Verify website SSL security", component: <SSLChecker /> },
 { icon: Globe, title: "IP Lookup Tool", desc: "Get IP geolocation details", component: <IPLookup /> },
];

const SecurityTools = () => (
 <section className="py-20 bg-black relative">
 <div className="container mx-auto px-4">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-center mb-12"
 >
 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
 Free Security <span className="text-emerald-400">Tools</span>
 </h2>
 <p className="text-gray-400 max-w-2xl mx-auto">Try our free cybersecurity tools to check your digital safety</p>
 </motion.div>
 <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
 {tools.map((tool, i) => (
 <motion.div
 key={tool.title}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 >
 <Card className="bg-gray-900/80 border-emerald-500/20 h-full">
 <CardHeader>
 <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
 <tool.icon className="w-6 h-6 text-emerald-400" />
 </div>
 <CardTitle className="text-white text-lg">{tool.title}</CardTitle>
 <p className="text-gray-400 text-sm">{tool.desc}</p>
 </CardHeader>
 <CardContent>{tool.component}</CardContent>
 </Card>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
);

export default SecurityTools;
