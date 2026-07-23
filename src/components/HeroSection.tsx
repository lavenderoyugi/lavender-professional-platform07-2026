import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");

  const skills = [
    t("skills.businessOperations"),
    t("skills.entrepreneurship"),
    t("skills.dataAnalytics"),
    t("skills.processImprovement"),
    t("skills.powerBI"),
    t("skills.sql"),
    t("skills.python"),
    t("skills.projectManagement"),
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-violet-700/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 md:grid-cols-2 lg:px-10">

        {/* LEFT SIDE */}
        <div>

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.45em] text-violet-400">
            {t("welcome")}
          </p>

          <h1 className="mb-6 text-5xl font-black leading-none lg:text-7xl">
            <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-violet-600 bg-clip-text text-transparent">
              {t("firstName")}
            </span>

            <br />

            <span className="text-white">
              {t("lastName")}
            </span>
          </h1>

          <h2 className="mb-8 max-w-xl text-xl font-medium leading-relaxed text-gray-300">
            {t("title1")}
          </h2>

          <p className="mb-10 max-w-xl leading-8 text-gray-400">
            {t("intro")}
            <br />
            <br />
            {t("paragraph1")}
            <br />
            <br />
            {t("paragraph2")}
          </p>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4">

            <a
              href="/cv.pdf"
              className="rounded-full bg-violet-500 px-8 py-4 font-semibold text-white transition hover:bg-violet-600"
            >
              {t("downloadCV")}
            </a>

            <a
              href="#portfolio"
              className="rounded-full border border-violet-400 px-8 py-4 font-semibold text-violet-300 transition hover:bg-violet-500 hover:text-white"
            >
              {t("portfolioButton")}
            </a>

          </div>

          {/* Skills */}

          <div className="mt-12 flex flex-wrap gap-3">

            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm text-violet-200"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex justify-center">

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