import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  RecaptchaVerifier,
  PhoneAuthProvider,
  linkWithCredential,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Mail, AlertCircle, User, Phone, ShieldCheck } from "lucide-react";
import Layout from "@/components/layout/Layout";

type PortalStep = "credentials" | "otp";

const MemberPortal = () => {
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  // OTP state
  const [step, setStep] = useState<PortalStep>("credentials");
  const [otpCode, setOtpCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpPhoneNumber, setOtpPhoneNumber] = useState("");
  const [otpFlow, setOtpFlow] = useState<"login" | "register">("login");

  // General state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const { user, role, phoneVerified, setPhoneVerified, login, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  // Redirect when fully authenticated (email + phone verified)
  useEffect(() => {
    if (!authLoading && user && role && phoneVerified) {
      if (role === "main_admin") {
        navigate("/admin");
      } else if (role === "sales_admin") {
        navigate("/sales-admin");
      } else {
        navigate("/member-dashboard");
      }
    }
  }, [user, role, authLoading, phoneVerified, navigate]);

  // Setup reCAPTCHA
  const setupRecaptcha = useCallback(() => {
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
      recaptchaVerifierRef.current = null;
    }

    if (!recaptchaContainerRef.current) return;

    try {
      const verifier = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
        size: "normal",
        callback: () => {
          setRecaptchaReady(true);
        },
        "expired-callback": () => {
          setRecaptchaReady(false);
        },
      });
      verifier.render();
      recaptchaVerifierRef.current = verifier;
    } catch (err) {
      console.error("reCAPTCHA setup error:", err);
    }
  }, []);

  // Init reCAPTCHA when on OTP step
  useEffect(() => {
    if (step === "otp") {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(setupRecaptcha, 300);
      return () => clearTimeout(timer);
    }
  }, [step, setupRecaptcha]);

  // Cleanup reCAPTCHA on unmount
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }
    };
  }, []);

  const sendOTP = async (phoneNumber: string) => {
    if (!recaptchaVerifierRef.current) {
      setError("reCAPTCHA not ready. Please wait and try again.");
      return;
    }
    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierRef.current);
      setConfirmationResult(result);
    } catch (err: any) {
      console.error("Send OTP error:", err);
      if (err.code === "auth/invalid-phone-number") {
        setError("Invalid phone number format. Use international format (e.g., +254712345678).");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError(err.message || "Failed to send verification code.");
      }
      // Reset reCAPTCHA for retry
      setupRecaptcha();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      // After login, get the user's phone from Firestore
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const phone = userDoc.exists() ? userDoc.data().phone : null;
        if (!phone) {
          setError("No phone number linked to this account. Please contact support or re-register.");
          setLoading(false);
          return;
        }
        setOtpPhoneNumber(phone);
        setOtpFlow("login");
        setStep("otp");
      }
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (regPassword !== regConfirm) {
      setError("Passwords do not match.");
      return;
    }
    if (regPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!regPhone.startsWith("+")) {
      setError("Phone number must be in international format (e.g., +254712345678).");
      return;
    }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      await updateProfile(cred.user, { displayName: regName });
      await setDoc(doc(db, "users", cred.user.uid), {
        email: regEmail,
        displayName: regName,
        phone: regPhone,
        role: "member",
        createdAt: new Date().toISOString(),
      });
      setOtpPhoneNumber(regPhone);
      setOtpFlow("register");
      setStep("otp");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else {
        setError(err.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    setError("");
    setLoading(true);
    await sendOTP(otpPhoneNumber);
    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!confirmationResult) {
      setError("Please send the verification code first.");
      return;
    }
    setLoading(true);
    try {
      await confirmationResult.confirm(otpCode);
      setPhoneVerified(true);
    } catch (err: any) {
      console.error("OTP verify error:", err);
      if (err.code === "auth/invalid-verification-code") {
        setError("Invalid verification code. Please try again.");
      } else {
        setError(err.message || "Verification failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  // OTP verification screen
  if (step === "otp") {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center py-20 px-4">
          <Card className="w-full max-w-md shadow-xl border-border">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Phone Verification</CardTitle>
              <CardDescription>
                We'll send a verification code to <strong>{otpPhoneNumber}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* reCAPTCHA container */}
              <div className="flex justify-center">
                <div ref={recaptchaContainerRef} id="recaptcha-container" />
              </div>

              {!confirmationResult ? (
                <Button
                  onClick={handleSendOTP}
                  className="w-full"
                  disabled={loading || !recaptchaReady}
                >
                  {loading ? "Sending code..." : "Send Verification Code"}
                </Button>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp-code">Enter 6-digit code</Label>
                    <Input
                      id="otp-code"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="123456"
                      className="text-center text-2xl tracking-[0.5em] font-mono"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading || otpCode.length !== 6}>
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </Button>
                </form>
              )}

              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => {
                  setStep("credentials");
                  setConfirmationResult(null);
                  setOtpCode("");
                  setError("");
                  setRecaptchaReady(false);
                }}
              >
                ← Back to login
              </Button>
            </CardContent>
          </Card>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-20 px-4">
        <Card className="w-full max-w-md shadow-xl border-border">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <User className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Lumex Member Portal</CardTitle>
            <CardDescription>Login or create your account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg text-sm mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <Tabs defaultValue="login">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
                <TabsTrigger value="register" className="flex-1">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="login-email" type="email" placeholder="your@email.com" className="pl-10" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="login-password" type="password" placeholder="••••••••" className="pl-10" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    <ShieldCheck className="inline w-3 h-3 mr-1" />
                    SMS verification required after login
                  </p>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="reg-name" placeholder="John Doe" className="pl-10" value={regName} onChange={(e) => setRegName(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="reg-email" type="email" placeholder="your@email.com" className="pl-10" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">Phone Number (International format)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="reg-phone" type="tel" placeholder="+254712345678" className="pl-10" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} required />
                    </div>
                    <p className="text-xs text-muted-foreground">Must start with + country code (e.g., +254 for Kenya)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="reg-password" type="password" placeholder="••••••••" className="pl-10" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-confirm">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="reg-confirm" type="password" placeholder="••••••••" className="pl-10" value={regConfirm} onChange={(e) => setRegConfirm(e.target.value)} required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    <ShieldCheck className="inline w-3 h-3 mr-1" />
                    Phone verification required to complete registration
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
};

export default MemberPortal;
