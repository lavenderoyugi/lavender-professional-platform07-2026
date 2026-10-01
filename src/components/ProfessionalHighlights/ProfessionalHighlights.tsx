"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const dataProjects = [
  { key: "bicycle", slug: "bicycle-parking-analysis", icon: "🚲", technologies: ["Power BI", "Excel", "Data Analysis"] },
  { key: "developerEmployment", slug: "developer-employment-and-salary-analysis", icon: "📊", technologies: ["Power BI", "Data Analysis", "Data Visualisation"] },
];

const personalProjects = [
  { key: "lavenderFinds", slug: "lavender-finds", icon: "🛍️", technologies: ["Operations", "Inventory", "Dashboard", "Supabase", "AI-assisted development"] },
  { key: "portfolio", slug: "professional-platform", icon: "💻", technologies: ["Digital project", "Next.js", "TypeScript", "AI-assisted development"] },
];

export default function ProfessionalHighlights() {
  const t = useTranslations("highlights");

  const renderGroup = (
    title: string,
    description: string,
    projects: typeof dataProjects,
    badge: string
  ) => (
    <div className="mb-14 last:mb-0">
      <div className="mb-7 max-w-3xl">
        <h3 className="text-2xl font-bold text-white md:text-3xl">{title}</h3>
        <p className="mt-2 leading-7 text-zinc-500">{description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.key}
            className="group rounded-3xl border border-zinc-800 bg-zinc-950/80 p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-500/70"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-2xl">
                {project.icon}
              </div>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs uppercase tracking-wider text-zinc-500">
                {badge}
              </span>
            </div>

            <h4 className="mt-7 text-2xl font-bold text-white">
              {t(`${project.key}.title`)}
            </h4>

            <p className="mt-4 leading-7 text-zinc-400">
              {t(`${project.key}.description`)}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
                >
                  {technology}
                </span>
              ))}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="mt-7 inline-flex text-sm font-semibold text-violet-400 transition hover:text-violet-300"
            >
              {t("viewCaseStudy")} →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );

  return (
    <section id="portfolio" className="w-full bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
            {t("label")}
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-400">
            {t("subheading")}
          </p>
        </div>

        {renderGroup(t("dataGroupTitle"), t("dataGroupDescription"), dataProjects, t("caseStudy"))}
        {renderGroup(t("personalGroupTitle"), t("personalGroupDescription"), personalProjects, t("personalProject"))}

        <div className="mt-12 rounded-2xl border border-violet-500/15 bg-violet-500/5 px-6 py-5 text-center">
          <p className="text-sm leading-6 text-zinc-400">{t("aiDisclosure")}</p>
        </div>
      </div>
    </section>
  );
}
