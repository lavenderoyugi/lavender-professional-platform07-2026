import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

          <h1 className="text-2xl font-bold text-violet-400">
            Lavender Oyugi
          </h1>

          <div className="hidden items-center gap-10 text-sm font-semibold uppercase tracking-wider text-gray-300 md:flex">

            <a
              href="#"
              className="relative transition hover:text-violet-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all hover:after:w-full"
            >
              Home
            </a>

            <a
              href="#journey"
              className="relative transition hover:text-violet-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all hover:after:w-full"
            >
              My Journey
            </a>

            <a
              href="#portfolio"
              className="relative transition hover:text-violet-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all hover:after:w-full"
            >
              Portfolio
            </a>

            <a
              href="#blog"
              className="relative transition hover:text-violet-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all hover:after:w-full"
            >
              Blog
            </a>

            <a
              href="#contact"
              className="relative transition hover:text-violet-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all hover:after:w-full"
            >
              Contact
            </a>

          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />
      <JourneySection />

    </main>
  );
}