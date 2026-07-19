import CareerCard from "./CareerCard";
import { careerData } from "@/data/careerData";

export default function PhotoStudio() {
  const job = careerData[0];

  return (
    <CareerCard
      year={job.year}
      title={job.title}
      company={job.company}
      location={job.location}
      summary={job.summary}
      responsibilities={job.responsibilities}
      skills={job.skills}
      achievement={job.achievement}
      impact={job.impact}
    />
  );
}