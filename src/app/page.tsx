"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import HeroSection from "@/components/HeroSection";
import ProfessionalHighlights from "@/components/ProfessionalHighlights/ProfessionalHighlights";
import JourneySection from "@/components/JourneySection";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ContactSection from "@/components/ContactSection";
export default function Home() {
  const t = useTranslations("navigation");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold text-violet-400">
              Lavender Oyugi
            </h1>

            <p className="mt-1 text-xs uppercase tracking-[0.35em] text-gray-400">
              {t("tagline")}
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">

            <a href="#">
              {t("home")}
            </a>

            <a href="#journey">
              {t("journey")}
            </a>

            <a href="#portfolio">
              {t("portfolio")}
            </a>

            <a href="#blog">
              {t("blog")}
            </a>

            <a href="#contact">
              {t("contact")}
            </a>

            <div className="h-6 w-px bg-white/20" />

            <LanguageSwitcher />

          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-3xl text-violet-400 md:hidden"
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-zinc-950 md:hidden">

            <div className="flex flex-col gap-6 px-6 py-6">

              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("home")}
              </a>

              <a
                href="#journey"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("journey")}
              </a>

              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("portfolio")}
              </a>

              <a
                href="#blog"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("blog")}
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("contact")}
              </a>

              <div className="border-t border-white/10 pt-4">
                <LanguageSwitcher />
              </div>

            </div>

          </div>
        )}

      </nav>

      <HeroSection />

      <ProfessionalHighlights />

      <JourneySection />

      <ContactSection />

    </main>
  );
}