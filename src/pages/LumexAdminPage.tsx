import { useEffect, useState } from "react";
import { AdminAuthProvider, useAdminAuth } from "@/admin/AdminAuthContext";
import AdminLogin from "@/admin/AdminLogin";
import AdminShell, { AdminSection } from "@/admin/AdminShell";
import DashboardSection from "@/admin/DashboardSection";
import MessagesSection from "@/admin/MessagesSection";
import MailSection from "@/admin/MailSection";
import CrudSection from "@/admin/CrudSection";
import SettingsForm from "@/admin/SettingsForm";
import { NotificationsSection, AdminSettingsSection } from "@/admin/SettingsSections";
import { adminDb, ADMIN_PATH } from "@/lib/firebase-admin";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Inner = () => {
  const { user, loading, isAdmin, logout } = useAdminAuth();
  const [section, setSection] = useState<AdminSection>("dashboard");
  const [newCount, setNewCount] = useState(0);

  // Inject admin manifest dynamically (so the public site doesn't advertise it)
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "manifest";
    link.href = "/lumex-admin-manifest.webmanifest";
    link.id = "lumex-admin-manifest";
    document.head.appendChild(link);
    const prev = document.title;
    document.title = "LUMEX Admin";
    return () => {
      document.getElementById("lumex-admin-manifest")?.remove();
      document.title = prev;
    };
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(adminDb, "messages"), where("status", "==", "new"));
    const unsub = onSnapshot(q, (s) => setNewCount(s.size), () => setNewCount(0));
    return () => unsub();
  }, [isAdmin]);

  if (loading) {
    return <div className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center">Loading…</div>;
  }
  if (!user) return <AdminLogin />;
  if (!isAdmin) {
    // Authenticated but not the owner — block immediately.
    logout();
    return (
      <div className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-red-400">Access Denied</h1>
          <p className="opacity-70 mt-2">This account is not authorized for the Lumex Admin console.</p>
        </div>
      </div>
    );
  }

  let body: React.ReactNode = null;
  switch (section) {
    case "dashboard": body = <DashboardSection onJump={(s) => setSection(s)} />; break;
    case "messages": body = <MessagesSection />; break;
    case "mail": body = <MailSection />; break;
    case "businesses":
      body = <CrudSection collectionName="businesses" title="Businesses Built" titleField="name" imageField="logo"
        fields={[
          { name: "name", label: "Business Name" },
          { name: "logo", label: "Logo / Image URL", type: "url" },
          { name: "website", label: "Website URL", type: "url" },
          { name: "description", label: "Short Description", type: "textarea" },
          { name: "category", label: "Category" },
          { name: "featured", label: "Featured? (yes/no)" },
        ]} />; break;
    case "software":
      body = <CrudSection collectionName="software" title="Software Built" titleField="name" imageField="image"
        fields={[
          { name: "name", label: "Software Name" },
          { name: "image", label: "Image / Icon URL", type: "url" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "features", label: "Features", type: "textarea" },
          { name: "demoUrl", label: "Demo Link", type: "url" },
          { name: "price", label: "Price (KES, optional)" },
        ]} />; break;
    case "apps":
      body = <CrudSection collectionName="apps" title="Apps Built" titleField="name" imageField="image"
        fields={[
          { name: "name", label: "App Name" },
          { name: "image", label: "Icon / Screenshot URL", type: "url" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "features", label: "Features", type: "textarea" },
          { name: "downloadUrl", label: "Download / Demo Link", type: "url" },
          { name: "platform", label: "Platform", type: "select", options: ["Android", "iOS", "Web App", "Desktop App"] },
        ]} />; break;
    case "offers":
      body = <CrudSection collectionName="offers" title="Offers" titleField="title" imageField="image"
        fields={[
          { name: "title", label: "Offer Title" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image URL", type: "url" },
          { name: "oldPrice", label: "Old Price" },
          { name: "newPrice", label: "New Price" },
          { name: "discount", label: "Discount %" },
          { name: "startDate", label: "Start Date", type: "date" },
          { name: "endDate", label: "End Date", type: "date" },
          { name: "status", label: "Status", type: "select", options: ["active", "draft", "expired", "hidden"] },
        ]} />; break;
    case "website":
      body = <SettingsForm docId="website" title="Website Settings" fields={[
        { name: "siteName", label: "Website Name" },
        { name: "logoUrl", label: "Website Logo URL", type: "url" },
        { name: "bannerTitle", label: "Homepage Banner Title" },
        { name: "bannerSubtitle", label: "Homepage Banner Subtitle" },
        { name: "bannerImage", label: "Homepage Banner Image URL", type: "url" },
        { name: "about", label: "About Section", type: "textarea" },
        { name: "services", label: "Services Section", type: "textarea" },
        { name: "phone", label: "Contact Phone" },
        { name: "whatsapp", label: "WhatsApp Number" },
        { name: "email", label: "Email Address", type: "email" },
        { name: "facebook", label: "Facebook URL", type: "url" },
        { name: "instagram", label: "Instagram URL", type: "url" },
        { name: "tiktok", label: "TikTok URL", type: "url" },
        { name: "footerText", label: "Footer Text", type: "textarea" },
      ]} />; break;
    case "seo":
      body = <SettingsForm docId="seo" title="SEO Settings" fields={[
        { name: "title", label: "SEO Title" },
        { name: "description", label: "SEO Description", type: "textarea" },
        { name: "keywords", label: "SEO Keywords" },
        { name: "ogImage", label: "Open Graph Image URL", type: "url" },
        { name: "favicon", label: "Favicon URL", type: "url" },
        { name: "homeMetaTitle", label: "Home Meta Title" },
        { name: "homeMetaDescription", label: "Home Meta Description", type: "textarea" },
      ]} />; break;
    case "notifications": body = <NotificationsSection />; break;
    case "settings": body = <AdminSettingsSection />; break;
  }

  return (
    <AdminShell active={section} onChange={setSection} newCount={newCount}>
      {body}
    </AdminShell>
  );
};

const LumexAdminPage = () => (
  <AdminAuthProvider>
    <Inner />
  </AdminAuthProvider>
);

export default LumexAdminPage;
export { ADMIN_PATH };
