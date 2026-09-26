import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import OffersStrip from "@/components/home/OffersStrip";
import ServicesPreview from "@/components/home/ServicesPreview";
import PortfolioStrip from "@/components/home/PortfolioStrip";
import AboutPreview from "@/components/home/AboutPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <OffersStrip />
      <ServicesPreview />
      <PortfolioStrip />
      <AboutPreview />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
