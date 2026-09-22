"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Lavender Finds Logo */}
        <Link
          href="/finds"
          className="flex items-center"
          aria-label="Lavender Finds"
        >
          <Image
            src="/lfinds-logo.png"
            alt="Lavender Finds"
            width={90}
            height={90}
            priority
            className="h-20 w-20 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="/finds"
            className="transition hover:text-violet-400"
          >
            Shop
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
              href="/finds"
              className="transition hover:text-violet-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
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
