import { useTranslations } from "next-intl";
import CareerCard from "./journey/CareerCard";
import { useCareerData } from "@/data/careerData";


export default function JourneySection() {
  const t = useTranslations("journeySection");
  const careerData = useCareerData();

  return (
    <section
      id="journey"
      className="bg-black px-6 py-24 text-white md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            {t("label")}
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            {t("heading")}
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            {t.rich("intro", {
              date: () => <strong>{t("relocationDate")}</strong>,
            })}
          </p>
        </div>

        <div className="space-y-12">
          {careerData.map((job) => (
            <CareerCard
              key={job.id}
              year={job.year}
              title={job.title}
              company={job.company}
              location={job.location}
              summary={job.summary}
              responsibilities={job.responsibilities}
              skills={job.skills}
              achievement={job.achievement}
              impact={job.impact}
              reflection={job.reflection}
            />
          ))}
        </div>
      </div>
    </section>
  );
}