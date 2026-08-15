"use client";

"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
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
      ? "text-violet-400 font-semibold"
      : "transition hover:text-violet-400"
  }
>
  {t("home")}
</Link>

<Link
  href="/#journey"
  className={
    pathname === "/#journey"
      ? "text-violet-400 font-semibold"
      : "transition hover:text-violet-400"
  }
>
  {t("journey")}
</Link>

<Link
  href="/#portfolio"
  className={
    pathname === "/#portfolio"
      ? "text-violet-400 font-semibold"
      : "transition hover:text-violet-400"
  }
>
  {t("portfolio")}
</Link>

<Link
  href="/finds"
  className={
    pathname === "/finds"
      ? "text-violet-400 font-semibold"
      : "transition hover:text-violet-400"
  }
>
  Lavender Finds
</Link>

<Link
  href="/#contact"
  className={
    pathname === "/#contact"
      ? "text-violet-400 font-semibold"
      : "transition hover:text-violet-400"
  }
>
  {t("contact")}
</Link>

                    <div className="h-6 w-px bg-white/20" />

          {/* Cart */}
          <Link
            href="/cart"
            className="relative transition hover:text-violet-400"
          >
            🛒 Cart

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <LanguageSwitcher />
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-3xl text-violet-400 transition hover:text-violet-300 md:hidden"
          aria-label="Toggle menu"
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
  href="/finds"
  className="transition hover:text-violet-400"
  onClick={() => setMobileMenuOpen(false)}
>
  Lavender Finds
</Link>

<Link
  href="/#contact"
  className="transition hover:text-violet-400"
  onClick={() => setMobileMenuOpen(false)}
>
  {t("contact")}
</Link>

<Link
  href="/cart"
  className="flex items-center gap-2 transition hover:text-violet-400"
  onClick={() => setMobileMenuOpen(false)}
>
  🛒 Cart

  {cartCount > 0 && (
    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-xs font-bold text-white">
      {cartCount}
    </span>
  )}
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