import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ProfileCard from "./components/ProfileCard.jsx";

import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Tools from "./pages/Tools.jsx";
import Experience from "./pages/Experience.jsx";
import Contact from "./pages/Contact.jsx";

/* ✅ Public-only layout */
function AppLayout() {
  return (
    <>
      <Navbar />

      <div className="bg-neutral-950 text-neutral-200 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 pt-28">
          <div className="grid gap-16 grid-cols-1 lg:grid-cols-[360px_1fr]">
            
            {/* LEFT COLUMN — PROFILE CARD */}
            <aside
              className="
                hidden lg:flex
                justify-end
                pl-[4in]
              "
            >
              <div className="sticky top-[180px]">
                <ProfileCard />
              </div>
            </aside>

            {/* RIGHT COLUMN — CONTENT */}
            <main className="w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>

          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return <AppLayout />;
}
