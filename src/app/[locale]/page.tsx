"use client";



import HeroSection from "@/components/HeroSection";
import ProfessionalHighlights from "@/components/ProfessionalHighlights/ProfessionalHighlights";
import JourneySection from "@/components/JourneySection";

import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  
  

  return (
  <main className="min-h-screen bg-black text-white">

    <Navbar />

    <HeroSection />

    <ProfessionalHighlights />

    <JourneySection />

    <ContactSection />

  </main>
);
}