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

  const groupedCareer = careerData.reduce((acc, item) => {
    const key = item.category;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);

    return acc;
  }, {} as Record<string, typeof careerData>);

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
          {Object.entries(groupedCareer).map(([category, jobs]) => {
            const info =
              categoryInfo[category as keyof typeof categoryInfo] ?? {
                icon: "📁",
                title: category,
                subtitle: "",
              };

            return (
              <section key={category} className="relative">
                {/* Category Heading */}
                <div className="mb-14">
                  <span className="text-5xl">{info.icon}</span>

                  <h2 className="mt-5 text-5xl font-extrabold tracking-tight">
                    {info.title}
                  </h2>

                  <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
                    {info.subtitle}
                  </p>

                  <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-purple-300" />
                </div>

                {/* Career Cards */}
                <div className="space-y-12">
                  {jobs.map((job) => (
                    <CareerCard key={job.id} {...job} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}