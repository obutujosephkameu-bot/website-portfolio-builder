import SeoLandingPage from "@/components/seo/SeoLandingPage";

const RELATED = [
  { to: "/web-design-kenya", label: "Website Design" },
  { to: "/seo-services-kenya", label: "SEO Services" },
  { to: "/software-development-kenya", label: "Custom Software" },
  { to: "/contact", label: "Contact Us" },
];

const WebHostingKenya = () => (
  <SeoLandingPage
    seoTitle="Web Hosting and Domains Kenya | Lumex Digital"
    metaDescription="Lumex Digital provides domain registration, web hosting, business email setup and website support for clients in Kenya."
    canonicalPath="/web-hosting-kenya"
    eyebrow="Hosting & Domains"
    h1="Web Hosting and Domains Kenya"
    heroLead="Reliable domain registration, web hosting, business email and website support for Kenyan businesses."
    heroDescription="Get your business online with affordable .co.ke, .com and .org domains, fast Kenyan-friendly web hosting, professional business emails and SSL security — all backed by Lumex Digital's local support team."
    heroBullets={[
      "Affordable .co.ke, .com and .org domains",
      "Fast SSD web hosting with free SSL",
      "Branded business email (you@yourdomain.co.ke)",
      "Local support via WhatsApp and phone",
    ]}
    sections={[
      {
        h2: "Domain Registration in Kenya",
        paragraphs: [
          "Your domain is your address on the internet. Lumex Digital registers .co.ke, .com, .org, .net and many other extensions for businesses, schools and organizations in Kenya. We handle the full registration process and ensure your domain is in your name — not ours.",
        ],
      },
      {
        h2: "Web Hosting Plans",
        bullets: [
          "Shared hosting for small business websites",
          "Business hosting for growing companies",
          "School and institution hosting plans",
          "WordPress and custom application hosting",
          "Free SSL certificates on every plan",
          "Daily backups and 99.9% uptime",
        ],
      },
      {
        h2: "Business Email Setup",
        paragraphs: [
          "A branded email like info@yourbusiness.co.ke looks far more professional than a Gmail address. Lumex Digital sets up business email accounts on your domain, configures them on your phone and laptop, and helps your team migrate from older email systems.",
        ],
      },
      {
        h2: "SSL Security & Website Migration",
        subsections: [
          { h3: "SSL Certificates", body: "Every website we host includes a free SSL certificate so visitors see the secure padlock in their browser." },
          { h3: "Website Migration", body: "Already have a website hosted elsewhere? We migrate your files, database and emails to our hosting with zero downtime." },
          { h3: "Maintenance & Updates", body: "We keep your website, plugins, themes and security patches up to date so nothing breaks unexpectedly." },
        ],
      },
      {
        h2: "Speed, Uptime and Support",
        paragraphs: [
          "We monitor every hosted website 24/7 and respond quickly when something needs attention. Our hosting infrastructure is optimized for Kenyan visitors so your site loads fast on Safaricom, Airtel and Telkom networks.",
        ],
      },
    ]}
    faqs={[
      { q: "Will I own my domain?", a: "Yes. The domain is registered in your name, with you as the legal owner. We are listed only as the technical contact." },
      { q: "Can you host a website I already have?", a: "Yes. We migrate existing websites, databases and emails to our hosting at no extra cost on most plans." },
      { q: "Do you offer business email?", a: "Yes. We set up branded business email accounts and configure them on your devices." },
    ]}
    relatedLinks={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Web Hosting and Domain Registration",
      provider: { "@type": "Organization", name: "Lumex Digital", url: "https://lumexdigital.co.ke" },
      areaServed: { "@type": "Country", name: "Kenya" },
      url: "https://lumexdigital.co.ke/web-hosting-kenya",
    }}
  />
);

export default WebHostingKenya;
