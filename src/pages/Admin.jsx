import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import {
  Inbox,
  Loader2,
  LogIn,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { ADMIN_EMAIL, db } from "../firebase";
import { useAuth } from "../context/useAuth";
import { projects as fallbackProjects } from "../assets/data/projects";

const initialForm = {
  title: "",
  description: "",
  tech: "",
  github: "",
  demo: "",
  year: "",
  status: "",
  impact: "",
  gradient: "from-violet-500/40 via-fuchsia-500/25 to-transparent",
};

const FORMSPREE_ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT || "").trim();
const CONTACT_RECEIVER_EMAIL =
  (import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || ADMIN_EMAIL || "").trim();

function normalizeTitle(value) {
  return String(value || "").trim().toLowerCase();
}

function toProjectId(title) {
  return normalizeTitle(title)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sortByYearDesc(list) {
  return [...list].sort((a, b) => String(b.year || "").localeCompare(String(a.year || "")));
}

function Admin() {
  const { user, loading, isAdmin, login, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("projects");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submittingAuth, setSubmittingAuth] = useState(false);

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!isAdmin) return undefined;

    const unsubProjects = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const list = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
        setProjects(sortByYearDesc(list));
        setLoadError("");
      },
      (err) => {
        setLoadError(err.message || "Failed to load projects.");
      }
    );

    return () => {
      unsubProjects();
    };
  }, [isAdmin]);

  const formTitle = useMemo(
    () => (editingId ? "Edit Project" : "Add New Project"),
    [editingId]
  );

  const handleAuth = async (event) => {
    event.preventDefault();
    setSubmittingAuth(true);
    setAuthError("");

    try {
      await login(email, password);
      setPassword("");
    } catch (error) {
      setAuthError(error.message || "Login failed");
    } finally {
      setSubmittingAuth(false);
    }
  };

  const handleField = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId("");
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) return;

    setSaving(true);

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      tech: formData.tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      github: formData.github.trim(),
      demo: formData.demo.trim(),
      year: formData.year.trim(),
      status: formData.status.trim(),
      impact: formData.impact.trim(),
      gradient:
        formData.gradient.trim() ||
        "from-violet-500/40 via-fuchsia-500/25 to-transparent",
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), payload);
      } else {
        await addDoc(collection(db, "projects"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  const seedFallbackProjects = async () => {
    setSeeding(true);
    setSeedMessage("");

    try {
      const batch = writeBatch(db);
      let queued = 0;

      for (const item of fallbackProjects) {
        const id = toProjectId(item.title);
        if (!id) continue;

        batch.set(
          doc(db, "projects", id),
          {
            ...item,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );

        queued += 1;
      }

      if (queued === 0) {
        setSeedMessage("No valid local projects to import.");
      } else {
        await batch.commit();
        setSeedMessage(`Imported or updated ${queued} project(s) successfully.`);
      }
    } catch (error) {
      setSeedMessage(error.message || "Import failed. Check Firestore rules.");
    } finally {
      setSeeding(false);
    }
  };

  const handleEdit = (project) => {
    setActiveTab("projects");
    setEditingId(project.id);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      tech: (project.tech || []).join(", "),
      github: project.github || "",
      demo: project.demo || "",
      year: project.year || "",
      status: project.status || "",
      impact: project.impact || "",
      gradient:
        project.gradient || "from-violet-500/40 via-fuchsia-500/25 to-transparent",
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    if (editingId === id) resetForm();
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="text-neutral-300 inline-flex items-center gap-2">
          <Loader2 className="animate-spin" size={16} /> Loading...
        </div>
      </PageWrapper>
    );
  }

  if (!user) {
    return (
      <PageWrapper>
        <section className="max-w-md mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6">
          <h1 className="font-display text-3xl text-white mb-2">Admin Login</h1>
          <p className="text-neutral-400 mb-5 text-sm">
            Access project and messaging dashboard.
          </p>

          <form onSubmit={handleAuth} className="space-y-3">
            <Input label="Email" value={email} onChange={setEmail} type="email" />
            <Input
              label="Password"
              value={password}
              onChange={setPassword}
              type="password"
            />

            {authError && <p className="text-xs text-rose-400">{authError}</p>}

            <button
              type="submit"
              disabled={submittingAuth}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white px-5 py-2.5 font-medium transition"
            >
              <LogIn size={16} />
              {submittingAuth ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </section>
      </PageWrapper>
    );
  }

  if (!isAdmin) {
    return (
      <PageWrapper>
        <section className="max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6">
          <h1 className="font-display text-3xl text-white mb-2">Access Denied</h1>
          <p className="text-neutral-400 mb-5 text-sm">
            This account is signed in but not allowed to access the admin panel.
          </p>
          <div className="mb-5 rounded-xl border border-neutral-800 bg-neutral-950/70 p-3 text-xs text-neutral-300 space-y-1">
            <p>
              Signed in email: <span className="text-white">{user?.email || "N/A"}</span>
            </p>
            <p>
              Expected admin email: <span className="text-white">{ADMIN_EMAIL || "Not set"}</span>
            </p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 hover:border-neutral-500 text-neutral-100 px-4 py-2.5 transition"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-violet-400 text-xs tracking-[0.28em] uppercase mb-2">
              Admin Panel
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Dashboard
            </h1>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 hover:border-neutral-500 text-neutral-100 px-4 py-2.5 transition"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("projects")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition ${
              activeTab === "projects"
                ? "bg-violet-600 text-white"
                : "border border-neutral-700 text-neutral-200 hover:border-neutral-500"
            }`}
          >
            <Plus size={15} /> Projects
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition ${
              activeTab === "messages"
                ? "bg-violet-600 text-white"
                : "border border-neutral-700 text-neutral-200 hover:border-neutral-500"
            }`}
          >
            <Inbox size={15} /> Messages
          </button>
        </div>

        {activeTab === "projects" && (
          <>
            <form
              onSubmit={handleSave}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-6 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-white text-xl font-semibold">{formTitle}</h2>
                <button
                  type="button"
                  onClick={seedFallbackProjects}
                  disabled={seeding}
                  className="rounded-xl border border-neutral-700 hover:border-neutral-500 disabled:opacity-60 text-neutral-100 px-3 py-2 text-sm transition"
                >
                  {seeding ? "Importing..." : "Import Existing Projects"}
                </button>
              </div>

              {seedMessage && <p className="text-sm text-neutral-300">{seedMessage}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title" name="title" value={formData.title} onChange={handleField} />
                <Field label="Year" name="year" value={formData.year} onChange={handleField} />
              </div>

              <Field
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleField}
              />
              <Field label="Tech (comma separated)" name="tech" value={formData.tech} onChange={handleField} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="GitHub URL" name="github" value={formData.github} onChange={handleField} />
                <Field label="Demo URL" name="demo" value={formData.demo} onChange={handleField} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Status" name="status" value={formData.status} onChange={handleField} />
                <Field label="Impact" name="impact" value={formData.impact} onChange={handleField} />
              </div>

              <Field
                label="Gradient"
                name="gradient"
                value={formData.gradient}
                onChange={handleField}
              />

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white px-5 py-2.5 font-medium transition"
                >
                  <Plus size={16} /> {saving ? "Saving..." : editingId ? "Update" : "Create"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-neutral-700 hover:border-neutral-500 text-neutral-100 px-4 py-2.5 transition"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>

            <section className="space-y-3">
              {loadError && <p className="text-rose-400 text-sm">{loadError}</p>}

              {projects.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/65 p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                      <p className="text-neutral-400 text-sm mt-1">{item.description}</p>
                      <p className="text-neutral-500 text-xs mt-2">
                        {(item.tech || []).join(" | ")}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 hover:border-neutral-500 text-neutral-100 px-3 py-1.5 text-sm transition"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-rose-700/60 hover:border-rose-500 text-rose-300 px-3 py-1.5 text-sm transition"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {projects.length === 0 && !loadError && (
                <p className="text-neutral-400 text-sm">No projects in Firestore yet.</p>
              )}
            </section>
          </>
        )}

        {activeTab === "messages" && (
          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-6 space-y-4">
            <h2 className="text-white text-xl font-semibold">Messaging Setup</h2>
            <p className="text-sm text-neutral-400">
              Messaging now uses an external provider, not Firebase. Configure these env vars:
              <code className="text-neutral-200"> VITE_FORMSPREE_ENDPOINT </code>
              and optionally
              <code className="text-neutral-200"> VITE_CONTACT_RECEIVER_EMAIL</code>.
            </p>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 text-sm text-neutral-300 space-y-1">
              <p>
                Endpoint: <span className="text-white">{FORMSPREE_ENDPOINT || "Not configured"}</span>
              </p>
              <p>
                Receiver email: <span className="text-white">{CONTACT_RECEIVER_EMAIL || "Not configured"}</span>
              </p>
            </div>

            {CONTACT_RECEIVER_EMAIL && (
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://mail.google.com/mail/u/0/#search/${encodeURIComponent(CONTACT_RECEIVER_EMAIL)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-600/60 hover:border-cyan-400 text-cyan-300 px-4 py-2 text-sm transition"
                >
                  <Mail size={14} /> Open Gmail Inbox
                </a>
                <a
                  href={`mailto:${CONTACT_RECEIVER_EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 hover:border-neutral-500 text-neutral-100 px-4 py-2 text-sm transition"
                >
                  <Mail size={14} /> Open Mail App
                </a>
              </div>
            )}
          </section>
        )}
      </section>
    </PageWrapper>
  );
}

function Field({ label, name, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-neutral-200 mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-neutral-700 bg-neutral-950/70 text-neutral-100 px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
      />
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-neutral-200 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-neutral-700 bg-neutral-950/70 text-neutral-100 px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
      />
    </div>
  );
}

export default Admin;
