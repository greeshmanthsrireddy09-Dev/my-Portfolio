import PageWrapper from "../components/PageWrapper";
import ProjectCard from "../components/ProjectCard";
import { getAdminProjects } from "../utils/adminProjects";

function Projects() {
  const projects = getAdminProjects();

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-white mb-10">
        Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </PageWrapper>
  );
}

export default Projects;
