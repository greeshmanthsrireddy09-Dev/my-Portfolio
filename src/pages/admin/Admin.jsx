import { Routes, Route } from "react-router-dom";
import AdminProjectsList from "./AdminProjectsList";
import EditProject from "./EditProject";

function Admin() {
  return (
    <Routes>
      <Route path="/" element={<AdminProjectsList />} />
      <Route path="projects" element={<AdminProjectsList />} />
      <Route path="projects/edit/:id" element={<EditProject />} />
    </Routes>
  );
}

export default Admin;
