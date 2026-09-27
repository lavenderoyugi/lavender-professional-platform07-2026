import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const projects = {
  "lavender-finds": {
    key: "lavenderFinds",
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    github: "https://github.com/lavenderoyugi/lavender-professional-platform07-2026",
  },
  "professional-platform": {
    key: "portfolio",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "Vercel"],
    github: "https://github.com/lavenderoyugi/lavender-professional-platform07-2026",
  },
  "bicycle-parking-analysis": {
    key: "bicycle",
    technologies: ["Power BI", "Excel", "Data Analysis"],
    github: "https://github.com/lavenderoyugi/-Bicycle-Parking-Infrastructure-Analysis-in-the-Loire-Atlantique-Area-",
  },
  "developer-technology-survey": {
    key: "developerSurvey",
    technologies: ["Power BI", "SQL", "Python", "Data Visualisation"],
    github: null,
  },
} as const;

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug as keyof typeof projects];

  if (!project) notFound();

  const t = await getTranslations("caseStudies");
  const base = `projects.${project.key}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <Link
          href="/#portfolio"
          className="text-sm font-semibold text-violet-400 transition hover:text-violet-300"
        >
          ← {t("backToPortfolio")}
        </Link>

        <div className="mt-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
            {t("label")}
          </p>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
            {t(`${base}.title`)}
          </h1>

          <p className="mt-7 text-xl leading-9 text-zinc-400">
            {t(`${base}.intro`)}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300"
              >
                {technology}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-violet-500/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-200 transition hover:border-violet-400 hover:bg-violet-500/20"
              >
                GitHub ↗
              </a>
            )}

            <Link
              href="/#contact"
              className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-violet-400 hover:text-violet-300"
            >
              {t("discussProject")}
            </Link>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-violet-500/20 bg-zinc-950">
          <div className="flex min-h-[260px] items-center justify-center px-8 py-16 text-center">
            <div>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-3xl">
                📷
              </div>
              <h2 className="text-xl font-bold">{t("screenshotsTitle")}</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-500">
                {t("screenshotsText")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              {t("challengeLabel")}
            </p>
            <h2 className="mt-4 text-2xl font-bold">{t(`${base}.challengeTitle`)}</h2>
            <p className="mt-4 leading-8 text-zinc-400">{t(`${base}.challenge`)}</p>
          </section>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              {t("solutionLabel")}
            </p>
            <h2 className="mt-4 text-2xl font-bold">{t(`${base}.solutionTitle`)}</h2>
            <p className="mt-4 leading-8 text-zinc-400">{t(`${base}.solution`)}</p>
          </section>
        </div>

        <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950/70 p-7 md:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
            {t("impactLabel")}
          </p>
          <h2 className="mt-4 text-2xl font-bold">{t(`${base}.impactTitle`)}</h2>
          <p className="mt-4 max-w-4xl leading-8 text-zinc-400">{t(`${base}.impact`)}</p>
        </section>

        <div className="mt-12">
          <Link
            href="/#portfolio"
            className="inline-flex text-sm font-semibold text-violet-400 transition hover:text-violet-300"
          >
            ← {t("backToPortfolio")}
          </Link>
        </div>
      </div>
    </main>
  );
}
