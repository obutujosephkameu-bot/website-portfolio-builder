import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { Globe, Zap, Search, Smartphone, ShieldCheck, Gauge, Layers, Code2 } from "lucide-react";

const WebsiteDevelopment = () => (
  <ServicePageTemplate
    eyebrow="Website Development"
    title="Beautiful, blazing-fast"
    highlight="websites that convert"
    description="Custom-coded marketing sites, e-commerce stores, and web platforms built for speed, SEO, and scale. From a one-page launch to enterprise portals."
    Icon={Globe}
    accent="blue"
    features={[
      { Icon: Layers, title: "Custom Design", desc: "Pixel-perfect interfaces tailored to your brand — no templates." },
      { Icon: Gauge, title: "Lightning Fast", desc: "Lighthouse 95+ scores, optimized images, and edge delivery." },
      { Icon: Search, title: "SEO Ready", desc: "Semantic markup, structured data, and metadata tuned to rank." },
      { Icon: Smartphone, title: "Fully Responsive", desc: "Crisp on every screen — phone, tablet, laptop, ultra-wide." },
      { Icon: ShieldCheck, title: "Secure by Default", desc: "HTTPS, hardened headers, and best-practice auth flows." },
      { Icon: Code2, title: "Modern Stack", desc: "React, Next.js, TypeScript, Tailwind — production-grade." },
    ]}
    process={[
      { step: "01", title: "Discovery", desc: "We map goals, audience, and content architecture." },
      { step: "02", title: "Design", desc: "Wireframes and visual mockups for your approval." },
      { step: "03", title: "Build", desc: "Clean code, integrations, and CMS setup." },
      { step: "04", title: "Launch", desc: "Deploy, monitor, and iterate based on real data." },
    ]}
    techStack={["React", "Next.js", "TypeScript", "Tailwind CSS", "WordPress", "Shopify", "Vercel", "Cloudflare", "Stripe"]}
  />
);

export default WebsiteDevelopment;
