import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

const MotionSection = motion.section;
const MotionArticle = motion.article;

const educationItems = [
  {
    institution: "Western Michigan University",
    degree: "Master of Science in Data Science",
    period: "2023 - 2025",
    location: "Kalamazoo, MI, USA",
    details:
      "Focused on data science foundations, analytics, and applied machine learning for real-world decision making.",
    highlights: [
      "Coursework in statistics, machine learning, and data systems",
      "Built projects involving data pipelines and predictive modeling",
      "Collaborated on team-based analytical problem solving",
    ],
    symbol: "WMU",
    symbolImage:
      "https://wmich.edu/sites/default/files/attachments/u171/2020/WMU%20web-digital.png",
    accent: "from-cyan-500/35 via-blue-500/20 to-transparent",
  },
  {
    institution: "Amrita Vishwa Vidyapeetham, Bengaluru",
    degree: "Bachelor of Technology in Mechanical Engineering",
    period: "2017 - 2021",
    location: "Bengaluru, India",
    details:
      "Built strong fundamentals in mechanical engineering, analysis, and practical design-oriented problem solving.",
    highlights: [
      "Core coursework in thermodynamics, mechanics, and manufacturing",
      "Hands-on labs and applied engineering projects",
      "Active participation in technical events and workshops",
    ],
    symbol: "AVV",
    symbolImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Amrita-vishwa-vidyapeetham-logo.svg/330px-Amrita-vishwa-vidyapeetham-logo.svg.png",
    accent: "from-violet-500/35 via-fuchsia-500/20 to-transparent",
  },
];

function Education() {
  return (
    <PageWrapper>
      <MotionSection
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <p className="text-violet-400 text-xs tracking-[0.28em] uppercase mb-3">
          Academic Journey
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Education
        </h1>
        <p className="text-neutral-400 text-[15px] sm:text-[17px] leading-[1.7] max-w-2xl mb-8">
          The academic path that shaped my data science and engineering foundation.
        </p>
      </MotionSection>

      <div className="space-y-5">
        {educationItems.map((item, index) => (
          <MotionArticle
            key={item.institution}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.42, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/70 p-5 sm:p-6"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.accent}`}
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="inline-flex items-center gap-2">
                    <UniversitySymbol abbr={item.symbol} image={item.symbolImage} />
                  </p>
                  <h2 className="text-white text-xl font-semibold mt-2">{item.degree}</h2>
                </div>

                <div className="space-y-1 text-sm text-neutral-300 text-right ml-auto">
                  <p className="inline-flex items-center gap-1.5 justify-end w-full">
                    <CalendarDays size={14} className="text-violet-300" />
                    {item.period}
                  </p>
                  <p className="inline-flex items-center gap-1.5 justify-end w-full">
                    <MapPin size={14} className="text-cyan-300" />
                    {item.location}
                  </p>
                </div>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mt-4">
                {item.details}
              </p>

              <ul className="mt-4 space-y-2">
                {item.highlights.map((point) => (
                  <li key={point} className="text-sm text-neutral-200 flex items-start gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MotionArticle>
        ))}
      </div>
    </PageWrapper>
  );
}

function UniversitySymbol({ abbr, image }) {
  if (image) {
    return (
      <span className="inline-flex items-center justify-center h-10 w-24 rounded-md overflow-hidden border border-violet-400/40 bg-white/95 px-1">
        <img src={image} alt={`${abbr} logo`} className="h-8 w-full object-contain" />
      </span>
    );
  }

  return (
    <span className="inline-flex items-center justify-center h-6 min-w-6 px-1.5 rounded-md border border-violet-400/40 bg-violet-500/15 text-[10px] font-bold text-violet-200">
      {abbr}
    </span>
  );
}

export default Education;
