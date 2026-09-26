import { useState } from "react";
import { useAdminAuth } from "./AdminAuthContext";
import { Lock, Shield, AlertCircle } from "lucide-react";
import logo from "@/assets/lumex-x.png";

const AdminLogin = () => {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await login(email, password);
    } catch (e: any) {
      setErr(e?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220] p-4">
      <div className="w-full max-w-md bg-[#111a2e] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Lumex" className="w-16 h-16 mb-3" />
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" /> LUMEX Admin
          </h1>
          <p className="text-xs text-white/50 mt-1">Authorized personnel only</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs text-white/60">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="w-full mt-1 bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="text-xs text-white/60">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full mt-1 bg-[#0b1220] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-amber-400"
            />
          </div>

          {err && (
            <div className="flex items-start gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> <span>{err}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
          >
            <Lock className="w-4 h-4" /> {busy ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <p className="text-[10px] text-white/30 text-center mt-6">
          All access attempts are logged and monitored.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
