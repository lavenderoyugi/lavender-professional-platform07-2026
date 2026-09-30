"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { trackEvent } from "@/lib/analytics";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const cvHref =
    locale === "fr" ? "/cv-fr.pdf" :
    locale === "de" ? "/cv-de.pdf" :
    "/cv-en.pdf";

  const skills = [
    t("skills.powerBI"),
    t("skills.excel"),
    t("skills.sql"),
    t("skills.businessIntelligence"),
    t("skills.processImprovement"),
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-violet-700/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 md:grid-cols-2 md:gap-16 lg:px-10 lg:py-16">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.42em] text-violet-400">
            {t("welcome")}
          </p>

          <h1 className="mb-4 text-5xl font-black leading-[0.95] lg:text-7xl">
            <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-violet-600 bg-clip-text text-transparent">
              {t("firstName")}
            </span>
            <br />
            <span className="text-white">{t("lastName")}</span>
          </h1>

          <h2 className="mb-3 text-2xl font-bold leading-tight text-white md:text-3xl">
            {t("title1")}
          </h2>

          <p className="mb-6 max-w-xl text-base font-medium leading-7 text-violet-200 md:text-lg">
            {t("title2")}
          </p>

          <p className="mb-8 max-w-xl text-base leading-7 text-gray-400">
            {t("intro")}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#portfolio"
              onClick={() => trackEvent("portfolio_click", { language: locale })}
              className="rounded-full bg-violet-500 px-7 py-3.5 font-semibold text-white transition hover:bg-violet-600"
            >
              {t("projectsButton")}
            </a>

            <a
              href={cvHref}
              download
              onClick={() => trackEvent("download_cv", { language: locale })}
              className="rounded-full border border-violet-400 px-7 py-3.5 font-semibold text-violet-200 transition hover:bg-violet-500 hover:text-white"
            >
              {t("downloadCV")}
            </a>

            <a
              href="#contact"
              onClick={() => trackEvent("contact_click", { language: locale })}
              className="rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:border-violet-400 hover:text-violet-200"
            >
              {t("contactButton")}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-violet-400/40 bg-violet-500/10 px-3.5 py-1.5 text-sm text-violet-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-0 rounded-[40px] bg-violet-500 blur-3xl opacity-20" />
            <div className="relative overflow-hidden rounded-[40px] border border-violet-500/20 bg-zinc-900 shadow-2xl">
              <Image
                src="/images/lavender-oyugi.png"
                alt="Lavender Oyugi"
                width={520}
                height={650}
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
