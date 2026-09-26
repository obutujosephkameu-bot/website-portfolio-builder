import SeoLandingPage from "@/components/seo/SeoLandingPage";

const RELATED = [
  { to: "/business-systems-kenya", label: "Business Systems" },
  { to: "/school-management-system-kenya", label: "School Management System" },
  { to: "/mobile-app-development-kenya", label: "Mobile App Development" },
  { to: "/web-design-kenya", label: "Website Design" },
];

const SoftwareDevelopmentKenya = () => (
  <SeoLandingPage
    seoTitle="Custom Software Development in Kenya | Lumex Digital"
    metaDescription="Lumex Digital develops custom software in Kenya for schools, businesses, hotels, shops, organizations and startups. Build systems that match your workflow."
    canonicalPath="/software-development-kenya"
    eyebrow="Custom Software"
    h1="Custom Software Development in Kenya"
    heroLead="Tailor-made software systems built around how your business actually works."
    heroDescription="Off-the-shelf software rarely matches the way Kenyan businesses operate. Lumex Digital develops custom software for schools, hotels, shops, NGOs and corporate clients — from POS and inventory systems to CRMs and admin dashboards. We build it once, properly, around your real workflow."
    heroBullets={[
      "Designed around your actual business workflow",
      "Role-based access for staff and admins",
      "Secure login and data protection",
      "Reports, dashboards and automation",
    ]}
    sections={[
      {
        h2: "Software Solutions We Build",
        bullets: [
          "Business management software",
          "School and academy management systems",
          "Hotel and lodge management systems",
          "Inventory and stock control systems",
          "Point of sale (POS) systems",
          "CRM and customer management systems",
          "Admin dashboards and reporting tools",
          "HR and payroll systems",
          "Booking and reservation systems",
          "Custom automation and workflows",
        ],
      },
      {
        h2: "Why Build Custom Software?",
        paragraphs: [
          "Generic software forces your business to adapt to it. Custom software does the opposite — it adapts to you. When Lumex Digital builds your system, every form, report and workflow matches the way your team already operates. The result is faster adoption, fewer mistakes and a measurable improvement in productivity.",
          "Custom software also scales with you. As your business grows, we can add new modules, new user roles, new reports and new integrations without forcing you to migrate to a different product.",
        ],
      },
      {
        h2: "Security, Roles and Reporting",
        subsections: [
          { h3: "Secure Login Systems", body: "Every system includes secure authentication, password hashing, session management and protection against common attacks." },
          { h3: "Role-Based Access", body: "Administrators, managers, staff and customers each see only the data and features they're allowed to access." },
          { h3: "Reporting & Dashboards", body: "Real-time charts, daily summaries, exportable PDF and Excel reports help you make better decisions faster." },
        ],
      },
      {
        h2: "From Idea to Launch",
        paragraphs: [
          "We start every project with a deep consultation to understand your business processes. Then we design the data structure, the user interface and the workflow before writing any code. Once approved, our team builds, tests and deploys the system, then trains your staff and provides ongoing support.",
        ],
      },
    ]}
    faqs={[
      { q: "Will I own the software you build?", a: "Yes. You own the final product, including the source code and the database. We provide hosting and maintenance if needed but the software belongs to you." },
      { q: "Can you integrate with M-Pesa, SMS and email?", a: "Yes. We routinely integrate M-Pesa, Africa's Talking SMS, email providers and accounting tools like QuickBooks." },
      { q: "Do you provide training for staff?", a: "Every project includes user training, video tutorials and a written user manual so your team can use the system confidently." },
    ]}
    relatedLinks={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Custom Software Development",
      provider: { "@type": "Organization", name: "Lumex Digital", url: "https://lumexdigital.co.ke" },
      areaServed: { "@type": "Country", name: "Kenya" },
      url: "https://lumexdigital.co.ke/software-development-kenya",
    }}
  />
);

export default SoftwareDevelopmentKenya;
