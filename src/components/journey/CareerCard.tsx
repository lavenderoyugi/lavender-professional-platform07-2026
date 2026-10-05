"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type CareerCardProps = {
  year: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  achievement: string;
  impact: string;
  reflection?: string;
  defaultOpen?: boolean;
};

export default function CareerCard({
  year,
  title,
  company,
  location,
  summary,
  responsibilities,
  skills,
  achievement,
  impact,
  reflection,
  defaultOpen = false,
}: CareerCardProps) {
  const t = useTranslations("careerCard");
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article className="rounded-3xl border border-violet-500/20 bg-zinc-900 shadow-lg transition-all duration-300 hover:border-violet-400/60">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 p-6 text-left md:p-7"
      >
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
            {year}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-400 md:text-base">
            {company} • {location}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-400/30 text-xl text-violet-300 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          ↓
        </span>
      </button>

      <div
        className={`${open ? "block" : "hidden"} border-t border-white/10 px-6 pb-7 pt-7 md:px-7`}
      >
        <p className="leading-8 text-gray-300">{summary}</p>

        <div className="mt-9">
          <h4 className="mb-4 text-lg font-semibold text-violet-300">
            {t("responsibilities")}
          </h4>
          <ul className="space-y-3 text-gray-300">
            {responsibilities.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-9">
          <h4 className="mb-4 text-lg font-semibold text-violet-300">
            {t("skills")}
          </h4>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-violet-600/20 px-4 py-2 text-sm font-medium text-violet-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-9 rounded-2xl border border-violet-500/20 bg-black/30 p-6">
          <h4 className="text-lg font-semibold text-violet-300">
            {t("achievement")}
          </h4>
          <p className="mt-3 leading-8 text-gray-300">{achievement}</p>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-6">
          <h4 className="text-lg font-semibold text-violet-300">
            {t("impact")}
          </h4>
          <p className="mt-3 leading-8 text-gray-300">{impact}</p>
        </div>

        {reflection && (
          <div className="relative mt-8 overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-zinc-900 to-black p-7">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-violet-400">
              {t("reflection")}
            </p>
            <blockquote className="mt-4 max-w-3xl text-xl italic leading-9 text-white">
              {reflection}
            </blockquote>
          </div>
        )}
      </div>
    </article>
  );
}
