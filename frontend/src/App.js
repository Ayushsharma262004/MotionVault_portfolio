import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SportsShowcase from "@/components/SportsShowcase";
import HowItWorks from "@/components/HowItWorks";
import Dashboard from "@/components/Dashboard";
import VideoSection from "@/components/VideoSection";
import BlogSection from "@/components/BlogSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-empire-bg font-body" data-testid="landing-page">
      <Navbar />
      <HeroSection />
      <SportsShowcase />
      <HowItWorks />
      <Dashboard />
      <VideoSection />
      <BlogSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
