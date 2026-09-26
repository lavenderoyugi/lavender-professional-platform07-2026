"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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

          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-semibold text-violet-400"
                : "transition hover:text-violet-400"
            }
          >
            {t("home")}
          </Link>

          <Link
            href="/#journey"
            className="transition hover:text-violet-400"
          >
            {t("journey")}
          </Link>

          <Link
            href="/#portfolio"
            className="transition hover:text-violet-400"
          >
            {t("portfolio")}
          </Link>

          <Link
            href="/#contact"
            className="transition hover:text-violet-400"
          >
            {t("contact")}
          </Link>

          <LanguageSwitcher />
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-3xl text-violet-400 transition hover:text-violet-300 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-zinc-950 md:hidden">
          <div className="flex flex-col gap-6 px-6 py-6">

            <Link
              href="/"
              className="transition hover:text-violet-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("home")}
            </Link>

            <Link
              href="/#journey"
              className="transition hover:text-violet-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("journey")}
            </Link>

            <Link
              href="/#portfolio"
              className="transition hover:text-violet-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("portfolio")}
            </Link>

            <Link
              href="/#contact"
              className="transition hover:text-violet-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("contact")}
            </Link>

            <div className="border-t border-white/10 pt-4">
              <LanguageSwitcher />
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}