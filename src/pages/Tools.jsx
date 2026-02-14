import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import {
  Server,
  Database,
  Cloud,
  Wrench,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const toolGroups = [
  {
    title: "Backend Core",
    subtitle: "Reliable service architecture",
    icon: Server,
    accent: "from-violet-500/35 to-fuchsia-500/20",
    tools: ["Node.js", "Express", "Java", "Spring Boot", "REST APIs"],
  },
  {
    title: "Data Layer",
    subtitle: "Modeling, querying, optimization",
    icon: Database,
    accent: "from-cyan-500/35 to-blue-500/20",
    tools: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma"],
  },
  {
    title: "Cloud & DevOps",
    subtitle: "Scale, deploy, observe",
    icon: Cloud,
    accent: "from-emerald-500/35 to-teal-500/20",
    tools: ["Docker", "AWS", "Nginx", "GitHub Actions", "Vercel"],
  },
  {
    title: "Developer Toolkit",
    subtitle: "Shipping fast with quality",
    icon: Wrench,
    accent: "from-amber-500/35 to-orange-500/20",
    tools: ["Git", "Postman", "ESLint", "Jest", "Linux CLI"],
  },
  {
    title: "Security & Quality",
    subtitle: "Hardening and confidence",
    icon: ShieldCheck,
    accent: "from-indigo-500/35 to-violet-500/20",
    tools: ["JWT", "OAuth", "Rate Limiting", "Validation", "OWASP"],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.2, 0.65, 0.2, 1] },
  },
};

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
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

const MotionSection = motion.section;
const MotionGrid = motion.div;
const MotionCard = motion.article;
const MotionChip = motion.span;
const MotionIcon = motion.div;

function Tools() {
  return (
    <PageWrapper>
      <MotionSection
        variants={sectionVariants}
        initial="hidden"
        animate="show"
        className="relative"
      >
        <div className="pointer-events-none absolute -top-16 left-0 h-44 w-44 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-20 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl" />
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Tools I Build With
        </h1>
        <p className="text-neutral-400 text-[15px] sm:text-[17px] leading-[1.7] max-w-2xl mb-10">
          A curated toolkit focused on scalable backend systems, resilient
          deployments, and smooth product delivery.
        </p>

        <MotionGrid
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {toolGroups.map((group) => {
            const Icon = group.icon;

            return (
              <MotionCard
                key={group.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/75 backdrop-blur-sm p-5 sm:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.01),0_18px_50px_-28px_rgba(0,0,0,0.9)]"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${group.accent}`}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <MotionIcon
                        whileHover={{ rotate: 10, scale: 1.08 }}
                        transition={{ duration: 0.2 }}
                        className="h-11 w-11 rounded-xl border border-white/10 bg-black/25 flex items-center justify-center"
                      >
                        <Icon size={20} className="text-white" />
                      </MotionIcon>

                      <div>
                        <h2 className="text-white text-lg font-semibold leading-tight">
                          {group.title}
                        </h2>
                        <p className="text-neutral-400 text-sm mt-0.5">
                          {group.subtitle}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {group.tools.map((tool, index) => (
                      <MotionChip
                        key={tool}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index, duration: 0.25 }}
                        className="text-xs sm:text-sm text-neutral-200 px-3 py-1.5 rounded-full border border-neutral-700/80 bg-neutral-950/70 group-hover:border-white/20 transition"
                      >
                        {tool}
                      </MotionChip>
                    ))}
                  </div>
                </div>
              </MotionCard>
            );
          })}
        </MotionGrid>
      </MotionSection>
    </PageWrapper>
  );
}

export default Tools;

