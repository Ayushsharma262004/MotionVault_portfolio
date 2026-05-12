import { useState } from "react";
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
import VideoModal from "@/components/VideoModal";
import AdminPanel from "@/components/AdminPanel";
import { useScrollReveal } from "@/hooks/useGsap";

const LandingPage = () => {
  const [videoModal, setVideoModal] = useState({ open: false, video: null });
  useScrollReveal();

  const openVideo = (video) => setVideoModal({ open: true, video });
  const closeVideo = () => setVideoModal({ open: false, video: null });

  return (
    <div className="min-h-screen bg-empire-bg font-body" data-testid="landing-page">
      <Navbar />
      <HeroSection onOpenVideo={openVideo} />
      <SportsShowcase />
      <HowItWorks />
      <Dashboard />
      <VideoSection onOpenVideo={openVideo} />
      <BlogSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
      <Footer />
      <VideoModal isOpen={videoModal.open} onClose={closeVideo} video={videoModal.video} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
