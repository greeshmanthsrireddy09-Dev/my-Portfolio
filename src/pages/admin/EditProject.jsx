console.log("🔥 EDITPROJECT FILE LOADED");

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getAdminProjects,
  saveAdminProjects,
} from "../../utils/adminProjects";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isNew = id === "new";
  const projects = getAdminProjects();

  const project = !isNew
    ? projects.find((p) => p.id === Number(id))
    : null;

  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(
    project?.description || ""
  );
  const [github, setGithub] = useState(project?.github || "");
  const [live, setLive] = useState(project?.live || "");

const save = () => {
  if (!title.trim()) {
    alert("Project title is required");
    return;
  }

  const updated = [
    ...projects,
    {
      id: Date.now(),
      title,
      description,
      github,
      live,
    },
  ];

  saveAdminProjects(updated);
  navigate("/admin/projects");
};



  const remove = () => {
    if (!project) return;

    if (!window.confirm("Delete this project?")) return;

    const updated = projects.filter(
      (p) => p.id !== project.id
    );

    saveAdminProjects(updated);
    navigate("/admin/projects");
  };

  return (
    <section className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-6">
        {isNew ? "Add Project" : "Edit Project"}
      </h1>

      <div className="space-y-4">
        <input
          className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-lg"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-lg h-28"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-lg"
          placeholder="GitHub link"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <input
          className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-lg"
          placeholder="Live demo link"
          value={live}
          onChange={(e) => setLive(e.target.value)}
        />

        <div className="flex gap-4 mt-6">
          <button
            onClick={save}
            className="px-5 py-2 bg-violet-600 rounded-lg"
          >
            Save
          </button>

          {!isNew && (
            <button
              onClick={remove}
              className="px-5 py-2 bg-red-600 rounded-lg"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default EditProject;
