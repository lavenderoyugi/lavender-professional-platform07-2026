import CareerCard from "./journey/CareerCard";
import { careerData } from "@/data/careerData";

export default function JourneySection() {
  return (
    <section
      id="journey"
      className="bg-black px-6 py-24 text-white md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Professional Journey
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            From Curiosity to Leadership
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Every chapter of my career has contributed to who I am today.
            Beginning with customer service and business operations in Kenya,
            progressing into regional business development, entrepreneurship,
            relocating to France on <strong>27 September 2022</strong>, and
            continuing into data analytics and business operations—each
            experience has strengthened my ability to solve problems, lead
            teams, and create value through technology and business.
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