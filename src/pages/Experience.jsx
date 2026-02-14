import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Calendar, MapPin, Sparkles } from "lucide-react";

const experiences = [
  {
    company: "TCS",
    role: "Software Engineer",
    period: "2021 - 2024",
    location: "India",
    summary:
      "Built and maintained backend services, improved API performance, and delivered production-ready modules for enterprise clients.",
    highlights: [
      "Designed scalable REST services for internal and client-facing products.",
      "Reduced API response times by optimizing query and cache strategy.",
      "Collaborated across QA, product, and DevOps to ship reliable releases.",
    ],
    accent: "from-violet-500/40 via-fuchsia-500/25 to-transparent",
  },
  {
    company: "Optum",
    role: "Backend Engineer",
    period: "2024 - Present",
    location: "United States",
    summary:
      "Focused on resilient healthcare backend systems, observability improvements, and secure API development for high-impact workflows.",
    highlights: [
      "Implemented robust services with strong validation and error handling.",
      "Improved deployment confidence through monitoring and alert-driven tuning.",
      "Contributed to secure architecture decisions and cross-team design reviews.",
    ],
    accent: "from-cyan-500/40 via-sky-500/25 to-transparent",
  },
];

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionLi = motion.li;

const introVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.2, 0.65, 0.2, 1] },
  },
};

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.2, 0.65, 0.2, 1] },
  },
};

function Experience() {
  return (
    <PageWrapper>
      <MotionSection initial="hidden" animate="show" variants={introVariants}>
        <p className="text-violet-400 text-xs tracking-[0.32em] uppercase mb-3">
          Career Journey
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Experience
        </h1>
        <p className="text-neutral-400 text-[15px] sm:text-[17px] leading-[1.7] max-w-2xl mb-10">
          A focused path through enterprise engineering, from scalable delivery
          at TCS to backend platform impact at Optum.
        </p>
      </MotionSection>

      <MotionDiv
        initial="hidden"
        animate="show"
        variants={listVariants}
        className="relative space-y-6"
      >
        <div className="pointer-events-none absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-violet-500/60 via-cyan-500/35 to-transparent" />

        {experiences.map((experience) => (
          <MotionArticle
            key={experience.company}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group relative ml-12 rounded-2xl border border-neutral-800/80 bg-neutral-900/70 backdrop-blur-sm p-5 sm:p-6 overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.01),0_18px_50px_-28px_rgba(0,0,0,0.9)]"
          >
            <div className="absolute -left-[2.55rem] top-6 h-5 w-5 rounded-full border-2 border-neutral-950 bg-violet-500 shadow-[0_0_0_5px_rgba(139,92,246,0.2)]" />

            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${experience.accent}`}
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs tracking-wide uppercase text-violet-300 mb-2">
                    <Sparkles size={14} />
                    Featured Role
                  </div>
                  <h2 className="text-2xl font-semibold text-white leading-tight">
                    {experience.company}
                  </h2>
                  <p className="text-neutral-300 mt-1">{experience.role}</p>
                </div>

                <div className="text-sm text-neutral-300 space-y-1">
                  <p className="flex items-center gap-2">
                    <Calendar size={15} className="text-violet-300" />
                    {experience.period}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={15} className="text-cyan-300" />
                    {experience.location}
                  </p>
                </div>
              </div>

              <p className="text-neutral-300 leading-relaxed mb-5">
                {experience.summary}
              </p>

              <ul className="space-y-2.5">
                {experience.highlights.map((item, index) => (
                  <MotionLi
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + index * 0.08, duration: 0.3 }}
                    className="flex items-start gap-3 text-sm text-neutral-200"
                  >
                    <BriefcaseBusiness
                      size={15}
                      className="text-violet-300 mt-0.5 shrink-0"
                    />
                    <span>{item}</span>
                  </MotionLi>
                ))}
              </ul>
            </div>
          </MotionArticle>
        ))}
      </MotionDiv>
    </PageWrapper>
  );
}

export default Experience;
