import AppointmentBooking from "@/Components/Landing/Appointment Booking/AppointmentBooking";
import AppointmentCTA from "@/Components/Landing/CTA Section/AppointmentCTA";
import StatsSection from "@/Components/Landing/CTA Section/StatsSection";
import WhyChooseUs from "@/Components/Landing/Features/WhyChooseUs";
import Footer from "@/Components/Landing/Footer/Footer";
import HeroSection from "@/Components/Landing/Hero Section/HeroSection";
import OurProjectsSection from "@/Components/Landing/Our Projects/OurProjectsSection";
import OurServicesSection from "@/Components/Landing/Our Services/OurServicesSection";
import ServiceSelection from "@/Components/Landing/Services/ServiceSelection";
import AgentCallingPage from "@/Components/Landing/Voice/AgentCallingPage";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div
        id="ai-agent"
        className="gradient-pulse bg-gradient-to-b to-primary to-70% from-30% via-secondary from-primary border-b border-white/60 px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20"
      >
        <AgentCallingPage />
      </div>
      <div
        id="our-services"
        className="gradient-pulse bg-gradient-to-b to-primary to-70% from-30% via-secondary from-primary border-b border-white/60 px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 overflow-x-hidden"
      >
        <OurServicesSection />
      </div>
      <div
        id="our-projects"
        className="gradient-pulse bg-gradient-to-b to-primary to-70% from-30% via-secondary from-primary border-b border-white/60 px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 overflow-x-hidden"
      >
        <OurProjectsSection />
      </div>
      <div
        id="service"
        className="gradient-pulse bg-gradient-to-b to-primary to-70% from-30% via-secondary from-primary border-b border-white/60 px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 overflow-x-hidden"
      >
        <ServiceSelection />
      </div>

      <div
        id="appointment"
        className="gradient-pulse bg-gradient-to-b to-primary to-70% from-30% via-secondary from-primary border-b border-white/60 px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20"
      >
        <AppointmentBooking />
      </div>
      <div
        id="features"
        className="gradient-pulse bg-gradient-to-b to-primary to-70% from-30% via-secondary from-primary border-b border-white/60 px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20"
      >
        <WhyChooseUs />
      </div>
      <div className="gradient-pulse bg-gradient-to-b to-primary to-70% from-30% via-secondary from-primary border-b border-white/60 px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        <AppointmentCTA />
        <StatsSection />
      </div>
      <div
        id="footer"
        className="gradient-pulse bg-gradient-to-b to-primary to-70% from-30% via-secondary from-primary px-4 sm:px-6 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-20"
      >
        <Footer />
      </div>
    </div>
  );
}
