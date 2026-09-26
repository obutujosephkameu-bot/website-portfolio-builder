import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { Smartphone, Layers, Bell, Cloud, Zap, Code2, ShieldCheck, Sparkles } from "lucide-react";

const AppDevelopment = () => (
  <ServicePageTemplate
    eyebrow="App Development"
    title="Native-quality"
    highlight="mobile apps for iOS & Android"
    description="From MVP to production — we design, ship, and scale mobile apps your users love. Cross-platform with React Native or fully native when it matters."
    Icon={Smartphone}
    accent="orange"
    features={[
      { Icon: Layers, title: "iOS + Android", desc: "One codebase, two stores. Real native performance." },
      { Icon: Bell, title: "Push Notifications", desc: "Re-engage users with targeted, personalized pushes." },
      { Icon: Cloud, title: "Cloud Backend", desc: "Scalable APIs, auth, storage, and realtime sync." },
      { Icon: Zap, title: "Offline-First", desc: "Works without signal — syncs when back online." },
      { Icon: ShieldCheck, title: "Secure", desc: "Encrypted storage, biometric auth, secure APIs." },
      { Icon: Sparkles, title: "App Store Ready", desc: "We handle store submissions, assets, and reviews." },
    ]}
    process={[
      { step: "01", title: "Strategy", desc: "Validate the idea, define the MVP scope." },
      { step: "02", title: "UX/UI", desc: "Prototypes you can tap before we write code." },
      { step: "03", title: "Develop", desc: "Two-week sprints with live builds you can test." },
      { step: "04", title: "Ship", desc: "Submit to stores and support post-launch." },
    ]}
    techStack={["React Native", "Expo", "Swift", "Kotlin", "Firebase", "Supabase", "Stripe", "OneSignal", "Sentry"]}
  />
);

export default AppDevelopment;
