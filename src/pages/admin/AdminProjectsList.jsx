import { useNavigate } from "react-router-dom";
import { getAdminProjects } from "../../utils/adminProjects";

function AdminProjectsList() {
  const navigate = useNavigate();
  const projects = getAdminProjects();

  return (
    <section className="max-w-4xl">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">
          Manage Projects
        </h1>

        <button
          onClick={() => navigate("/admin/projects/edit/new")}
          className="px-4 py-2 bg-violet-600 rounded-lg hover:bg-violet-500"
        >
          + Add Project
        </button>
      </header>

      {projects.length === 0 && (
        <p className="text-neutral-500">
          No projects added yet.
        </p>
      )}

      <div className="space-y-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex justify-between"
          >
            <div>
              <h3 className="text-white font-medium">{p.title}</h3>
              <p className="text-neutral-400 text-sm">
                {p.description}
              </p>
            </div>

            <button
              onClick={() =>
                navigate(`/admin/projects/edit/${p.id}`)
              }
              className="text-violet-400 hover:text-violet-300"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminProjectsList;
