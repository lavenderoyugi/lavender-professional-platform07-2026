import Image from "next/image";
import {useTranslations} from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-16 sm:px-8 sm:py-20 lg:gap-20 lg:px-8 lg:py-24 md:grid-cols-2">

      {/* Left */}

      <div>

        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.45em] text-violet-400">
          {t("welcome")}
        </p>

        <h1 className="mb-8 text-5xl font-black leading-none sm:text-6xl lg:text-8xl">

          <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-violet-600 bg-clip-text text-transparent">
  {t("firstName")}
</span>

          <br />

          <span className="text-white">
  {t("lastName")}
</span>

        </h1>

        <h2 className="mb-8 text-lg font-medium leading-relaxed text-gray-300 sm:text-xl lg:text-2xl">
  {t("title1")}
</h2>

        <p className="mb-12 max-w-xl text-base leading-8 text-gray-400 sm:text-lg sm:leading-9">
  {t("intro")}

  <br />
  <br />

  {t("paragraph1")}

  <br />
  <br />

  {t("paragraph2")}
</p>

        {/* Buttons */}

        <div className="flex flex-wrap items-center gap-3 sm:gap-5">

          <button className="rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-5 py-3 text-sm font-medium transition duration-300 hover:scale-105 sm:px-8 sm:py-4 sm:text-base">
            {t("downloadCV")}
          </button>

          <button className="rounded-xl border border-violet-500 px-5 py-3 text-sm transition duration-300 hover:bg-violet-900/20 sm:px-8 sm:py-4 sm:text-base">
            {t("journeyButton")}
          </button>

          <button className="rounded-xl border border-violet-500 px-5 py-3 text-sm transition duration-300 hover:bg-violet-900/20 sm:px-8 sm:py-4 sm:text-base">
            {t("portfolioButton")}
          </button>

        </div>

        {/* Statistics */}

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">

          <div>
            <h3 className="text-2xl font-bold text-violet-400 sm:text-3xl">
              5+
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              {t("experience")}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-violet-400 sm:text-3xl">
              2
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              {t("countries")}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-violet-400 sm:text-3xl">
              10+
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              {t("projects")}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-violet-400 sm:text-3xl">
              ∞
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              {t("learning")}
            </p>
          </div>

        </div>
      </div>

      {/* Right */}

      <div className="flex justify-center">

        <div className="relative w-full max-w-[520px]">

          <div className="absolute -inset-6 rounded-[40px] bg-violet-600/20 blur-3xl"></div>

          <Image
            src="/images/lavender-oyugi.png"
            alt="Lavender Oyugi"
            width={520}
            height={680}
            priority
            className="relative h-auto w-full rounded-[32px] border border-violet-500/30 object-cover shadow-[0_0_90px_rgba(139,92,246,0.45)] transition duration-500 hover:scale-[1.02]"
          />

        </div>

      </div>

    </section>
  );
}