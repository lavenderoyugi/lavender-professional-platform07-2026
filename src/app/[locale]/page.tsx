"use client";



import HeroSection from "@/components/HeroSection";
import ProfessionalHighlights from "@/components/ProfessionalHighlights/ProfessionalHighlights";
import OpportunitySection from "@/components/OpportunitySection";
import JourneySection from "@/components/JourneySection";

import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  
  

  return (
  <main className="min-h-screen bg-black text-white">

    <Navbar />

    <HeroSection />

    <ProfessionalHighlights />

    <OpportunitySection />

    <JourneySection />

    <ContactSection />

  </main>
);
}