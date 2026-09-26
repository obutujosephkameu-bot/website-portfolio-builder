import SeoLandingPage from "@/components/seo/SeoLandingPage";

const RELATED = [
  { to: "/software-development-kenya", label: "Custom Software" },
  { to: "/school-management-system-kenya", label: "School System" },
  { to: "/mobile-app-development-kenya", label: "Mobile Apps" },
  { to: "/web-design-kenya", label: "Website Design" },
];

const BusinessSystemsKenya = () => (
  <SeoLandingPage
    seoTitle="Business Systems in Kenya | Lumex Digital"
    metaDescription="Lumex Digital creates business systems in Kenya for shops, companies, hotels, startups and organizations. Manage sales, stock, customers, bookings and reports."
    canonicalPath="/business-systems-kenya"
    eyebrow="Business Systems"
    h1="Business Systems in Kenya"
    heroLead="POS, inventory, booking, CRM and reporting systems built for Kenyan businesses."
    heroDescription="Lumex Digital builds business management systems that help shops, hotels, supermarkets, restaurants, startups and corporate clients run their operations efficiently. Track every sale, every stock movement, every booking and every customer interaction from one secure dashboard."
    heroBullets={[
      "Real-time stock and sales tracking",
      "Multi-branch and multi-user support",
      "Daily, weekly and monthly reports",
      "M-Pesa and card payment integration",
    ]}
    sections={[
      {
        h2: "Business Systems We Build",
        bullets: [
          "Point of sale (POS) systems",
          "Inventory and stock management",
          "Booking and reservation systems",
          "Customer relationship management (CRM)",
          "Sales tracking and analytics",
          "Reports and dashboards",
          "Staff accounts and time tracking",
          "Admin and management dashboards",
          "Workflow automation",
        ],
      },
      {
        h2: "Point of Sale (POS) Systems",
        paragraphs: [
          "Our POS systems run on tablets, laptops or desktops in your shop, restaurant or supermarket. Cashiers process sales quickly, print receipts, apply discounts and track every transaction. Managers see real-time sales totals and daily reports on a separate dashboard.",
        ],
      },
      {
        h2: "Inventory & Stock Management",
        paragraphs: [
          "Know exactly what's in stock, what's running low and what's selling fastest. Our inventory modules support multiple stores, automatic re-order alerts, barcode scanning and supplier management. Combined with our POS, every sale automatically updates stock levels.",
        ],
      },
      {
        h2: "Booking & Reservation Systems",
        paragraphs: [
          "Hotels, lodges, salons, clinics and service businesses use our booking systems to manage availability, take online reservations, send confirmations and avoid double-bookings. Customers book through your website or a staff member books through the admin dashboard.",
        ],
      },
      {
        h2: "Reports That Drive Decisions",
        subsections: [
          { h3: "Daily Operations Reports", body: "End-of-day summaries for cashiers, managers and owners." },
          { h3: "Customer Insights", body: "See top customers, repeat purchases and customer lifetime value." },
          { h3: "Staff Performance", body: "Track sales per cashier, attendance and productivity." },
        ],
      },
    ]}
    faqs={[
      { q: "Can your business systems work offline?", a: "Our POS supports offline mode for short outages and automatically syncs once the internet is back." },
      { q: "Can you connect M-Pesa for payments?", a: "Yes. We integrate M-Pesa STK Push, Till numbers and Paybills directly into your business system." },
      { q: "Do you offer training and support?", a: "Every system includes onboarding, staff training and ongoing technical support." },
    ]}
    relatedLinks={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Business Management Systems",
      provider: { "@type": "Organization", name: "Lumex Digital", url: "https://lumexdigital.co.ke" },
      areaServed: { "@type": "Country", name: "Kenya" },
      url: "https://lumexdigital.co.ke/business-systems-kenya",
    }}
  />
);

export default BusinessSystemsKenya;
