import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/icons/dashboard.svg";
import dashboardIconHover from "../assets/icons/dashboard_hover.svg";
import historyIcon from "../assets/icons/history.svg";
import historyIconHover from "../assets/icons/history_hover.svg";
import analyticsIcon from "../assets/icons/analytics.svg";
import analyticsIconHover from "../assets/icons/analytics_hover.svg";
import settingsIcon from "../assets/icons/settings.svg";
import settingsIconHover from "../assets/icons/settings_hover.svg";

function Nav() {
  const privateLinks = [
    { to: "dashboard", icon: dashboardIcon, iconHover: dashboardIconHover },
    { to: "history", icon: historyIcon, iconHover: historyIconHover },
    { to: "analytics", icon: analyticsIcon, iconHover: analyticsIconHover },
    { to: "settings", icon: settingsIcon, iconHover: settingsIconHover },
  ];
  return (
    <nav className="fixed bottom-0 left-0 py-7 shadow-[0_7px_20px_rgba(0,0,0,0.062)] px-[4rem] bg-white rounded-t-[30px] w-full">
      <ul className="flex justify-between">
        {privateLinks.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to}>
              {({ isActive }) => (
                <img
                  src={isActive ? link.iconHover : link.icon}
                  alt={link.to}
                />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
