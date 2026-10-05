"use client";

import { useTranslations } from "next-intl";

const services = [
  { key: "reporting", icon: "📊" },
  { key: "data", icon: "🔎" },
  { key: "operations", icon: "⚙️" },
  { key: "digital", icon: "💻" },
];

export default function OpportunitySection() {
  const t = useTranslations("opportunities");

  return (
    <section className="bg-zinc-950 px-6 py-20 text-white md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
            {t("label")}
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            {t("intro")}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.key}
              className="rounded-3xl border border-white/10 bg-black/40 p-6 transition hover:border-violet-500/50"
            >
              <div className="text-3xl">{service.icon}</div>
              <h3 className="mt-5 text-xl font-bold">{t(`${service.key}.title`)}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                {t(`${service.key}.description`)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex rounded-full bg-violet-600 px-7 py-3.5 font-semibold text-white transition hover:bg-violet-500"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
