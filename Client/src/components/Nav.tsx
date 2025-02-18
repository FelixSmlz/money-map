import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/icons/dashboard.svg";
import dashboardIconHover from "../assets/icons/dashboard_hover.svg";
import historyIcon from "../assets/icons/history.svg";
import historyIconHover from "../assets/icons/history_hover.svg";
import settingsIcon from "../assets/icons/settings.svg";
import settingsIconHover from "../assets/icons/settings_hover.svg";

function Nav() {
  const privateLinks = [
    {
      to: "dashboard",
      icon: dashboardIcon,
      iconHover: dashboardIconHover,
      label: "Dashboard",
    },
    {
      to: "history",
      icon: historyIcon,
      iconHover: historyIconHover,
      label: "History",
    },
    {
      to: "settings",
      icon: settingsIcon,
      iconHover: settingsIconHover,
      label: "Settings",
    },
  ];

  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:hidden 
      bg-white/95 backdrop-blur-sm rounded-[20px] shadow-xl py-4 px-6 
      border border-bg_gray/5 animate-slideUp"
    >
      <ul className="flex items-center gap-12">
        {privateLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `group flex flex-col items-center gap-1.5 relative py-1 px-2
                ${
                  isActive ? "text-turkois" : "text-my_gray hover:text-bg_black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <img
                      src={isActive ? link.iconHover : link.icon}
                      alt={link.label}
                      className="w-6 h-6 transition-transform duration-300 
                        group-hover:scale-110 group-hover:-translate-y-0.5"
                    />
                    {isActive && (
                      <div
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 
                        w-1 h-1 bg-turkois rounded-full animate-pulse"
                      />
                    )}
                  </div>
                  <span className="text-xs font-medium transition-colors">
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
