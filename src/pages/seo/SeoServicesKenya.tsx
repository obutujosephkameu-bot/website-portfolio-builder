import SeoLandingPage from "@/components/seo/SeoLandingPage";

const RELATED = [
  { to: "/web-design-kenya", label: "Website Design" },
  { to: "/web-hosting-kenya", label: "Hosting & Domains" },
  { to: "/blog", label: "SEO Blog" },
  { to: "/contact", label: "Get an SEO Quote" },
];

const SeoServicesKenya = () => (
  <SeoLandingPage
    seoTitle="SEO Services in Kenya | Lumex Digital"
    metaDescription="Lumex Digital helps businesses in Kenya improve their online visibility with SEO-ready websites, page structure, metadata, content and search optimization."
    canonicalPath="/seo-services-kenya"
    eyebrow="SEO Services"
    h1="SEO Services in Kenya"
    heroLead="Get found on Google by the customers who are searching for what you offer."
    heroDescription="Lumex Digital offers professional SEO services for Kenyan businesses — from technical SEO foundations and on-page optimization to local SEO and ongoing content support. We help your website rank for the keywords that actually drive sales."
    heroBullets={[
      "Keyword research focused on Kenyan search behavior",
      "Optimized titles, meta descriptions and headings",
      "Sitemap, robots.txt and Google Search Console setup",
      "Local SEO for Nairobi, Mombasa, Kisumu and beyond",
    ]}
    sections={[
      {
        h2: "What SEO Includes",
        bullets: [
          "SEO page titles and meta descriptions",
          "Search-friendly URLs",
          "Sitemap.xml generation",
          "Robots.txt configuration",
          "Google Search Console setup and submission",
          "Local SEO and Google Business Profile",
          "Website content improvement",
          "Internal linking strategy",
          "Technical SEO basics (speed, mobile, schema)",
          "Backlink and citation guidance",
        ],
      },
      {
        h2: "Why SEO Matters for Kenyan Businesses",
        paragraphs: [
          "Every day, thousands of Kenyans search Google for products and services. If your website doesn't appear on the first page, you're invisible to those customers. SEO ensures Google understands what your business does, where you operate and who you serve — so your pages show up when it matters most.",
          "Lumex Digital builds every website with SEO foundations from day one. For existing websites, we offer SEO audits that identify what's holding you back and fix it.",
        ],
      },
      {
        h2: "Technical SEO We Set Up",
        subsections: [
          { h3: "Sitemaps & Search Console", body: "We generate a sitemap.xml of every page and submit it to Google Search Console so search engines discover and index your content quickly." },
          { h3: "Schema Markup", body: "We add Organization, LocalBusiness, Service and Article schema so Google understands your business and shows rich results." },
          { h3: "Speed & Core Web Vitals", body: "Faster pages rank higher. We optimize images, scripts and hosting to pass Google's Core Web Vitals tests." },
          { h3: "Mobile Friendliness", body: "Every page is mobile responsive — a Google ranking requirement." },
        ],
      },
      {
        h2: "Local SEO for Kenyan Cities",
        paragraphs: [
          "If your customers search 'web designer in Nairobi' or 'school system Kisumu', we make sure your business is the answer. We optimize your Google Business Profile, ensure consistent name/address/phone information across the web and target location-based keywords in your content.",
        ],
      },
    ]}
    faqs={[
      { q: "How long before I see SEO results?", a: "Most clients see meaningful improvements in 3 to 6 months. Technical fixes can produce results in weeks; ranking for competitive keywords takes longer." },
      { q: "Do you guarantee #1 rankings?", a: "No reputable SEO agency guarantees specific positions. We do guarantee a properly optimized website and ongoing measurable progress." },
      { q: "Can you fix my existing website's SEO?", a: "Yes. We perform a full SEO audit and implement the fixes — from technical issues to content and internal linking." },
    ]}
    relatedLinks={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Search Engine Optimization",
      provider: { "@type": "Organization", name: "Lumex Digital", url: "https://lumexdigital.co.ke" },
      areaServed: { "@type": "Country", name: "Kenya" },
      url: "https://lumexdigital.co.ke/seo-services-kenya",
    }}
  />
);

export default SeoServicesKenya;
