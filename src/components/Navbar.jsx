import { NavLink } from "react-router-dom";
import { Briefcase, Folder, GraduationCap, Home, Mail, Wrench } from "lucide-react";

const links = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/projects", icon: Folder, label: "Projects" },
  { path: "/tools", icon: Wrench, label: "Tools" },
  { path: "/experience", icon: Briefcase, label: "Experience" },
  { path: "/education", icon: GraduationCap, label: "Education" },
  { path: "/contact", icon: Mail, label: "Contact" },
];

function Navbar() {
  return (
    <nav className="fixed bottom-4 md:bottom-auto md:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.25rem)] md:w-auto">
      <div className="mx-auto w-full md:w-max max-w-full rounded-2xl border border-neutral-800/90 bg-neutral-900/85 backdrop-blur-xl shadow-[0_12px_30px_-16px_rgba(0,0,0,0.9)] px-2 py-2 md:px-3 md:py-2.5">
        <div className="flex items-center justify-between md:justify-center gap-1.5 md:gap-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                aria-label={link.label}
                className={({ isActive }) =>
                  `group inline-flex items-center justify-center md:justify-start gap-2 h-10 md:h-11 px-2.5 md:px-3.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_10px_20px_-12px_rgba(139,92,246,0.9)]"
                      : "text-neutral-300 hover:text-white hover:bg-neutral-800/85"
                  }`
                }
              >
                <Icon size={16} className="shrink-0" />
                <span className="hidden md:inline leading-none">{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
