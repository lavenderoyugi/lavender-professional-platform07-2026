import { notFound } from "next/navigation";
import Image from "next/image";
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
  "developer-employment-and-salary-analysis": {
    key: "developerEmployment",
    technologies: ["Power BI", "Data Analysis", "Data Visualisation"],
    github: null,
  },
  "junior-data-analyst-job-market-analysis": {
    key: "juniorDataAnalyst",
    technologies: ["Python", "Data Analysis", "Job-Market Analysis"],
    github: null,
  },
} as const;

const professionalPlatformGallery = [
  {
    src: "/projects/professional-platform/01-homepage-desktop.png",
    alt: "Lavender Professional Platform desktop homepage",
    captionKey: "homepage",
    featured: true,
  },
  {
    src: "/projects/professional-platform/02-journey-desktop.png",
    alt: "Lavender Professional Platform professional journey",
    captionKey: "journey",
  },
  {
    src: "/projects/professional-platform/03-portfolio-desktop.png",
    alt: "Lavender Professional Platform projects and case studies",
    captionKey: "portfolio",
  },
  {
    src: "/projects/professional-platform/04-case-study-desktop.png",
    alt: "Lavender Professional Platform project case study",
    captionKey: "caseStudy",
  },
  {
    src: "/projects/professional-platform/05-homepage-mobile.png",
    alt: "Lavender Professional Platform mobile homepage",
    captionKey: "mobile",
    mobile: true,
  },
];

const juniorDataAnalystGallery = [
  {
    src: "/junior-data-analyst/top-skills.png",
    alt: "Top skills in data- and analyst-related job postings",
    captionKey: "topSkillsCaption",
  },
  {
    src: "/junior-data-analyst/technical-skills.png",
    alt: "Technical skills in data- and analyst-related job postings",
    captionKey: "technicalSkillsCaption",
  },
];

const developerEmploymentGallery = [
  {
    src: "/images/developer-employment/executive-overview.png",
    alt: "Developer employment and salary analysis executive overview",
    caption: "Executive overview",
  },
  {
    src: "/images/developer-employment/geography-salary.png",
    alt: "Developer employment and salary geography and salary analysis",
    caption: "Geography and salary analysis",
  },
  {
    src: "/images/developer-employment/skills-technologies.png",
    alt: "Developer employment skills and technologies analysis",
    caption: "Skills and technologies",
  },
];

const lavenderFindsGallery = [
  {
    src: "/projects/lavender-finds/01-storefront-desktop-clean.png",
    alt: "Lavender Finds desktop storefront",
    caption: "Customer-facing storefront",
    featured: true,
  },
  {
    src: "/projects/lavender-finds/02-admin-dashboard.png.png",
    alt: "Lavender Finds admin dashboard",
    caption: "Business and sales dashboard",
  },
  {
    src: "/projects/lavender-finds/03-inventory-management.png.png",
    alt: "Lavender Finds inventory management",
    caption: "Product and inventory management",
  },
  {
    src: "/projects/lavender-finds/04-storefront-mobile.png.png",
    alt: "Lavender Finds mobile storefront",
    caption: "Responsive mobile storefront",
    mobile: true,
  },
  {
    src: "/projects/lavender-finds/05-mobile-product-management.png.png",
    alt: "Lavender Finds mobile product management",
    caption: "Responsive product management",
    mobile: true,
  },
];

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
  const isLavenderFinds = slug === "lavender-finds";
  const isProfessionalPlatform = slug === "professional-platform";
  const isDeveloperEmployment = slug === "developer-employment-and-salary-analysis";
  const isJuniorDataAnalyst = slug === "junior-data-analyst-job-market-analysis";
  const notebookUrl = isJuniorDataAnalyst
    ? "https://github.com/lavenderoyugi/lavender-professional-platform07-2026/blob/recruiter-freelance-portfolio/notebooks/junior_data_analyst_job_market_analysis.ipynb"
    : null;
  const isPersonalDigitalProject = isLavenderFinds || isProfessionalPlatform;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-8">
          <Link
            href="/#portfolio"
            className="inline-flex text-sm font-semibold text-violet-400 transition hover:text-violet-300"
          >
            ← {t("backToPortfolio")}
          </Link>
        </div>

        <div className="max-w-4xl">
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

          {isPersonalDigitalProject && (
            <p className="mt-5 max-w-3xl rounded-2xl border border-violet-500/20 bg-violet-500/5 px-5 py-4 text-sm leading-6 text-zinc-400">
              {t("aiAssisted")}
            </p>
          )}

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

            {notebookUrl && (
              <a
                href={notebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-violet-500/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-200 transition hover:border-violet-400 hover:bg-violet-500/20"
              >
                {t("notebookLink")} ↗
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

        {isPersonalDigitalProject && (
          <section className="mt-16">
            <div className="mb-7">
              <h2 className="text-2xl font-bold">{t("screenshotsTitle")}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-zinc-500">
                {isLavenderFinds
                  ? "A visual look at the customer experience, business dashboard and responsive inventory workflow."
                  : t("screenshotsText")}
              </p>
            </div>

            {isLavenderFinds ? (
              <div className="space-y-8">
                <figure className="overflow-hidden rounded-3xl border border-violet-500/20 bg-zinc-950 shadow-2xl">
                  <Image
                    src={lavenderFindsGallery[0].src}
                    alt={lavenderFindsGallery[0].alt}
                    width={1600}
                    height={1000}
                    className="h-auto w-full"
                  />
                  <figcaption className="px-6 py-4 text-sm font-medium text-zinc-300">
                    {lavenderFindsGallery[0].caption}
                  </figcaption>
                </figure>

                <div className="grid gap-6 md:grid-cols-2">
                  {lavenderFindsGallery.slice(1, 3).map((image) => (
                    <figure
                      key={image.src}
                      className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={800}
                        className="h-auto w-full"
                      />
                      <figcaption className="px-5 py-4 text-sm font-medium text-zinc-300">
                        {image.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                <div className="grid items-start gap-6 md:grid-cols-2">
                  {lavenderFindsGallery.slice(3).map((image) => (
                    <figure
                      key={image.src}
                      className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 md:mx-auto md:max-w-sm"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={744}
                        height={1180}
                        className="h-auto w-full"
                      />
                      <figcaption className="px-5 py-4 text-sm font-medium text-zinc-300">
                        {image.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <figure className="overflow-hidden rounded-3xl border border-violet-500/20 bg-zinc-950 shadow-2xl">
                  <Image
                    src={professionalPlatformGallery[0].src}
                    alt={professionalPlatformGallery[0].alt}
                    width={1600}
                    height={1000}
                    className="h-auto w-full"
                  />
                  <figcaption className="px-6 py-4 text-sm font-medium text-zinc-300">
                    {t(`projects.portfolio.gallery.${professionalPlatformGallery[0].captionKey}`)}
                  </figcaption>
                </figure>

                <div className="grid gap-6 md:grid-cols-2">
                  {professionalPlatformGallery.slice(1, 4).map((image) => (
                    <figure
                      key={image.src}
                      className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={800}
                        className="h-auto w-full"
                      />
                      <figcaption className="px-5 py-4 text-sm font-medium text-zinc-300">
                        {t(`projects.portfolio.gallery.${image.captionKey}`)}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                <figure className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 md:mx-auto md:max-w-sm">
                  <Image
                    src={professionalPlatformGallery[4].src}
                    alt={professionalPlatformGallery[4].alt}
                    width={744}
                    height={1180}
                    className="h-auto w-full"
                  />
                  <figcaption className="px-5 py-4 text-sm font-medium text-zinc-300">
                    {t(`projects.portfolio.gallery.${professionalPlatformGallery[4].captionKey}`)}
                  </figcaption>
                </figure>
              </div>
            )}
          </section>
        )}

        {isJuniorDataAnalyst && (
          <section className="mt-16">
            <div className="mb-7">
              <h2 className="text-2xl font-bold">
                {t("projects.juniorDataAnalyst.visualisationsTitle")}
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-zinc-500">
                {t("projects.juniorDataAnalyst.visualisationsText")}
              </p>
            </div>

            <div className="space-y-8">
              {juniorDataAnalystGallery.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1600}
                    height={900}
                    className="h-auto w-full"
                  />
                  <figcaption className="px-6 py-4 text-sm font-medium text-zinc-300">
                    {t(`projects.juniorDataAnalyst.${image.captionKey}`)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {isDeveloperEmployment && (
          <section className="mt-16">
            <div className="mb-7">
              <h2 className="text-2xl font-bold">{t("screenshotsTitle")}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-zinc-500">
                {t("projects.developerEmployment.screenshotsText")}
              </p>
            </div>
            <div className="space-y-8">
              {developerEmploymentGallery.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1600}
                    height={1000}
                    className="h-auto w-full"
                  />
                  <figcaption className="px-6 py-4 text-sm font-medium text-zinc-300">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

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
