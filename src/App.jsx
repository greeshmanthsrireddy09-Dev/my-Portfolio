import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ProfileCard from "./components/ProfileCard.jsx";

import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Tools from "./pages/Tools.jsx";
import Experience from "./pages/Experience.jsx";
import Education from "./pages/Education.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";
import { ADMIN_PATH } from "./firebase";

function AppLayout() {
  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-neutral-950/80 text-neutral-200">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(139,92,246,0.12),transparent_35%),radial-gradient(circle_at_95%_20%,rgba(6,182,212,0.1),transparent_30%)]" />

        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] 2xl:grid-cols-[380px_minmax(0,1fr)] gap-8 lg:gap-12 2xl:gap-16">
            <aside className="flex justify-center lg:justify-start lg:order-none order-1">
              <div className="w-full max-w-[380px] lg:sticky lg:top-32">
                <ProfileCard />
              </div>
            </aside>

            <main className="w-full min-w-0 order-2 lg:order-none">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/education" element={<Education />} />
                <Route path="/contact" element={<Contact />} />
                <Route path={ADMIN_PATH} element={<Admin />} />
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
