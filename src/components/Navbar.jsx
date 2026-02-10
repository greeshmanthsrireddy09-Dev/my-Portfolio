import { NavLink } from "react-router-dom";
import {
  Home,
  Folder,
  Wrench,
  Briefcase,
  Mail,
} from "lucide-react";

const links = [
  { path: "/", icon: Home },
  { path: "/projects", icon: Folder },
  { path: "/tools", icon: Wrench },
  { path: "/experience", icon: Briefcase },
  { path: "/contact", icon: Mail },
];

function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="
          flex items-center gap-2
          rounded-2xl px-4 py-2
          backdrop-blur bg-neutral-900/80
          border border-neutral-800
          shadow-lg
        "
      >
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                `
                flex items-center gap-2 px-3 py-2 rounded-xl
                text-sm transition
                ${isActive
                  ? "bg-violet-600 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }
                `
              }
            >
              <Icon size={16} />
              <span className="hidden sm:inline">
                {link.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
