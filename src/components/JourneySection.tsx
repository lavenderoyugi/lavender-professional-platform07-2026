"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import CareerCard from "./journey/CareerCard";
import { useCareerData } from "@/data/careerData";

type FilterKey =
  | "all"
  | "work"
  | "education"
  | "entrepreneurship"
  | "volunteer"
  | "life";

const categoryInfo = {
  work: { icon: "💼", titleKey: "workTitle", subtitleKey: "workSubtitle" },
  education: { icon: "🎓", titleKey: "educationTitle", subtitleKey: "educationSubtitle" },
  entrepreneurship: { icon: "🚀", titleKey: "entrepreneurshipTitle", subtitleKey: "entrepreneurshipSubtitle" },
  volunteer: { icon: "🤝", titleKey: "volunteerTitle", subtitleKey: "volunteerSubtitle" },
  life: { icon: "❤️", titleKey: "lifeTitle", subtitleKey: "lifeSubtitle" },
} as const;

function getFilterCategory(
  category: string,
  jobId: number
): Exclude<FilterKey, "all"> {
  // Classification is based on stable career record IDs first, so
  // translations can never break the filters.
  if ([2.5, 3.5, 6].includes(jobId)) return "life";
  if ([4, 9, 10, 11, 15].includes(jobId)) return "education";
  if ([3, 5, 17].includes(jobId)) return "entrepreneurship";
  if ([16].includes(jobId)) return "volunteer";

  // Fallback for any future records that do not yet have an explicit ID mapping.
  const value = category.toLowerCase();

  if (value.includes("volunteer") || value.includes("bénévole") || value.includes("freiwill")) return "volunteer";
  if (value.includes("entrepreneur") || value.includes("entrepreneuriat")) return "entrepreneurship";
  if (
    value.includes("training") ||
    value.includes("education") ||
    value.includes("formation") ||
    value.includes("éducation") ||
    value.includes("ausbildung") ||
    value.includes("weiterbildung") ||
    value.includes("orientation") ||
    value.includes("berufsorientierung")
  ) return "education";
  if (
    value.includes("life") ||
    value.includes("vie") ||
    value.includes("leben") ||
    value.includes("transition") ||
    value.includes("milestone") ||
    value.includes("meilenstein")
  ) return "life";

  return "work";
}

export default function JourneySection() {
  const t = useTranslations("journeySection");
  const careerData = useCareerData();
  const [selectedCategory, setSelectedCategory] = useState<FilterKey>("all");

  // Keep the selected journey section in the URL so browser Back/Forward
  // restores the previous filter instead of losing the visitor's place.
  useEffect(() => {
    const syncFromUrl = () => {
      const value = new URLSearchParams(window.location.search).get("journey");
      const valid: FilterKey[] = ["all", "work", "education", "entrepreneurship", "volunteer", "life"];
      setSelectedCategory(valid.includes(value as FilterKey) ? (value as FilterKey) : "all");
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const selectCategory = (key: FilterKey) => {
    setSelectedCategory(key);

    const url = new URL(window.location.href);
    if (key === "all") {
      url.searchParams.delete("journey");
    } else {
      url.searchParams.set("journey", key);
    }

    window.history.pushState({ journey: key }, "", url);
    window.scrollTo({ top: document.getElementById("journey")?.offsetTop ?? 0, behavior: "smooth" });
  };

  // Master order: newest → oldest. Filtering happens after ordering.
  const chronologicalIds = [
    14, 17, 16, 13, 15, 18, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3.5, 3, 2.5, 2, 1,
  ];

  const orderedCareer = useMemo(
    () =>
      chronologicalIds
        .map((id) => careerData.find((item) => item.id === id))
        .filter((item): item is (typeof careerData)[number] => Boolean(item)),
    [careerData]
  );

  const filteredCareer = useMemo(
    () =>
      selectedCategory === "all"
        ? orderedCareer
        : orderedCareer.filter(
            (job) => getFilterCategory(job.category, job.id) === selectedCategory
          ),
    [orderedCareer, selectedCategory]
  );

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "work", label: t("filterWork") },
    { key: "education", label: t("filterEducation") },
    { key: "entrepreneurship", label: t("filterEntrepreneurship") },
    { key: "volunteer", label: t("filterVolunteer") },
    { key: "life", label: t("filterLife") },
  ];

  return (
    <section id="journey" className="bg-black px-6 py-24 text-white md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
            {t("label")}
          </p>
          <h2 className="mt-4 text-5xl font-extrabold tracking-tight md:text-6xl">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
            {t.rich("intro", { date: (chunks) => <strong>{chunks}</strong> })}
          </p>
        </div>

        <nav
          aria-label={t("filterLabel")}
          className="mb-16 flex flex-wrap justify-center gap-3"
        >
          {filters.map((item) => {
            const active = selectedCategory === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => selectCategory(item.key)}
                aria-pressed={active}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  active
                    ? "border-violet-400 bg-violet-600/20 text-violet-200"
                    : "border-zinc-700 bg-zinc-900/70 text-zinc-200 hover:border-violet-400 hover:text-violet-300",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="space-y-28">
          {filteredCareer.map((job, index) => {
            const filterCategory = getFilterCategory(job.category, job.id);
            const info = categoryInfo[filterCategory];
            const previousJob = filteredCareer[index - 1];
            const previousCategory = previousJob
              ? getFilterCategory(previousJob.category, previousJob.id)
              : null;
            const showCategoryHeading =
              selectedCategory === "all" && filterCategory !== previousCategory;

            return (
              <section
                key={job.id}
                id={
                  showCategoryHeading || index === 0
                    ? `journey-${filterCategory}`
                    : undefined
                }
                className="relative"
              >
                {showCategoryHeading && (
                  <div className="mb-6">
                    <span className="text-4xl">{info.icon}</span>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                      {t(info.titleKey)}
                    </h2>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-400">
                      {t(info.subtitleKey)}
                    </p>
                    <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-purple-300" />
                  </div>
                )}
                <CareerCard {...job} />
              </section>
            );
          })}
        </div>

        <div className="mt-20">
                  <nav
          aria-label={t("filterLabel")}
          className="flex flex-wrap justify-center gap-3 border-t border-zinc-900 pt-10"
        >
          {filters.map((item) => {
            const active = selectedCategory === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => selectCategory(item.key)}
                aria-pressed={active}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  active
                    ? "border-violet-400 bg-violet-600/20 text-violet-200"
                    : "border-zinc-700 bg-zinc-900/70 text-zinc-200 hover:border-violet-400 hover:text-violet-300",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: document.getElementById("journey")?.offsetTop ?? 0, behavior: "smooth" })}
            className="text-sm font-semibold text-violet-400 transition hover:text-violet-300"
          >
            ↑ {t("backToJourney")}
          </button>
        </div>
      </div>
    </section>
  );
}
