"use client";

import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

export default function FindsPage() {
  const t = useTranslations("finds");

  return (
  <main className="min-h-screen bg-black text-white">

    <Navbar />

    <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 uppercase tracking-[0.35em] text-violet-400">
          {t("welcome")}
        </p>

        <h1 className="mb-8 text-6xl font-bold text-violet-400">
          {t("title")}
        </h1>

        <p className="max-w-3xl text-xl leading-9 text-gray-300">
          {t("tagline")}
        </p>

        <p className="mt-8 max-w-3xl text-lg leading-9 text-gray-400">
          {t("paragraph1")}
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-9 text-gray-400">
          {t("paragraph2")}
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-9 text-gray-400">
          {t("paragraph3")}
        </p>
      </section>
    </main>
  );
}