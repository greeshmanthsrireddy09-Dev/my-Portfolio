const KEY = "admin-projects";

export function getAdminProjects() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveAdminProjects(projects) {
  localStorage.setItem(KEY, JSON.stringify(projects));
}
