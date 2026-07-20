"use client";

import React from "react";

// Simple inline icon components to avoid dependency on 'lucide-react'
const Briefcase: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 3H8v4h8V3z" />
  </svg>
);

const BarChart3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const Cpu: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v2" />
    <path d="M15 1v2" />
    <path d="M9 23v-2" />
    <path d="M15 23v-2" />
  </svg>
);

const Globe2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 0 20" />
  </svg>
);
import { useTranslations } from "next-intl";

export default function ProfessionalHighlights() {
  const t = useTranslations("highlights");

  const cards = [
    {
      icon: Briefcase,
      title: t("leadership.title"),
      description: t("leadership.description"),
    },
    {
      icon: BarChart3,
      title: t("analytics.title"),
      description: t("analytics.description"),
    },
    {
      icon: Cpu,
      title: t("digital.title"),
      description: t("digital.description"),
    },
    {
      icon: Globe2,
      title: t("international.title"),
      description: t("international.description"),
    },
  ];

  return (
    <section className="w-full bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white">
            {t("heading")}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">
            {t("subheading")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 transition duration-300 hover:border-violet-500 hover:-translate-y-2"
              >
                <Icon className="mb-6 h-10 w-10 text-violet-400" />

                <h3 className="mb-4 text-xl font-semibold text-white">
                  {card.title}
                </h3>

                <p className="leading-7 text-gray-400">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}