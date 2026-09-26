import SeoLandingPage from "@/components/seo/SeoLandingPage";

const RELATED = [
  { to: "/software-development-kenya", label: "Custom Software" },
  { to: "/business-systems-kenya", label: "Business Systems" },
  { to: "/web-design-kenya", label: "School Website Design" },
  { to: "/web-hosting-kenya", label: "Hosting & Domains" },
];

const SchoolManagementSystemKenya = () => (
  <SeoLandingPage
    seoTitle="School Management System Kenya | Lumex Digital"
    metaDescription="Lumex Digital builds school management systems in Kenya for schools, academies and training institutions. Manage students, fees, exams, classes and reports."
    canonicalPath="/school-management-system-kenya"
    eyebrow="School Management System"
    h1="School Management System Kenya"
    heroLead="A complete digital platform to run your school — students, fees, exams, classes, attendance and reports in one place."
    heroDescription="Lumex Digital develops school management systems for primary schools, secondary schools, academies, colleges and training institutions across Kenya. Our system handles everything from student records to fee management, exam results and parent communication."
    heroBullets={[
      "Centralized student and parent records",
      "Fees billing, payments and balances",
      "Exam entry, processing and report cards",
      "Class, subject and teacher management",
    ]}
    sections={[
      {
        h2: "Core Modules in Our School System",
        bullets: [
          "Student records and admissions",
          "Fee management and statements",
          "Exam entry and results processing",
          "Class and subject management",
          "Teacher accounts and timetables",
          "Parent portal and notifications",
          "Attendance tracking",
          "Reports and analytics dashboard",
          "Secure role-based access",
          "Custom modules for your school",
        ],
      },
      {
        h2: "Fee Management Made Simple",
        paragraphs: [
          "Track invoices, payments and balances for every student in real time. Our system generates fee statements, prints receipts and supports M-Pesa and bank payments. School administrators get instant reports on collections, defaulters and term-by-term performance.",
        ],
      },
      {
        h2: "Exams, Reports and Performance Tracking",
        paragraphs: [
          "Teachers enter marks directly into the system. Our exam module automatically calculates totals, grades, positions and prints report cards in the format your school prefers. Head teachers and directors can view performance trends across classes, subjects and academic years.",
        ],
      },
      {
        h2: "Parent Portal & Communication",
        subsections: [
          { h3: "Parent Login", body: "Parents log in to view fee balances, exam results, attendance records and school announcements." },
          { h3: "SMS & WhatsApp Alerts", body: "Send instant notifications for fee reminders, exam results, event invitations and emergencies." },
        ],
      },
      {
        h2: "Custom Features for Your School",
        paragraphs: [
          "Every school operates differently. Whether you need transport management, library tracking, boarding records or a custom report format, Lumex Digital can build it. We start with our base school management system and tailor every module to your school's specific workflow.",
        ],
      },
    ]}
    faqs={[
      { q: "Can your school system handle multiple campuses?", a: "Yes. We can configure multi-campus or multi-branch setups with separate logins, separate fee structures and consolidated reports." },
      { q: "Is the system cloud-based?", a: "Yes. The system is hosted online so teachers, parents and administrators can access it from anywhere on phones, tablets or computers." },
      { q: "Can you migrate our existing student data?", a: "Absolutely. We import student records, fee balances and historical exam data from Excel or your previous system." },
    ]}
    relatedLinks={RELATED}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Lumex School Management System",
      description: "Cloud-based school management system for Kenyan schools, academies and training institutions.",
      brand: { "@type": "Brand", name: "Lumex Digital" },
      url: "https://lumexdigital.co.ke/school-management-system-kenya",
    }}
  />
);

export default SchoolManagementSystemKenya;
