import SeoLandingPage from "@/components/seo/SeoLandingPage";

const RELATED = [
  { to: "/mobile-app-development-kenya", label: "Mobile App Development" },
  { to: "/software-development-kenya", label: "Custom Software" },
  { to: "/seo-services-kenya", label: "SEO Services" },
  { to: "/web-hosting-kenya", label: "Web Hosting & Domains" },
  { to: "/portfolio", label: "View Portfolio" },
];

const WebDesignKenya = () => (
  <SeoLandingPage
    seoTitle="Website Design in Kenya | Lumex Digital"
    metaDescription="Lumex Digital offers professional website design in Kenya for businesses, schools, hotels, shops, startups and organizations. Get modern, mobile-friendly and SEO-ready websites."
    canonicalPath="/web-design-kenya"
    eyebrow="Website Design"
    h1="Website Design in Kenya"
    heroLead="Modern, mobile-friendly, SEO-ready websites built for Kenyan businesses, schools and organizations."
    heroDescription="Lumex Digital is a Kenyan technology company that designs professional websites for companies, startups, schools, hotels, Airbnb hosts, shops, churches and organizations. Every website we build is fast, mobile responsive, search-engine ready and aligned with your brand."
    heroBullets={[
      "Mobile-responsive on all devices",
      "Optimized for Google search (SEO-ready)",
      "Fast loading and secure hosting",
      "Domain, email and WhatsApp setup included",
    ]}
    sections={[
      {
        h2: "Professional Website Design for Businesses in Kenya",
        paragraphs: [
          "A professional website is the foundation of your digital presence. At Lumex Digital we design websites that turn visitors into customers — whether you run a small business in Nairobi, a school in Nakuru, a hotel on the coast or an organization serving clients across Kenya.",
          "We focus on clean design, fast performance, mobile responsiveness and search engine optimization. Every website is structured so Google can crawl and index every page properly, giving your business a stronger chance of being found when customers search online.",
        ],
        bullets: [
          "Business and company websites",
          "School and academy websites",
          "Hotel, Airbnb and accommodation websites",
          "E-commerce and online shop websites",
          "Portfolio and personal brand websites",
          "Landing pages and campaign sites",
          "Church and ministry websites",
          "NGO and organization websites",
        ],
      },
      {
        h2: "What is Included in Every Lumex Digital Website",
        paragraphs: [
          "We don't just deliver pretty pages. Every website project from Lumex Digital comes with the technical foundations needed for long-term growth. From domain registration to ongoing maintenance, we cover every step.",
        ],
        subsections: [
          { h3: "Mobile Responsive Design", body: "Your website looks and works beautifully on phones, tablets and desktops. More than 70% of Kenyans browse on mobile — we design with mobile-first principles." },
          { h3: "SEO-Ready Structure", body: "We build proper page titles, meta descriptions, headings, image alt text, sitemaps and schema markup so Google can understand and rank your site." },
          { h3: "Fast Loading Pages", body: "Optimized images, clean code and reliable hosting keep your site fast — improving both user experience and search ranking." },
          { h3: "Contact Forms & WhatsApp Buttons", body: "We connect your site directly to your inbox and WhatsApp so leads reach you instantly." },
          { h3: "Domain & Hosting Setup", body: "Through our hosting service we register your domain (.co.ke, .com, .org and more) and host the website on fast, secure servers." },
        ],
      },
      {
        h2: "Website Redesign for Existing Businesses",
        paragraphs: [
          "Do you already have a website that looks outdated, loads slowly, or doesn't show up on Google? Lumex Digital offers full website redesign services. We rebuild your site from scratch with a fresh, professional layout while preserving your brand identity and existing content.",
          "We also migrate your old domain, set up SSL, configure email and submit your new sitemap to Google so your business doesn't lose any of its current search ranking during the transition.",
        ],
      },
      {
        h2: "Industries We Build Websites For",
        bullets: [
          "Schools and training academies",
          "Hotels, lodges and Airbnb hosts",
          "Retail shops and supermarkets",
          "Startups and tech companies",
          "Churches and ministries",
          "Small and medium businesses",
          "Law firms and consultancies",
          "Construction and real estate",
          "Online stores and e-commerce",
          "Personal brands and portfolios",
        ],
      },
    ]}
    faqs={[
      { q: "How much does a website cost in Kenya?", a: "Pricing depends on the type and number of pages. A basic business website starts from an affordable package, while custom e-commerce or booking websites are quoted after consultation. Contact Lumex Digital for a tailored quote." },
      { q: "How long does it take to build a website?", a: "A standard business website takes 5 to 10 working days. Larger e-commerce or booking websites take 2 to 4 weeks depending on complexity and content readiness." },
      { q: "Will my website work on mobile phones?", a: "Yes. Every Lumex Digital website is fully responsive on phones, tablets and desktops, with mobile-first design principles." },
      { q: "Can you redesign my existing website?", a: "Absolutely. We rebuild outdated websites with modern design, faster performance and proper SEO while preserving your content and domain authority." },
    ]}
    relatedLinks={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Website Design",
      provider: { "@type": "Organization", name: "Lumex Digital", url: "https://lumexdigital.co.ke" },
      areaServed: { "@type": "Country", name: "Kenya" },
      url: "https://lumexdigital.co.ke/web-design-kenya",
      description: "Professional website design in Kenya for businesses, schools, hotels, shops and organizations.",
    }}
  />
);

export default WebDesignKenya;
