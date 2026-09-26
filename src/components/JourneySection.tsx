"use client";

import { useTranslations } from "next-intl";
import CareerCard from "./journey/CareerCard";
import { useCareerData } from "@/data/careerData";

const categoryInfo = {
  "Professional Experience - Kenya": {
    icon: "🇰🇪",
    title: "Professional Experience",
    subtitle:
      "My professional career began in Kenya, where I built strong foundations in customer service, business development and leadership.",
  },

  "Life Milestone": {
    icon: "❤️",
    title: "Life Milestones",
    subtitle:
      "Key personal moments that influenced my professional decisions and strengthened my resilience.",
  },

  "Business Leadership & Entrepreneurship": {
    icon: "🚀",
    title: "Business Leadership & Entrepreneurship",
    subtitle:
      "Building businesses taught me leadership, innovation, financial management and customer-focused thinking.",
  },

  "Training & Education": {
    icon: "🎓",
    title: "Training & Education",
    subtitle:
      "Continuous learning has always been one of the driving forces behind my personal and professional growth.",
  },

  "A New Beginning in France": {
    icon: "🇫🇷",
    title: "A New Beginning",
    subtitle:
      "Relocating to France marked the start of an entirely new chapter filled with challenges, growth and new opportunities.",
  },

  "Career Orientation & Professional Development": {
    icon: "🌱",
    title: "Career Orientation",
    subtitle:
      "Exploring the French labour market helped me discover my passion for technology and digital transformation.",
  },

  "Volunteer Experience": {
    icon: "🤝",
    title: "Volunteer Experience",
    subtitle:
      "Giving back to the community while helping others develop digital confidence.",
  },

  "Professional Experience - France": {
    icon: "💼",
    title: "Professional Experience",
    subtitle:
      "Each role strengthened my adaptability while building my understanding of the French workplace.",
  },

  "Entrepreneurial Project": {
    icon: "🌿",
    title: "Current Entrepreneurial Project",
    subtitle:
      "Continuing to build new opportunities through entrepreneurship, technology and digital innovation.",
  },
};

export default function JourneySection() {
  const t = useTranslations("journeySection");
  const careerData = useCareerData();

  // The career data contains the full, detailed cards. Keep those cards intact
  // and control only their presentation order here: newest to oldest.
  const chronologicalIds = [
    14, 17, 16, 13, 15, 18, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3.5, 3, 2.5, 2, 1,
  ];

  const orderedCareer = chronologicalIds
    .map((id) => careerData.find((item) => item.id === id))
    .filter((item): item is (typeof careerData)[number] => Boolean(item));

  return (
    <section
      id="journey"
      className="bg-black px-6 py-24 text-white md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Intro */}
        <div className="mb-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
            {t("label")}
          </p>

          <h2 className="mt-4 text-5xl font-extrabold tracking-tight md:text-6xl">
            {t("heading")}
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
            {t.rich("intro", {
              date: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>

        {/* Timeline Categories */}
        <div className="space-y-28">
          {orderedCareer.map((job) => {
            const info =
              categoryInfo[job.category as keyof typeof categoryInfo] ?? {
                icon: "📁",
                title: job.category,
                subtitle: "",
              };

            return (
              <section key={job.id} className="relative">
                {/* Category label */}
                <div className="mb-6">
                  <span className="text-4xl">{info.icon}</span>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                    {info.title}
                  </h2>
                  {info.subtitle && (
                    <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-400">
                      {info.subtitle}
                    </p>
                  )}
                  <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-purple-300" />
                </div>

                <CareerCard {...job} />
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}