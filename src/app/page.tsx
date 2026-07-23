import { useTranslations } from "next-intl";
import HeroSection from "@/components/HeroSection";
import ProfessionalHighlights from "@/components/ProfessionalHighlights/ProfessionalHighlights";
import JourneySection from "@/components/JourneySection";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const t = useTranslations("navigation");

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold text-violet-400">
              Lavender Oyugi
            </h1>

            <p className="mt-1 text-xs uppercase tracking-[0.35em] text-gray-400">
  {t("tagline")}
</p>
          </div>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#"
              className="relative transition hover:text-violet-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all hover:after:w-full"
            >
              {t("home")}
            </a>

            <a
              href="#journey"
              className="relative transition hover:text-violet-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all hover:after:w-full"
            >
              {t("journey")}
            </a>

            <a
              href="#portfolio"
              className="relative transition hover:text-violet-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all hover:after:w-full"
            >
              {t("portfolio")}
            </a>

            <a
              href="#blog"
              className="relative transition hover:text-violet-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all hover:after:w-full"
            >
              {t("blog")}
            </a>

            <a
              href="#contact"
              className="relative transition hover:text-violet-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all hover:after:w-full"
            >
              {t("contact")}
            </a>
            <div className="h-6 w-px bg-white/20" />

<LanguageSwitcher />

          </div>

        </div>
      </nav>

      <HeroSection />

      <ProfessionalHighlights />

      <JourneySection />

      <ContactSection />

    </main>
  );
}