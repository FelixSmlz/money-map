import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/icons/dashboard.svg";
import dashboardIconHover from "../assets/icons/dashboard_hover.svg";
import historyIcon from "../assets/icons/history.svg";
import historyIconHover from "../assets/icons/history_hover.svg";
import settingsIcon from "../assets/icons/settings.svg";
import settingsIconHover from "../assets/icons/settings_hover.svg";
import profileIcon from "../assets/icons/profile.svg";
import Avatar from "./Avatar";

type DesktopNavType = {
  user?: any;
  userFirstName?: string;
  isOpen: boolean;
  onClose: () => void;
};

const DesktopNav = ({
  user,
  userFirstName,
  isOpen,
  onClose,
}: DesktopNavType) => {
  const navLinks = [
    {
      to: "/dashboard",
      icon: dashboardIcon,
      iconHover: dashboardIconHover,
      label: "Dashboard",
    },
    {
      to: "/history",
      icon: historyIcon,
      iconHover: historyIconHover,
      label: "History",
    },
    {
      to: "/profile",
      icon: profileIcon,
      label: "Profile",
    },
    {
      to: "/settings",
      icon: settingsIcon,
      iconHover: settingsIconHover,
      label: "Settings",
    },
  ];
  return (
    <div
      className={`fixed left-0 bg-white top-0 h-full w-64 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-bg_black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="p-12 bg-white/100 flex flex-col gap-10">
        <div className="flex items-center space-x-4">
          <Avatar
            color={user.profile_color}
            name={user.name ?? "Guest"}
            size="md"
          />
          <a href="/profile" className="text-lg text-bg_black font-semibold">
            Hi, {userFirstName}
          </a>
        </div>
        <nav className="flex flex-col items-start gap-6">
          {/* <NavLink className={"flex gap-4 items-center"} to="/dashboard">
            <img src={dashboardIcon} alt="Dashboard" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink className={"flex gap-4 items-center"} to="/history">
            <img src={historyIcon} alt="History" />
            <span>History</span>
          </NavLink>
          <NavLink className={"flex gap-4 items-center"} to="/profile">
            <img src={profileIcon} alt="Profile" />
            <span>Profile</span>
          </NavLink>
          <NavLink className={"flex gap-4 items-center"} to="/settings">
            <img src={settingsIcon} alt="Settings" />
            <span>Settings</span>
          </NavLink> */}
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              className="flex gap-4 items-center"
              to={link.to}
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? link.iconHover : link.icon}
                    alt={link.label}
                  />
                  <span>{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DesktopNav;
