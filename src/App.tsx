import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import PricingPackages from "./pages/PricingPackages";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import MemberPortal from "./pages/MemberPortal";
import MemberDashboard from "./pages/MemberDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SalesAdminDashboard from "./pages/SalesAdminDashboard";
import JoinUs from "./pages/JoinUs";
import LumexTeam from "./pages/LumexTeam";
import CyberSecurity from "./pages/CyberSecurity";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import AppDevelopment from "./pages/AppDevelopment";
import SoftwareDevelopment from "./pages/SoftwareDevelopment";
import ITServices from "./pages/ITServices";
import SoftwareProducts from "./pages/SoftwareProducts";
import WebsiteClasses from "./pages/WebsiteClasses";
import LumexAdminPage from "./pages/LumexAdminPage";
import NotFound from "./pages/NotFound";
import WebDesignKenya from "./pages/seo/WebDesignKenya";
import MobileAppDevelopmentKenya from "./pages/seo/MobileAppDevelopmentKenya";
import SoftwareDevelopmentKenya from "./pages/seo/SoftwareDevelopmentKenya";
import SchoolManagementSystemKenya from "./pages/seo/SchoolManagementSystemKenya";
import BusinessSystemsKenya from "./pages/seo/BusinessSystemsKenya";
import WebHostingKenya from "./pages/seo/WebHostingKenya";
import SeoServicesKenya from "./pages/seo/SeoServicesKenya";
import Blog from "./pages/seo/Blog";
import ManagementSystemKenya from "./pages/seo/ManagementSystemKenya";
import Careers from "./pages/Careers";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GlassTransitions />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<PricingPackages />} />
            <Route path="/pricing-packages" element={<PricingPackages />} />
            <Route path="/packages" element={<PricingPackages />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/member-portal" element={<MemberPortal />} />
            <Route path="/member-dashboard" element={<MemberDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/sales-admin" element={<SalesAdminDashboard />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/lumex" element={<LumexTeam />} />
            <Route path="/cybersecurity" element={<CyberSecurity />} />
            <Route path="/website-development" element={<WebsiteDevelopment />} />
            <Route path="/app-development" element={<AppDevelopment />} />
            <Route path="/software-development" element={<SoftwareDevelopment />} />
            <Route path="/it-services" element={<ITServices />} />
            <Route path="/software-products" element={<SoftwareProducts />} />
            <Route path="/buy-software" element={<SoftwareProducts />} />
            <Route path="/website-classes" element={<WebsiteClasses />} />
            <Route path="/classes" element={<WebsiteClasses />} />
            <Route path="/admin-login" element={<MemberPortal />} />
            <Route path="/lumexadmin254kenyalost34657283tems14" element={<LumexAdminPage />} />
            <Route path="/lumexadmin254kenyalost34657283tems14/*" element={<LumexAdminPage />} />
            <Route path="/web-design-kenya" element={<WebDesignKenya />} />
            <Route path="/mobile-app-development-kenya" element={<MobileAppDevelopmentKenya />} />
            <Route path="/software-development-kenya" element={<SoftwareDevelopmentKenya />} />
            <Route path="/school-management-system-kenya" element={<SchoolManagementSystemKenya />} />
            <Route path="/business-systems-kenya" element={<BusinessSystemsKenya />} />
            <Route path="/web-hosting-kenya" element={<WebHostingKenya />} />
            <Route path="/seo-services-kenya" element={<SeoServicesKenya />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/management-system-kenya" element={<ManagementSystemKenya />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
