import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";

const MotionCard = motion.article;
const MotionLi = motion.li;

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.2, 0.65, 0.2, 1] },
  },
};

function ProjectCard({ project }) {
  if (!project || typeof project !== "object") return null;

  const {
    title = "",
    description = "",
    tech = [],
    github = "",
    demo = "",
    year = "",
    impact = "",
    status = "",
    gradient = "from-violet-500/40 via-fuchsia-500/25 to-transparent",
  } = project;

  return (
    <MotionCard
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/70 p-5 sm:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.01),0_18px_50px_-28px_rgba(0,0,0,0.9)]"
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient}`}
      />

      <div className="relative z-10">
        <div className="mb-4 rounded-xl border border-neutral-800/90 bg-neutral-950/80 p-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <p className="inline-flex items-center gap-2 text-xs tracking-wide uppercase text-violet-300">
              <Sparkles size={14} />
              {status || "Featured"}
            </p>
            {year && (
              <p className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
                <Calendar size={13} />
                {year}
              </p>
            )}
          </div>

          <h3 className="text-xl font-semibold text-white leading-tight">{title}</h3>
          {impact && <p className="text-sm text-cyan-300 mt-1.5">{impact}</p>}
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed">{description}</p>

        {tech.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {tech.map((item, index) => (
              <MotionLi
                key={item}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.04, duration: 0.24 }}
                className="list-none text-xs sm:text-sm text-neutral-200 px-3 py-1.5 rounded-full border border-neutral-700/80 bg-neutral-950/80 group-hover:border-white/20 transition"
              >
                {item}
              </MotionLi>
            ))}
          </ul>
        )}

        {(github || demo) && (
          <div className="mt-6 flex items-center gap-5 text-sm">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-violet-300 hover:text-violet-200 transition"
              >
                Source <ArrowUpRight size={14} />
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-white transition"
              >
                Live Demo <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </MotionCard>
  );
}

export default ProjectCard;
