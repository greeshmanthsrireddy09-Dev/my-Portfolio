import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import PageWrapper from "../components/PageWrapper";
import ProjectCard from "../components/ProjectCard";
import { db } from "../firebase";
import { projects as fallbackProjects } from "../assets/data/projects";

const MotionSection = motion.section;
const MotionGrid = motion.div;

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.2, 0.65, 0.2, 1] },
  },
};

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

function normalizeTitle(value) {
  return String(value || "").trim().toLowerCase();
}

function sortByYearDesc(list) {
  return [...list].sort((a, b) => String(b.year || "").localeCompare(String(a.year || "")));
}

export default function Projects() {
  const [projects, setProjects] = useState(sortByYearDesc(fallbackProjects));

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const remote = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
        const seen = new Set(remote.map((item) => normalizeTitle(item.title)));
        const localMissing = fallbackProjects.filter(
          (item) => !seen.has(normalizeTitle(item.title))
        );

        setProjects(sortByYearDesc([...remote, ...localMissing]));
      },
      () => {
        setProjects(sortByYearDesc(fallbackProjects));
      }
    );

    return unsub;
  }, []);

  return (
    <PageWrapper>
      <MotionSection initial="hidden" animate="show" variants={headerVariants}>
        <p className="text-violet-400 text-xs tracking-[0.32em] uppercase mb-3">
          Featured Work
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Projects
        </h1>
        <p className="text-neutral-400 text-[15px] sm:text-[17px] leading-[1.7] max-w-2xl mb-10">
          Selected builds with clear business context, architecture focus, and
          measurable engineering outcomes.
        </p>
      </MotionSection>

      <MotionGrid
        initial="hidden"
        animate="show"
        variants={gridVariants}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id || project.title} project={project} />
        ))}
      </MotionGrid>
    </PageWrapper>
  );
}
