import { useEffect, useState } from "react";
import { Briefcase, Folder, GraduationCap, Home, Mail, Wrench } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  { id: "home", icon: Home, label: "Home" },
  { id: "projects", icon: Folder, label: "Projects" },
  { id: "tools", icon: Wrench, label: "Tools" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "education", icon: GraduationCap, label: "Education" },
  { id: "contact", icon: Mail, label: "Contact" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = links
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { root: null, threshold: [0.35, 0.55, 0.75] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const goToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(sectionId);
      window.history.replaceState(null, "", `${location.pathname}#${sectionId}`);
    }
  };

  const displayActiveId =
    location.pathname === "/" ? activeId || location.hash?.replace("#", "") || "home" : "";

  return (
    <nav className="fixed bottom-4 md:bottom-auto md:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.25rem)] md:w-auto">
      <div className="mx-auto w-full md:w-max max-w-full rounded-2xl border border-neutral-800/90 bg-neutral-900/85 backdrop-blur-xl shadow-[0_12px_30px_-16px_rgba(0,0,0,0.9)] px-2 py-2 md:px-3 md:py-2.5">
        <div className="flex items-center justify-between md:justify-center gap-1.5 md:gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = displayActiveId === link.id;

            return (
              <button
                key={link.id}
                type="button"
                onClick={() => goToSection(link.id)}
                aria-label={link.label}
                className={`group inline-flex items-center justify-center md:justify-start gap-2 h-10 md:h-11 px-2.5 md:px-3.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_10px_20px_-12px_rgba(139,92,246,0.9)]"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800/85"
                }`}
              >
                <Icon size={16} className="shrink-0" />
                <span className="hidden md:inline leading-none">{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
