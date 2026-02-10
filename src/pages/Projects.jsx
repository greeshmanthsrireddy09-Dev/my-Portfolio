import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section className="space-y-10">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </section>
  );
}
