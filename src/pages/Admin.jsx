import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-4xl">

      {/* HEADER */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">
          Admin Dashboard
        </h1>
        <p className="text-neutral-400 max-w-2xl">
          Manage projects, content, and site settings.
        </p>
      </header>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* PROJECTS */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            Projects
          </h2>
          <p className="text-sm text-neutral-400 mb-4">
            Add, edit, or remove portfolio projects.
          </p>

          <button
            onClick={() => navigate("/admin/projects")}
            className="inline-flex items-center px-4 py-2 rounded-lg
            bg-violet-600 hover:bg-violet-500 transition
            text-sm font-medium text-white"
          >
            Manage Projects
          </button>
        </div>

        {/* SITE SETTINGS */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            Site Settings
          </h2>
          <p className="text-sm text-neutral-400 mb-4">
            Update profile info, role, and links.
          </p>
          <button
            disabled
            className="inline-flex items-center px-4 py-2 rounded-lg
            bg-neutral-800 text-neutral-400 cursor-not-allowed
            text-sm font-medium"
          >
            Coming Soon
          </button>
        </div>

      </div>
    </section>
  );
}

export default Admin;
