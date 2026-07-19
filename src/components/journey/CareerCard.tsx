type CareerCardProps = {
  year: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  achievement: string;
  impact: string;
  reflection?: string;
};

export default function CareerCard({
  year,
  title,
  company,
  location,
  summary,
  responsibilities,
  skills,
  achievement,
  impact,
  reflection,
}: CareerCardProps) {
  return (
    <div className="rounded-3xl border border-violet-500/20 bg-zinc-900 p-10 shadow-lg transition-all duration-300 hover:border-violet-400 hover:shadow-violet-500/10">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-lg font-bold text-violet-400">
            {year}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-2 text-gray-400">
            {company} • {location}
          </p>
        </div>

      </div>

      {/* Summary */}
      <p className="mt-8 leading-8 text-gray-300">
        {summary}
      </p>

      {/* Responsibilities */}
      <div className="mt-10">

        <h4 className="mb-4 text-xl font-semibold text-violet-300">
          Key Responsibilities
        </h4>

        <ul className="space-y-3 text-gray-300">
          {responsibilities.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>

      </div>

      {/* Skills */}
      <div className="mt-10">

        <h4 className="mb-4 text-xl font-semibold text-violet-300">
          Skills Developed
        </h4>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-full bg-violet-600/20 px-4 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-600/30"
            >
              {skill}
            </span>
          ))}
        </div>

      </div>

      {/* Achievement */}
      <div className="mt-10 rounded-2xl border border-violet-500/20 bg-black/30 p-6">

        <h4 className="text-xl font-semibold text-violet-300">
          Achievement
        </h4>

        <p className="mt-4 leading-8 text-gray-300">
          {achievement}
        </p>

      </div>

      {/* Career Impact */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6">

        <h4 className="text-xl font-semibold text-violet-300">
          Career Impact
        </h4>

        <p className="mt-4 leading-8 text-gray-300">
          {impact}
        </p>

      </div>

      {/* What I Learned */}
      {reflection && (
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-zinc-900 to-black p-8 shadow-lg">

          <div className="absolute right-6 top-2 text-8xl font-serif text-violet-500/10">
            "
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.35em] text-violet-400">
            What I Learned
          </p>

          <blockquote className="mt-5 max-w-3xl text-2xl italic leading-10 text-white">
            {reflection}
          </blockquote>

        </div>
      )}

    </div>
  );
}