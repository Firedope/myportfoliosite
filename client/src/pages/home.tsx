import { useEffect } from "react";
import Navbar from "@/components/navigation/navbar";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/features-section";
import SkillsSection from "@/components/content-preview";
import EducationSection from "@/components/pricing-section";
import ContactSection from "@/components/payment-options";
import SoftSkillsSection from "@/components/subscription-form";
import Footer from "@/components/footer";
import { useLocation } from "wouter";

export default function Home() {
  const [location, setLocation] = useLocation();
  
  // Scroll to section if hash is present in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <SoftSkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
