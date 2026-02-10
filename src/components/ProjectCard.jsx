import { motion } from "framer-motion";

function ProjectCard({ project }) {
  // 🛡️ Absolute safety guard
  if (!project || typeof project !== "object") return null;

  const {
    title = "",
    description = "",
    github = "",
    live = "",
  } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        boxShadow:
          "0 16px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
      }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6"
    >
      {title && (
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-sm text-neutral-400 mt-2">
          {description}
        </p>
      )}

      {(github || live) && (
        <div className="flex gap-6 mt-6 text-sm">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition"
            >
              GitHub →
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white transition"
            >
              Live →
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default ProjectCard;
