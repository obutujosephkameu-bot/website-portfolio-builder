import SeoLandingPage from "@/components/seo/SeoLandingPage";

const RELATED = [
  { to: "/web-design-kenya", label: "Website Design" },
  { to: "/software-development-kenya", label: "Custom Software" },
  { to: "/school-management-system-kenya", label: "School Management System" },
  { to: "/business-systems-kenya", label: "Business Systems" },
  { to: "/portfolio", label: "View Portfolio" },
];

const MobileAppDevelopmentKenya = () => (
  <SeoLandingPage
    seoTitle="Mobile App Development in Kenya | Lumex Digital"
    metaDescription="Lumex Digital builds mobile applications in Kenya for businesses, schools, startups and organizations. We create modern, user-friendly mobile app solutions."
    canonicalPath="/mobile-app-development-kenya"
    eyebrow="Mobile App Development"
    h1="Mobile App Development in Kenya"
    heroLead="Android and modern mobile apps for businesses, schools, startups and organizations across Kenya."
    heroDescription="Lumex Digital develops mobile applications that solve real problems — booking apps, customer portals, school apps, e-commerce apps and admin dashboards. We design clean, intuitive interfaces and build solid back-end systems that scale."
    heroBullets={[
      "Android apps for everyday Kenyan users",
      "Custom UI/UX designed for your brand",
      "Secure user accounts and dashboards",
      "Integration with payments, SMS and WhatsApp",
    ]}
    sections={[
      {
        h2: "Types of Mobile Apps We Build",
        paragraphs: [
          "We build mobile apps that match the way Kenyans actually use their phones. From customer-facing apps to internal staff tools, our development team designs apps that are simple to use, fast and reliable.",
        ],
        bullets: [
          "Android business apps",
          "School and student apps",
          "Booking and reservation apps",
          "E-commerce and shopping apps",
          "Delivery and logistics apps",
          "Customer portals and loyalty apps",
          "Admin dashboards and staff tools",
          "Event and ticketing apps",
        ],
      },
      {
        h2: "App UI/UX Design",
        paragraphs: [
          "A great app starts with great design. Our UI/UX designers craft clean, modern interfaces that feel natural on Kenyan smartphones. We prototype every screen, test the flow with real users and refine the design before development begins.",
          "Good design reduces support requests, increases adoption and turns first-time users into loyal customers.",
        ],
      },
      {
        h2: "Our Mobile App Development Process",
        subsections: [
          { h3: "1. Discovery", body: "We meet with you to understand the problem, your users, your business goals and the features your app needs." },
          { h3: "2. Design", body: "We create wireframes and high-fidelity UI mockups for every screen, including light and dark modes when required." },
          { h3: "3. Development", body: "Our engineers build the app with clean code, secure authentication and reliable APIs." },
          { h3: "4. Testing", body: "We test on real Android devices, fix bugs and optimize performance for low-end and high-end phones alike." },
          { h3: "5. Launch & Support", body: "We help you publish to Google Play and provide ongoing maintenance, updates and feature improvements." },
        ],
      },
      {
        h2: "Mobile Apps That Connect to Your Business Systems",
        paragraphs: [
          "Most of our mobile apps connect to a custom back-end so your staff can manage users, orders, bookings and reports from a web dashboard. We build the entire ecosystem — the mobile app, the admin dashboard and the database — so everything works together seamlessly.",
        ],
      },
    ]}
    faqs={[
      { q: "Do you build apps for both Android and iPhone?", a: "We focus on Android because it covers the majority of Kenyan users, but we can also build cross-platform apps for iOS when required." },
      { q: "How long does mobile app development take?", a: "A small MVP app takes 4 to 6 weeks. Larger apps with payments, bookings and admin dashboards take 8 to 16 weeks depending on scope." },
      { q: "Can you integrate M-Pesa or card payments?", a: "Yes. We integrate M-Pesa STK Push, card payments and other Kenyan payment providers into your mobile app." },
    ]}
    relatedLinks={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Mobile App Development",
      provider: { "@type": "Organization", name: "Lumex Digital", url: "https://lumexdigital.co.ke" },
      areaServed: { "@type": "Country", name: "Kenya" },
      url: "https://lumexdigital.co.ke/mobile-app-development-kenya",
    }}
  />
);

export default MobileAppDevelopmentKenya;
