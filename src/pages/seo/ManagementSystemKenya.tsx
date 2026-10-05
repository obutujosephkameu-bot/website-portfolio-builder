import SeoLandingPage from "@/components/seo/SeoLandingPage";

const RELATED = [
  { to: "/business-systems-kenya", label: "Business Systems Kenya" },
  { to: "/software-development-kenya", label: "Custom Software" },
  { to: "/school-management-system-kenya", label: "School System" },
  { to: "/web-design-kenya", label: "Website Design" },
];

const ManagementSystemKenya = () => (
  <SeoLandingPage
    seoTitle="LUM-EX Management System Kenya | Multi-Business Platform | Lumex Digital"
    metaDescription="LUM-EX by Lumex Digital is a scalable, offline-first management system for shops, supermarkets, pharmacies, salons, barber shops, electrical stores, water companies, WiFi providers and more."
    canonicalPath="/management-system-kenya"
    eyebrow="LUM-EX Platform"
    h1="LUM-EX Management System in Kenya"
    heroLead="One intelligent platform to power shops, supermarkets, pharmacies, salons, water companies, WiFi providers and more."
    heroDescription="LUM-EX is Lumex Digital's scalable, offline-first, multi-business management platform built for the Kenyan market. It works on laptops, tablets and smartphones, syncs when online, and keeps your business running even when the internet is down. Whether you run a single shop or a chain of stores, LUM-EX adapts to your size."
    heroBullets={[
      "Offline-first — works without internet",
      "Multi-business support from one dashboard",
      "M-Pesa and mobile money integration",
      "Real-time sales, stock and reports",
    ]}
    sections={[
      {
        h2: "What is LUM-EX?",
        paragraphs: [
          "LUM-EX is a complete business management platform developed by Lumex Digital for Kenyan businesses. It combines point of sale, inventory tracking, customer management, staff accounts, booking, reporting and payment processing into one easy-to-use system.",
          "Unlike cloud-only systems that stop working when your internet fails, LUM-EX is built offline-first. Your data is stored locally on your device and automatically syncs to the cloud when a connection is available. This means your shop, salon or pharmacy never stops serving customers.",
        ],
      },
      {
        h2: "Industries LUM-EX Powers",
        bullets: [
          "Retail shops and supermarkets",
          "Pharmacies and chemists",
          "Salons and barber shops",
          "Electrical and hardware stores",
          "Water delivery companies",
          "WiFi and internet service providers",
          "Restaurants and fast-food outlets",
          "Boutiques and fashion stores",
          "Bookshops and stationery stores",
          "Spas and wellness centers",
        ],
      },
      {
        h2: "Core Features of LUM-EX",
        subsections: [
          { h3: "Point of Sale (POS)", body: "Process sales fast with barcode scanning, receipt printing, discounts and split payments. Cashiers log in with personal PINs and every transaction is tracked." },
          { h3: "Inventory & Stock Control", body: "Track stock across multiple locations in real time. Get low-stock alerts, manage suppliers and view best-selling products at a glance." },
          { h3: "Offline-First Architecture", body: "LUM-EX stores data locally and syncs intelligently when the internet returns. Your business keeps running through power and network outages common in Kenya." },
          { h3: "M-Pesa & Mobile Money", body: "Accept M-Pesa STK Push, Till payments and Paybill directly inside the system. Reconciliation is automatic and every payment is matched to a sale." },
          { h3: "Multi-User & Permissions", body: "Create roles for owners, managers, cashiers and auditors. Control who can view stock, process refunds or see financial reports." },
          { h3: "Customers & CRM", body: "Build a customer database, track purchase history, send SMS promotions and reward repeat buyers with loyalty points." },
          { h3: "Reports & Analytics", body: "Daily sales summaries, profit margins, stock valuation, staff performance and tax-ready reports — all exportable to Excel or PDF." },
          { h3: "Multi-Business Dashboard", body: "Own more than one business? Switch between shops, salons or pharmacies from a single login without needing separate accounts." },
        ],
      },
      {
        h2: "Why Kenyan Businesses Choose LUM-EX",
        bullets: [
          "Designed for unstable internet and power — offline mode keeps you open",
          "Affordable pricing compared to foreign ERP systems",
          "Local support from Lumex Digital in Nairobi",
          "Swahili and English language support",
          "Works on affordable Android tablets and low-spec laptops",
          "Fast setup — your shop can be live within 24 hours",
          "Regular updates with new features based on customer feedback",
        ],
      },
      {
        h2: "LUM-EX for Supermarkets & Retail",
        paragraphs: [
          "Supermarkets need speed at the checkout and accuracy in the back office. LUM-EX handles high-volume sales with barcode scanning, multi-tender payments and automatic stock deductions. Managers track shelf inventory, expiry dates and re-order levels from a single screen.",
        ],
      },
      {
        h2: "LUM-EX for Pharmacies & Chemists",
        paragraphs: [
          "Pharmacies require strict stock tracking for regulated medicines. LUM-EX supports batch numbers, expiry alerts, prescription notes and controlled-item flags. Sales reports help you comply with pharmacy board requirements and manage supplier re-orders efficiently.",
        ],
      },
      {
        h2: "LUM-EX for Salons & Barber Shops",
        paragraphs: [
          "Booking appointments, managing stylists and tracking product sales are all handled in LUM-EX. Clients book slots through WhatsApp or your website, and the system reminds them via SMS. Product sales and service revenue are separated in reports so you know exactly what drives profit.",
        ],
      },
      {
        h2: "LUM-EX for Water Companies & WiFi Providers",
        paragraphs: [
          "Utility-style businesses need subscription and billing management. LUM-EX supports recurring billing, customer account balances, payment reminders and service suspension tracking. Water delivery routes and WiFi voucher generation are built into the workflow.",
        ],
      },
      {
        h2: "Pricing & Getting Started",
        paragraphs: [
          "LUM-EX is priced for the Kenyan market. We offer monthly subscriptions and one-time license options depending on the number of branches, users and features you need. Every plan includes setup, training and ongoing support.",
          "To get started, contact Lumex Digital for a free demo. We will assess your business needs, configure LUM-EX for your industry and train your staff before you process your first sale.",
        ],
      },
    ]}
    faqs={[
      { q: "Does LUM-EX work without internet?", a: "Yes. LUM-EX is built offline-first. Sales, stock updates and customer records are saved locally and sync to the cloud automatically when the internet is available." },
      { q: "Can I use LUM-EX on a phone or tablet?", a: "Yes. LUM-EX runs on Android tablets, smartphones, laptops and desktops. We recommend tablets for POS counters and laptops for managers." },
      { q: "Is M-Pesa integrated?", a: "Yes. LUM-EX integrates M-Pesa STK Push, Till numbers and Paybill for seamless payment collection and automatic reconciliation." },
      { q: "How many businesses can I manage?", a: "You can manage unlimited businesses from one LUM-EX account. Switch between shops, salons, pharmacies or water companies without logging out." },
      { q: "Is my data secure?", a: "All data is encrypted locally and during sync. Cloud backups happen automatically and you can export your data anytime." },
      { q: "Do you provide training?", a: "Every LUM-EX installation includes hands-on staff training, a printed quick-start guide and ongoing WhatsApp and phone support." },
    ]}
    relatedLinks={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "LUM-EX Management System",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, Windows, macOS, Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "KES",
      },
      description: "Scalable, offline-first, multi-business management platform for shops, supermarkets, pharmacies, salons, barber shops, water companies and WiFi providers in Kenya.",
      url: "https://softwareworld.co.ke",
      publisher: { "@type": "Organization", name: "Lumex Digital", url: "https://lumexdigital.co.ke" },
    }}
    externalCta={{ href: "https://softwareworld.co.ke", label: "Open LUM-EX" }}
    finalCtaHeading="Power Your Business with LUM-EX"
    finalCtaBody="Request a free demo of LUM-EX and see how Lumex Digital can transform your shop, supermarket, pharmacy or service business with one intelligent platform."
  />
);

export default ManagementSystemKenya;
